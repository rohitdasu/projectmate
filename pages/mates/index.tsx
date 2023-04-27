import React from 'react';
import type { NextPage } from 'next';
import { SharedLayout } from '@/components';

const Mates: NextPage = () => {
  return (
    <>
      <header className="sr-only">
        <h1>Mates</h1>
      </header>
      <SharedLayout title="Mates">
        <div className="flex h-screen items-center">coming soon...</div>
      </SharedLayout>
    </>
  );
};

export default Mates;
