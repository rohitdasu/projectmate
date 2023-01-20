import { BackToTop } from '@/components/BackToTopButton';
import {
  BenefitsContainer,
  Guide,
  Hero,
  Thanks,
} from '@/components/LandingPage/';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <SharedLayout title="Home" hasContainer hideFooter={false}>
      <div className="flex flex-col space-y-32 px-4 pb-24 pt-16 md:pt-24">
        <Hero />
        <Guide />
        <BenefitsContainer />
        <Thanks />
      </div>
      <BackToTop />
    </SharedLayout>
  );
};

export default Home;
