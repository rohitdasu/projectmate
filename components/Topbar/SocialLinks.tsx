import { motion } from 'framer-motion';
import { getSocialLinks } from './data';

export const SocialLinks = () => {
  const socialLinks = getSocialLinks();

  return (
    <div className="hidden gap-2 md:flex">
      {socialLinks.map(({ Icon, title, anchorTagProps, url }) => (
        <motion.a
          key={title}
          {...anchorTagProps}
          href={url}
          whileTap={{ scale: 0.8 }}
          className="flex h-[2.939rem] w-[2.939rem] justify-center items-center overflow-hidden rounded-md text-[1.6rem] shadow-border-shadow  border-solid hover:border-2"
        >
          {<Icon />}
        </motion.a>
      ))}
    </div>
  );
};
