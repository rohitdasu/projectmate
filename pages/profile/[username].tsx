import type { GetServerSideProps, NextPage } from 'next';

const LegacyProfilePage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/community',
    permanent: false,
  },
});

export default LegacyProfilePage;
