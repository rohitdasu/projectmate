import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router';

const Dashboard: NextPage = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  return (
    <div className="flex flex-col space-y-4 h-screen w-screen justify-center items-center">
      <Head>
        <title>Dashboard</title>
      </Head>
      <h1 className="text-3xl font-semibold">Hello {user?.displayName} 👋</h1>
      <button
        className="bg-blue-500 p-2 rounded-md text-white"
        onClick={() => {
          signOut(auth);
          router.push('/');
        }}
      >
        Sign out
      </button>
    </div>
  );
};

export default Dashboard;
