import { initializeApp } from '@firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence } from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyAzU2iftiwMpeDKDcUTfe2-LfAi067_qE4",
    authDomain: "sc2006-the-buggers.firebaseapp.com",
    projectId: "sc2006-the-buggers",
    storageBucket: "sc2006-the-buggers.appspot.com",
    messagingSenderId: "1090958684889",
    appId: "1:1090958684889:web:2f7e01f94ac6b2a21304c8",
    measurementId: "G-XR3Q3XP179"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
  
  export {app, auth};
  