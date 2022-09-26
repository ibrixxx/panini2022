import firebase from "firebase/compat";
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from '@env';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

if(!firebase.apps.length)
    firebase.initializeApp(firebaseConfig);



