import { motion } from 'framer-motion';
import { socialLinks } from './data';

export const SocialLinks = () => {
  return (
    <div className="hidden md:flex mr-[1.6rem]">
      {socialLinks.map(({ Icon, title, anchorTagProps, url }) => (
        <motion.a
          key={title}
          {...anchorTagProps}
          href={url}
          whileTap={{ scale: 0.8 }}
          className="flex p-[0.67rem] ml-[0.55rem] overflow-hidden text-[1.6rem] shadow-border-shadow rounded-md"
        >
          {<Icon />}
        </motion.a>
      ))}
    </div>
  );
};
