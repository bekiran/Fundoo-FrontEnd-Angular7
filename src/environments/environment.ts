// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:3000/",
  // baseUrl:"http://18.225.6.16:3000/",



  firebase: {
    apiKey: "AIzaSyA9ar6Pay0koIYtTlMNM9HZ5yRCGE_jYS8",
    authDomain: "fundoonote-58387.firebaseapp.com",
    databaseURL: "https://fundoonote-58387.firebaseio.com",
    projectId: "fundoonote-58387",
    storageBucket: "fundoonote-58387.appspot.com",
    messagingSenderId: "663067545899"
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
