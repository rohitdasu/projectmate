// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyALY7ekiYqyMfBXiwrFJDAL_zjzhD9unz0',
  authDomain: 'projectmate-b30b3.firebaseapp.com',
  projectId: 'projectmate-b30b3',
  storageBucket: 'projectmate-b30b3.appspot.com',
  messagingSenderId: '886608031929',
  appId: '1:886608031929:web:b98dcff3e4481ff47d6b68',
};

// Initialize Firebase
const app = getApps ? initializeApp(firebaseConfig) : getApp;
const auth = getAuth(app);
const Provider_google = new GoogleAuthProvider();
const Provider_github = new GithubAuthProvider();

export { auth, Provider_google, Provider_github };
