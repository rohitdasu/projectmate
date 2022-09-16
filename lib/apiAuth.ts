import { NextApiRequest } from 'next';
import * as admin from 'firebase-admin';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : undefined,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

const app = !admin.apps.length
  ? admin.initializeApp({ credential: admin.credential.cert(firebaseConfig) })
  : admin.app();

async function apiAuth(req: NextApiRequest) {
  const header = req.headers;

  if (!header.authorization) {
    return false;
  }

  const authHeader = header.authorization.split(' ');

  if (authHeader[0] !== 'Bearer') {
    return false;
  }

  const token = authHeader[1];

  try {
    await admin.auth().verifyIdToken(token);
    return true;
  } catch (error) {
    return false;
  }
}

export default apiAuth;
