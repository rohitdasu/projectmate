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
          className="flex overflow-hidden rounded-md p-[0.67rem] text-[1.6rem] shadow-border-shadow"
        >
          {<Icon />}
        </motion.a>
      ))}
    </div>
  );
};
