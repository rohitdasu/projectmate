import { MdRoofing } from 'react-icons/md';
import { IoCodeSlash } from 'react-icons/io5';
import { AiOutlineRead } from 'react-icons/ai';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { TbBrandGithub, TbBrandDiscord } from 'react-icons/tb';
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
];
