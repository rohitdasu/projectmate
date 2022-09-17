import { MdRoofing } from 'react-icons/md';
import { IoCodeSlash } from 'react-icons/io5';
import { AiOutlineRead } from 'react-icons/ai';
import { TbBrandGithub, TbBrandDiscord } from 'react-icons/tb';

export const appRoutes = [
  {
    title: 'home',
    url: '/',
    Icon: MdRoofing,
    anchorTagProps: {},
  },
  {
    title: 'projects',
    url: '/projects',
    Icon: IoCodeSlash,
    anchorTagProps: {},
  },
  {
    title: 'about',
    url: '/about',
    Icon: AiOutlineRead,
    anchorTagProps: {},
  },
  {
    title: 'Discord',
    url: 'https://discord.com/invite/FQtyMWFZQ9',
    Icon: TbBrandDiscord,
    anchorTagProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
  {
    title: 'GitHub',
    url: 'https://github.com/rohitdasu/projectmate',
    Icon: TbBrandGithub,
    anchorTagProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
];
