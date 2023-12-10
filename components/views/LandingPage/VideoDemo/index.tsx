import React from 'react';

export const VideoDemo = () => {
  return (
    <section
      className="bg-secondary-background my-8 px-4 md:my-16 md:px-8 xl:px-0"
      id="demo"
    >
      <div className="mx-auto flex max-w-screen-lg flex-col gap-8">
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
      </div>
    </section>
  );
};
