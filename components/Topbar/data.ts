import { MdRoofing } from 'react-icons/md';
import { IoCodeSlash } from 'react-icons/io5';
import { AiOutlineRead } from 'react-icons/ai';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { IconType } from 'react-icons';

type AnchorTagPropsType = {
  target: string;
  rel: string;
};

export interface IRoute {
  title: string;
  url: string;
  Icon: IconType;
  anchorTagProps?: AnchorTagPropsType;
}

export const appRoutes: IRoute[] = [
  {
    title: 'home',
    url: '/',
    Icon: MdRoofing,
  },
  {
    title: 'projects',
    url: '/projects',
    Icon: IoCodeSlash,
  },
  {
    title: 'about',
    url: '/about',
    Icon: AiOutlineRead,
  },
];

export const socialLinks: IRoute[] = [
  {
    title: 'Discord',
    url: 'https://discord.com/invite/FQtyMWFZQ9',
    Icon: FaDiscord,
    anchorTagProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
  {
    title: 'GitHub',
    url: 'https://github.com/rohitdasu/projectmate',
    Icon: FaGithub,
    anchorTagProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
];
