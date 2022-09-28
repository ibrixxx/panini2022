import {initializeApp, getApps, getApp} from 'firebase/app'
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId, databaseURL } from '@env';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
    databaseURL: databaseURL
};

if(!getApps().length)
    initializeApp(firebaseConfig);


