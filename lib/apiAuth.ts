import { NextApiRequest } from 'next';
import firebaseAdmin from './firebaseAdmin';

async function apiAuth(req: NextApiRequest) {
  const header = req.headers;

  if (!header.authorization) {
    return false;
  }

  const authHeader = header.authorization.split(' ');

  if (authHeader[0] !== 'Bearer') {
    return false;
  }

  try {
    await firebaseAdmin.auth().verifyIdToken(authHeader[1]);
    return true;
  } catch (error) {
    return false;
  }
}

export default apiAuth;
