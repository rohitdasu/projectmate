import { SiDiscord, SiGithub, SiTwitter } from 'react-icons/si';
import { Icon } from './Footer.interface';

export const icons: Icon[] = [
  {
    id: '1',
    logo: <SiGithub size={24} />,
    color: '#ffffff',
    link: 'https://github.com/rohitdasu/projectmate',
  },
  {
    id: '2',
    logo: <SiTwitter size={24} />,
    color: '#ffffff',
    link: 'https://twitter.com/projectmateHQ',
  },
  {
    id: '3',
    logo: <SiDiscord size={24} />,
    color: '#ffffff',
    link: 'https://discord.com/invite/FQtyMWFZQ9',
  },
];
