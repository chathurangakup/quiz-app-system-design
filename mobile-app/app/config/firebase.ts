import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  authDomain: "quizapp-3f865.firebaseapp.com",
  projectId: "quizapp-3f865",
  storageBucket: "quizapp-3f865.appspot.com",

  appId: "142372485214",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
