import { FaHome, FaNewspaper, FaUserFriends } from 'react-icons/fa';
const iconStyleProjects = {
  width: '20px',
  height: '26px',
};
const iconStylePost = {
  width: '20px',
  height: '29px',
};
const iconStyleMates = {
  width: '20px',
  height: '27px',
};
export const NavRoutes = [
  {
    id: '1',
    title: 'Projects',
    icon: <FaHome style={iconStyleProjects} />,
    link: '/projects',
  },
  {
    id: '2',
    title: 'Mates',
    icon: <FaUserFriends style={iconStyleMates} />,
    link: '/mates',
  },
  {
    id: '3',
    title: 'Posts',
    icon: <FaNewspaper style={iconStylePost} />,
    link: '/posts',
  },
];
