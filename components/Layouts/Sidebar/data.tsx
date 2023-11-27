import { Home, Newspaper, User, Users } from 'lucide-react';

export const NavRoutes = [
  {
    id: '1',
    title: 'Projects',
    icon: <Home />,
    link: '/projects',
    authGuard: false,
  },
  {
    id: '2',
    title: 'Mates',
    icon: <Users />,
    link: '/mates',
    authGuard: false,
  },
  {
    id: '3',
    title: 'Profile',
    icon: <User />,
    link: '/profile',
    authGuard: true,
  },
  {
    id: '4',
    title: 'Posts',
    icon: <Newspaper />,
    link: '/posts',
    authGuard: false,
  },
];
