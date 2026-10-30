import type { GetServerSideProps, NextPage } from 'next';

const LegacyMatesPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/community',
    permanent: true,
  },
});

export default LegacyMatesPage;
