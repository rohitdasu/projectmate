import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { Guide, Hero } from '@/components/LandingPage/';

const Home: NextPage = () => {
  return (
    <SharedLayout title="Home">
      <Hero />
      <Guide />
    </SharedLayout>
  );
};

export default Home;
