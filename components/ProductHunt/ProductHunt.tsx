/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, FC } from 'react';
import { ProductHuntProps } from './ProductHunt.interface';

export const ProductHunt: FC<ProductHuntProps> = ({ isMobile = false }) => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
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
        src={`https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=516791&theme=dark`}
        alt="Projectmate - Connecting&#0032;open&#0045;source&#0032;collaborators&#0032;and&#0032;maintainers | Product Hunt"
        style={{ width: '250px', height: '48px' }}
      />
    </a>
  ) : (
    <></>
  );
};
