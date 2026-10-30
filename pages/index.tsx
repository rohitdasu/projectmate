import React from 'react';
import Head from 'next/head';
import type { GetServerSideProps, NextPage } from 'next';
import { DiscoveryHome } from '@/components/views/LandingPage/DiscoveryHome';
import { prisma } from '../lib/prisma';

interface HomeProps {
  userCount: number | null;
  projectCount: number | null;
  randomUsers: Array<{
    id: string;
    name: string | null;
    image: string | null;
  }> | null;
}

export type User = {
  id: string;
  name: string;
  image: string;
  username: string;
};

const Home: NextPage<HomeProps> = ({
  userCount,
  projectCount,
  randomUsers,
}) => {
  const pageTitle =
    'ProjectMate — Discover Projects & Contribute to Open Source';
  const pageDescription =
    'Discover open-source projects, meet maintainers, and find your next contribution. Join ProjectMate’s community and build in the open.';
  const canonicalUrl = 'https://projectmate.rohitdasu.com/';
  const socialImage = `${canonicalUrl}og.png`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:width" content="1260" />
        <meta property="og:image:height" content="640" />
        <meta
          property="og:image:alt"
          content="ProjectMate helps developers discover and contribute to open-source projects."
        />
        <meta property="og:site_name" content="ProjectMate" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@projectmateHQ" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={socialImage} />
        <meta
          name="twitter:image:alt"
          content="ProjectMate helps developers discover and contribute to open-source projects."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'WebSite',
                  name: 'ProjectMate',
                  url: canonicalUrl,
                  description: pageDescription,
                  inLanguage: 'en-US',
                },
                {
                  '@type': 'Organization',
                  name: 'ProjectMate',
                  url: canonicalUrl,
                  logo: `${canonicalUrl}logo.png`,
                  sameAs: [
                    'https://github.com/rohitdasu/projectmate',
                    'https://twitter.com/projectmateHQ',
                  ],
                },
              ],
            }),
          }}
        />
      </Head>
      <DiscoveryHome
        userCount={userCount}
        projectCount={projectCount}
        randomUsers={randomUsers}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  res,
}) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=300'
  );

  try {
    const [userCount, projectCount] = await Promise.all([
      prisma.user.count(),
      prisma.project.count(),
    ]);
    const randomOffset = Math.floor(Math.random() * Math.max(userCount - 3, 1));
    const randomUsers = await prisma.user.findMany({
      skip: randomOffset,
      take: 4,
      select: {
        id: true,
        name: true,
        image: true,
      },
    });

    return {
      props: {
        userCount,
        projectCount,
        randomUsers,
      },
    };
  } catch (error) {
    return {
      props: {
        userCount: null,
        projectCount: null,
        randomUsers: null,
      },
    };
  }
};

export default Home;
