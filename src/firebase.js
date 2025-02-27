import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// use the website builder project for firestore
const firebaseConfigWB = {
  apiKey: import.meta.env.VITE_WB_FIRE_APIKEY,
  authDomain: import.meta.env.VITE_WB_FIRE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_WB_FIRE_PROJECTID,
  storageBucket: import.meta.env.VITE_WB_FIRE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_WB_FIRE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_WB_FIRE_APPID
};

//  use the mhd-clocking project for storage
const firebaseConfigMHD = {
  apiKey: import.meta.env.VITE_MHD_FIRE_APIKEY,
  authDomain: import.meta.env.VITE_MHD_FIRE_AUTHDOMAIN,
  databaseURL: import.meta.env.VITE_MHD_FIRE_DATABASEURL,
  projectId: import.meta.env.VITE_MHD_FIRE_PROJECTID,
  storageBucket: import.meta.env.VITE_MHD_FIRE_STORAGEBUCKET,
  messagingSenderId:import.meta.env.VITE_MHD_FIRE_MESSAGINGSENDERID,
  appId:import.meta.env.VITE_MHD_FIRE_APPID,
  measurementId: import.meta.env.VITE_MHD_FIRE_MEASUREMENTID
};

//  initilized apps
const appStorage = initializeApp(firebaseConfigMHD,'storageApp')  // for storage
const appFirestore = initializeApp(firebaseConfigWB,'firestoreApp')  // for firestore


// initilized services
const storage = getStorage(appStorage);
const db = getFirestore(appFirestore);

export { db, storage };
