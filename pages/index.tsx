import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { Hero } from '@/components/LandingPage/';

const Home: NextPage = () => {
  return (
    <SharedLayout title="Home">
      <Hero />
    </SharedLayout>
  );
};

export default Home;
