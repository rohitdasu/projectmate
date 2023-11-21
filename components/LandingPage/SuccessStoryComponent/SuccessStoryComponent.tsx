import { FaProductHunt } from 'react-icons/fa';

export const SuccessStoryComponent = () => {
  return (
    <section className="mx-auto flex max-w-screen-xl flex-col items-center gap-6 py-16 px-4">
      <p className="text-xl text-gray-900 md:text-3xl lg:text-4xl">
        ProductHunt Success Story 🎉
      </p>
      <p className="flex items-center text-base text-gray-900 md:text-xl lg:text-2xl">
        Our app ranks #12 on
        <a
          href="https://www.producthunt.com/products/projectmate#projectmate"
          target="_blank"
        >
          <FaProductHunt className="ml-2 text-orange-600" />
        </a>
      </p>
      <iframe
        style={{ border: 'none' }}
        src="https://cards.producthunt.com/cards/posts/374078?v=1"
        width="500"
        height="405"
        frameBorder={0}
        scrolling="no"
        allowFullScreen
      ></iframe>
    </section>
  );
};
