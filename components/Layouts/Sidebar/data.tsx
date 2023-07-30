import { FaHome, FaNewspaper, FaUserFriends } from 'react-icons/fa';

export const NavRoutes = [
  {
    id: '1',
    title: 'Projects',
    icon: <FaHome size={20} />,
    link: '/projects',
  },
  {
    id: '2',
    title: 'Mates',
    icon: <FaUserFriends size={20} />,
    link: '/mates',
  },
  {
    id: '3',
    title: 'Posts',
    icon: <FaNewspaper size={20} />,
    link: '/posts',
  },
];
