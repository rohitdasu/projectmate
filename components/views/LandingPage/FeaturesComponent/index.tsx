import Image from 'next/image';
import React from 'react';

export const features = [
  {
    title: 'Discover Open-source projects',
    subTitle:
      'Dive into a vast array of open-source projects, each a hub of innovation waiting to be explored and to be contributed.',
    image: '/projects.gif',
  },
  {
    title: 'Project Stats at a Glance',
    subTitle:
      'Gain insights into project performance with detailed statistics, empowering you to make informed contributions.',
    image: '/stats.gif',
  },
  {
    title: 'Seamless Sharing',
    subTitle:
      "Amplify your contributions! Share your favorite projects effortlessly on various social media platforms and let the world know about the positive changes you're making.",
    image: '/share.gif',
  },
  {
    title: 'Add Your Project',
    subTitle:
      'Elevate your creation and contribute to the open-source ecosystem by adding your project to our platform. Showcase your innovation, gather collaborators, and make your mark in the community.',
    image: '/addproject.gif',
  },
  {
    title: 'Collaborate & Showcase',
    subTitle:
      'Connect with like-minded individuals in our Collaborators Corner. Share your open-source projects, create a dynamic profile, and put your work in the spotlight.',
    image: '/profile.gif',
  },
];

export const FeaturesComponent = () => {
  const getFlexDirectionClass = (idx: number) => {
    return idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse';
  };

  return (
    <section className="my-8 px-4 md:my-32 md:px-8 xl:px-0" id="features">
      <div className="mx-auto max-w-screen-lg">
        <ul className="flex flex-col gap-8 md:gap-16">
          {features.map((feature, idx) => (
            <li key={idx}>
              <div
                className={`flex flex-col-reverse items-center gap-4 ${getFlexDirectionClass(
                  idx
                )}`}
              >
                <div className="w-full md:w-1/2">
                  <h3 className="text-sm font-semibold md:text-xl">
                    {feature.title}
                  </h3>
                  <h4 className="text-xs font-light md:text-base">
                    {feature.subTitle}
                  </h4>
                </div>
                <div className="w-full md:w-1/2">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
