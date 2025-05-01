import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import React, { useEffect } from 'react';

const videoVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const VideoDemo = () => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  useEffect(() => {
    // Add/remove a class to the body when video is in view
    if (inView) {
      document.body.classList.add('video-in-view');
    } else {
      document.body.classList.remove('video-in-view');
    }

    return () => {
      document.body.classList.remove('video-in-view');
    };
  }, [inView]);

  return (
    <>
      {/* Overlay that dims the rest of the page */}
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className="pointer-events-none fixed inset-0 bg-black/50 transition-opacity duration-500"
        style={{ opacity: inView ? 1 : 0 }}
      />

      <section className="relative z-10 px-4 md:px-8 xl:px-0" id="demo">
        <motion.div
          ref={ref}
          variants={videoVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          exit="hidden"
          className="mx-auto flex max-w-screen-lg flex-col gap-8"
        >
          <section className="relative">
            <div style={{ padding: '56.04% 0 0 0', position: 'relative' }}>
              <iframe
                src="https://player.vimeo.com/video/893011089?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479&amp;title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1&amp;loop=1&amp;background=1&amp;muted=1"
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
                className="rounded-lg shadow-lg"
              />
            </div>
          </section>
        </motion.div>
      </section>
    </>
  );
};
