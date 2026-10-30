import type { GetServerSideProps, NextPage } from 'next';

const LegacyTagPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/explore',
    permanent: false,
  },
});

export default LegacyTagPage;
