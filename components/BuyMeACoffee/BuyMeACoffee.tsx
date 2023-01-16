import React, { FC } from 'react';
import { IBuyMeACoffee } from './BuyMeACoffee.interface';

export const BuyMeACoffee: FC<IBuyMeACoffee> = ({ isMobile = false }) => {
  return (
    <a
      href="https://www.buymeacoffee.com/rohit.dasu"
      target="_blank"
      rel="noreferrer"
      className={
        isMobile ? 'mt-4 flex items-center justify-center' : 'hidden md:block'
      }
    >
      <img
        src={`https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png`}
        alt="Buy Me A Coffee @ rohit.dasu"
        style={{ height: '48px' }}
      />
    </a>
  );
};
