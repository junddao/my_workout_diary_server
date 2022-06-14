// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response } from 'express';
// import * as firebase from 'firebase-admin';
// import * as serviceAccount from './serviceAccountKey.json';

// const firebase_params = {
//   type: serviceAccount.type,
//   projectId: serviceAccount.project_id,
//   privateKeyId: serviceAccount.private_key_id,
//   privateKey: serviceAccount.private_key,
//   clientEmail: serviceAccount.client_email,
//   clientId: serviceAccount.client_id,
//   authUri: serviceAccount.auth_uri,
//   tokenUri: serviceAccount.token_uri,
//   authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
//   clientC509CertUrl: serviceAccount.client_x509_cert_url,
// };

// @Injectable()
// export class PreauthMiddleware implements NestMiddleware {
//   private defaultApp: any;

//   constructor() {
//     console.log('enter!!');
//     this.defaultApp = firebase.initializeApp({
//       credential: firebase.credential.cert(firebase_params),
//       // databaseURL: 'https://my-workout-diary-d1093.firebaseio.com',
//     });
//   }

//   // eslint-disable-next-line @typescript-eslint/ban-types
//   async use(req: Request, res: Response, next: Function) {
//     console.log(req.body);

//     const user = req.body;
//     const uid = user.uid;

//     const updateParams = {
//       email: user.email,
//       photoUrl: user.photoURL,
//       name: user.name,
//     };

//     try {
//       await this.defaultApp.auth().updateUser(uid, updateParams);
//     } catch (e) {
//       updateParams['uid'] = uid;
//       await this.defaultApp.auth().createUser(updateParams);
//     }

//     if (token != null && token != '') {
//       this.defaultApp
//         .auth()
//         .createUser()
//         // .verifyIdToken(token.replace('Bearer ', ''))
//         .then(async (userRecord) => {
//           const user = {
//             email: decodedToken.email,
//           };
//           req['user'] = user;
//           next();
//         })
//         .catch((error) => {
//           console.error(error);
//           this.accessDenied(req.url, res);
//         });
//     } else {
//       next();
//     }
//   }

//   private accessDenied(url: string, res: Response) {
//     res.status(403).json({
//       statusCode: 403,
//       timestamp: new Date().toISOString(),
//       path: url,
//       message: 'Access Denied',
//     });
//   }
// }
