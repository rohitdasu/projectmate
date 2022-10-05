import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { Discord, Guide, Hero } from '@/components/LandingPage/';

const Home: NextPage = () => {
  return (
    <SharedLayout title="Home">
      <Hero />
      {/* <div className="my-4">
        <Discord />
      </div> */}
      <Guide />
    </SharedLayout>
  );
};

export default Home;
