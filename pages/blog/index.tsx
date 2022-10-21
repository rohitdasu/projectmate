import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import Lottie from 'lottie-react';
import comingSoonAnimation from '@/../public/comingSoon.json';

const Blog: NextPage = () => {
  return (
    <SharedLayout title="Blog">
      <div className="flex h-[50vh] items-center justify-center">
        <Lottie className="h-full w-full" animationData={comingSoonAnimation} />
      </div>
    </SharedLayout>
  );
};

export default Blog;
