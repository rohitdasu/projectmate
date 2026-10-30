import type { GetServerSideProps, NextPage } from 'next';

const LegacyProjectsPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/explore',
    permanent: true,
  },
});

export default LegacyProjectsPage;
