import { motion } from 'framer-motion';
import { getSocialLinks } from './data';

export const SocialLinks = () => {
  const socialLinks = getSocialLinks();

  return (
    <div className="hidden md:flex gap-2">
      {socialLinks.map(({ Icon, title, anchorTagProps, url }) => (
        <motion.a
          key={title}
          {...anchorTagProps}
          href={url}
          whileTap={{ scale: 0.8 }}
          className="flex p-[0.67rem] overflow-hidden text-[1.6rem] shadow-border-shadow rounded-md"
        >
          {<Icon />}
        </motion.a>
      ))}
    </div>
  );
};
