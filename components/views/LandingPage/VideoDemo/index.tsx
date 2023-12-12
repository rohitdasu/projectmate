import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React from 'react';

const videoVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export const VideoDemo = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <section className="my-16 px-4 md:px-8 xl:px-0" id="demo">
      <motion.div
        ref={ref}
        variants={videoVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        exit="hidden"
        className="mx-auto flex max-w-screen-lg flex-col gap-8"
      >
        <section>
          <div style={{ padding: '56.04% 0 0 0', position: 'relative' }}>
            <iframe
              src="https://player.vimeo.com/video/893011089?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;title=0&amp;byline=0&amp;portrait=0"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
              }}
              title="projectmate-demo"
            ></iframe>
          </div>
        </section>
      </motion.div>
    </section>
  );
};
