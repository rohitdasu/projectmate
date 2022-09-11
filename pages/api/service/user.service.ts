import { prisma } from '../../../lib/prisma';

export async function addUser(args: { email: string; firebaseUID: string }) {
  const { email, firebaseUID } = args;
  try {
    const data = await prisma.user.create({
      data: {
        firebaseUID,
        email,
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
