import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineLaptop } from 'react-icons/ai';
import { HiOutlineCode } from 'react-icons/hi';

import learning_image from './assets/learning.jpg';
import portfolio_image from './assets/portfolio.jpg';

export const guide_steps = [
  {
    title: 'register',
    desc: 'you can easily sign up in 10 seconds using your social accounts',
    Icon: AiOutlineUsergroupAdd,
  },
  {
    title: 'explore',
    desc: 'ready for an adventure ? start browsing the projects section',
    Icon: FiSearch,
  },
  {
    title: 'project',
    desc: 'pick up a project which fits your skills, or add your own project',
    Icon: AiOutlineLaptop,
  },
  {
    title: 'contribute',
    desc: 'you can start contributing or get contributors for your project',
    Icon: HiOutlineCode,
  },
];

export const benefits_data = [
  {
    image_src: learning_image,
    image_alt: 'programmer looking at his monitor',
    title: 'Learning from and within the community',
    desc: '  Working in an open source environment makes the developers part of the global open source community. It allows them to use the work andknowledge of others by using open source libraries or by checking other publicly available code for logics that the developer wants to implement.',
  },

  {
    image_src: portfolio_image,
    image_alt: 'programmer looking at his monitor',
    title: 'Boost your portfolio as a developer',
    desc: 'The code of an open source software is public and thus visible and shareable. Consequently, a software developer can openly share their work, both the result but also how it was achieved. Over time, a whole portfolio can be built up and is available and visible e.g. for the community to go through the developer’s focus, knowledge and capabilities.',
    reverse: true,
  },
];
