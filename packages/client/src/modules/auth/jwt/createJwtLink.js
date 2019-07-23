import { ApolloLink, Observable } from 'apollo-link';

import { getItem, saveTokens, removeTokens } from '../utils';
import { REFRESH_TOKENS } from './mutations';

const setJWTContext = async operation => {
  const accessToken = await getItem('accessToken');

  const headers = ![ 'Login', 'RefreshTokens' ].includes(operation.operationName) && accessToken
    ? { Authorization: `Bearer ${accessToken}` }
    : {};

  operation.setContext(context => ({
    ...context,
    headers,
  }));
};

export const createJwtLink = getApolloClient => new ApolloLink((operation, forward) => {
  return new Observable(observer => {
    const apolloClient = getApolloClient();

    let sub, retrySub;
    const queue = [];

    (async () => {
      await setJWTContext(operation);

      try {
        sub = forward(operation).subscribe({
          next: result => {
            const promise = (async () => {
              if (operation.operationName === 'Login') {
                if (!!result.data && result.data.login.tokens) {
                  const [ accessToken, refreshToken ] = result.data.login.tokens;
                  await saveTokens({ accessToken, refreshToken });
                } else {
                  await removeTokens();
                }
              }

              observer.next(result);
            })();
            queue.push(promise);

            if (queue.length > 100) {
              Promise.all(queue).then(() => {
                queue.length = 0;
              });
            }
          },
          error: networkError => {
            (async () => {
              const isUnAuthorized = networkError.response &&
                networkError.response.status >= 400 &&
                networkError.response.status < 500;

              if (isUnAuthorized) {
                try {
                  const { data } = await apolloClient.mutate({
                    mutation: REFRESH_TOKENS,
                    variables: { refreshToken: await getItem('refreshToken') }
                  });

                  if (data && data.refreshTokens) {
                    const [ accessToken, refreshToken ] = data.refreshTokens;
                    await saveTokens({ accessToken, refreshToken });
                  } else {
                    await removeTokens();
                  }

                  await setJWTContext(operation);
                  retrySub = forward(operation).subscribe(observer);
                } catch (e) {
                  await removeTokens();
                  observer.error(networkError);
                }
              } else {
                observer.error(networkError);
              }
            })();
          },
          complete: () => {
            Promise.all(queue).then(() => {
              queue.length = 0;
              observer.complete();
            });
          }
        });
      } catch (e) {
        observer.error(e);
      }
    })();

    return () => {
      if (sub) sub.unsubscribe();
      if (retrySub) retrySub.unsubscribe();
    };
  });
});
