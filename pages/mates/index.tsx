import React from 'react';
import type { NextPage } from 'next';
import { MatesList } from '@/components/MatesList';
import { SharedLayout } from '@/components/Layouts';

const Mates: NextPage = () => {
  return (
    <>
      <header className="sr-only">
        <h1>Mates</h1>
      </header>
      <SharedLayout title="Mates">
        <MatesList />
      </SharedLayout>
    </>
  );
};

export default Mates;
