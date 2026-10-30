import type { GetServerSideProps, NextPage } from 'next';

const LegacyBlogsPage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/',
    permanent: false,
  },
});

export default LegacyBlogsPage;
