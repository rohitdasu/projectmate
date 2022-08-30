// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
// Initialize Firebase
const app = getApps ? initializeApp(firebaseConfig) : getApp;
const auth = getAuth(app);
const Provider_google = new GoogleAuthProvider();
const Provider_github = new GithubAuthProvider();

export { auth, Provider_google, Provider_github };
