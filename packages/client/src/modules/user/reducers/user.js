const defaultState = null;

export default function (state = defaultState, action) {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;

    case 'LOGOUT':
      return null;

    default:
      return state;
  }
};
