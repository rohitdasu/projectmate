import { User } from '@prisma/client';
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

export async function getUsers() {
  try {
    const data: User[] = await prisma.user.findMany();
    return data;
  } catch (error) {
    throw error;
  }
}
