// import { MdRoofing } from 'react-icons/md';
import { IoCodeSlash, IoPersonOutline } from 'react-icons/io5';
import { FiFeather } from 'react-icons/fi';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';
import { TbBrandGithub, TbBrandDiscord, TbBrandTwitter } from 'react-icons/tb';
import { IconType } from 'react-icons';

type AnchorTagPropsType = {
  target: string;
  rel: string;
};

export interface IRoute {
  title: string;
  url: string;
  Icon: IconType;
  protectedRoute?: boolean;
  anchorTagProps?: AnchorTagPropsType;
}

export const appRoutes: IRoute[] = [
  {
    title: 'projects',
    url: '/projects',
    Icon: IoCodeSlash,
  },
  {
    title: 'profile',
    url: '/user/profile',
    Icon: IoPersonOutline,
    protectedRoute: true,
  },
  {
    title: 'blog',
    url: '/blog',
    Icon: FiFeather,
  },
];

export const getSocialLinks = (isSideBar?: boolean): IRoute[] => [
  {
    title: 'Discord',
    url: 'https://discord.com/invite/FQtyMWFZQ9',
    Icon: isSideBar ? TbBrandDiscord : FaDiscord,
    anchorTagProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
  {
    title: 'GitHub',
    url: 'https://github.com/rohitdasu/projectmate',
    Icon: isSideBar ? TbBrandGithub : FaGithub,
    anchorTagProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
  {
    title: 'Twitter',
    url: 'https://twitter.com/projectmateHQ',
    Icon: isSideBar ? TbBrandTwitter : FaTwitter,
    anchorTagProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
];
