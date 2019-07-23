import { env } from '../env';

export const cspConfig = {
  directives: {
    baseUri: [ `${env.WEBSITE_URL}` ],
    manifestSrc: [ "'self'" ],
    mediaSrc: [ "'self'" ],
    objectSrc: [ "'none'" ],
    formAction: [ "'none'" ],
    upgradeInsecureRequests: true,
    frameAncestors: [ "'self'" ]
  }
};
