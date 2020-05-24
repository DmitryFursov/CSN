// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './interface';

export const environment: Environment = {
  production: false,
  firebaseConfig:
  {
    apiKey: 'AIzaSyA51NLsp4iyJFW_2Pi62JWaTXChM9ZK6Ew',
    authDomain: 'ang-blog-bcbbe.firebaseapp.com',
    databaseURL: 'https://ang-blog-bcbbe.firebaseio.com',
    projectId: 'ang-blog-bcbbe',
    storageBucket: 'ang-blog-bcbbe.appspot.com',
    messagingSenderId: '1054199169587',
    appId: '1:1054199169587:web:71bfbb51dab71d68291946',
    measurementId: 'G-NGDMZHN8D4'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
