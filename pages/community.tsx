import React from 'react';
import type { NextPage } from 'next';
import { MatesList } from '@/components/views/MatesList';
import { SharedLayout } from '@/components/Layouts';

const Community: NextPage = () => (
  <SharedLayout title="Community">
    <MatesList />
  </SharedLayout>
);

export default Community;
