import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import {
  BenefitsContainer,
  Guide,
  Hero,
  Thanks,
  JoinUs,
} from '@/components/LandingPage/';

const Home: NextPage = () => {
  return (
    <SharedLayout title="Home" hasContainer>
      <div className="mt-16 mb-32 flex flex-col space-y-32 px-4">
        <Hero />
        <Guide />
        <BenefitsContainer />
        <JoinUs />
        <Thanks />
      </div>
    </SharedLayout>
  );
};

export default Home;
