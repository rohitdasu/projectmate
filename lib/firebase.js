// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyB5u3WF97wWOo49Mw0JA2oTJSGhhiIOEJQ',
  authDomain: 'projectmate-test.firebaseapp.com',
  projectId: 'projectmate-test',
  storageBucket: 'projectmate-test.appspot.com',
  messagingSenderId: '822245140383',
  appId: '1:822245140383:web:415a6697ed4b9dd11f3faa',
};
// Initialize Firebase
const app = getApps ? initializeApp(firebaseConfig) : getApp;
const auth = getAuth(app);
const Provider_google = new GoogleAuthProvider();
const Provider_github = new GithubAuthProvider();

export { auth, Provider_google, Provider_github };
