/*
 * These are settings used in the application. They can be different depending on the environment they are run in.
 * 
 * For instance if you wanted a setting that only ran in our testing environment, you would put that in a file named
 *  environment.staging.ts
 * where the word staging indicates the environment this file is concerned with. Your other choices are 'dev' and 'prod',
 * as those are the only three environments we have.
 *
 * When you want the application to point to another environment, you copy this file over the
 *  environment.ts
 * file. The system looks there for the actual current settings. So when you copy the environment specific settings there,
 * those settings become the environmental settings that the app uses.
 *
 */

export const domainInfo = {
  domain: '174.138.35.62',
  port: '8080'
};

export const domainPort = domainInfo.domain + ':' + domainInfo.port;

export const environment = {
  production: false,
  domainPort: domainPort,
  apiUrl: 'http://' + domainPort
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
