import { motion } from 'framer-motion';
import { socialLinks } from './data';

export const SocialLinks = () => {
  return (
    <div className="hidden md:flex mr-[1.6rem]">
      {socialLinks.map(({ Icon, anchorTagProps, title, url }) => (
        <a {...anchorTagProps} href={url}>
          <motion.button
            whileTap={{ scale: 0.8 }}
            className="flex p-[0.67rem] ml-[0.55rem] overflow-hidden text-[1.6rem] shadow-border-shadow rounded-md"
            onClick={() => {}}
          >
            {<Icon />}
          </motion.button>
        </a>
      ))}
    </div>
  );
};
