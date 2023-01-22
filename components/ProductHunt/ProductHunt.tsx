import { useTheme } from 'next-themes';
import React from 'react';

export const ProductHunt = ({ isMobile = false }) => {
  const { theme } = useTheme();
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    setLoaded(true);
  }, []);

  return loaded ? (
    <a
      href="https://www.producthunt.com/products/projectmate/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-projectmate"
      target="_blank"
      rel="noreferrer"
      className={
        isMobile ? 'mt-4 flex items-center justify-center' : 'hidden md:block'
      }
    >
      <img
        className="animate-pulse"
        src={`https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=516791&theme=${theme}`}
        alt="Projectmate - Connecting&#0032;open&#0045;source&#0032;collaborators&#0032;and&#0032;maintainers | Product Hunt"
        style={{ width: '250px', height: '48px' }}
      />
    </a>
  ) : (
    <></>
  );
};
