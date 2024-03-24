import { initializeApp } from '@firebase/app';
import { initializeAuth, getAuth, getReactNativePersistence} from '@firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCiQQIIUrxtYi-g_vadQQ0dZJitpTSg15g",
  authDomain: "the-buggers.firebaseapp.com",
  projectId: "the-buggers",
  storageBucket: "the-buggers.appspot.com",
  messagingSenderId: "735219728060",
  appId: "1:735219728060:web:3acf78d9420d0354ea1ab9"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  const db = getFirestore(app);

  export {app, auth, db};
  