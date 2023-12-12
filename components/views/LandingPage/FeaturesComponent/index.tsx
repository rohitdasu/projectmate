import Image from 'next/image';
import { motion } from 'framer-motion';
import React from 'react';
import { InView } from 'react-intersection-observer';
import { features } from '@/data';

export const FeaturesComponent = () => {
  const getFlexDirectionClass = (idx: number) => {
    return idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse';
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  return (
    <section className="my-8 px-4 md:my-32 md:px-8 xl:px-0" id="features">
      <div className="mx-auto max-w-screen-lg">
        <h2 className="mb-8 text-center text-2xl font-semibold md:text-3xl">
          Explore Features
        </h2>
        <ul className="flex flex-col gap-8 md:gap-16">
          {features.map((feature, idx) => (
            <InView
              key={idx}
              triggerOnce
              threshold={0.5}
              rootMargin="0px 0px -10% 0px"
            >
              {({ inView, ref }) => (
                <motion.li
                  variants={featureVariants}
                  initial="hidden"
                  animate={inView ? 'visible' : 'hidden'}
                  exit="hidden"
                  ref={ref}
                >
                  <div
                    className={`flex flex-col-reverse items-center gap-4 ${getFlexDirectionClass(
                      idx
                    )}`}
                  >
                    <div className="w-full md:w-1/2">
                      <motion.h3 className="text-sm font-semibold md:text-xl">
                        {feature.title}
                      </motion.h3>
                      <motion.h4 className="text-xs font-light md:text-base">
                        {feature.subTitle}
                      </motion.h4>
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
                </motion.li>
              )}
            </InView>
          ))}
        </ul>
      </div>
    </section>
  );
};
