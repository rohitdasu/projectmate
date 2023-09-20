export const SuccessStoryComponent = () => {
  return (
    <section className="mx-auto flex max-w-screen-xl flex-col items-center gap-6 px-4 py-16">
      <p className="text-xl text-gray-200 md:text-3xl lg:text-4xl">
        ProductHunt Success Story
      </p>
      <p className="text-base text-gray-300 md:text-xl lg:text-2xl">
        Our app ranks <span className="text-primary-color">#12</span> on{' '}
        <a
          href="https://www.producthunt.com/products/projectmate#projectmate"
          target="_blank"
          className="text-primary-color underline"
        >
          ProductHunt
        </a>{' '}
        🎉
      </p>
    </section>
  );
};
