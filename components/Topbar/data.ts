import { MdRoofing } from 'react-icons/md';
import { IoCodeSlash } from 'react-icons/io5';
import { AiOutlineRead } from 'react-icons/ai';

export const appRoutes = [
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
