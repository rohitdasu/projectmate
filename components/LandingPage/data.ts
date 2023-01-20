import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineLaptop } from 'react-icons/ai';
import { HiOutlineCode } from 'react-icons/hi';
import sharing from '../../public/images/sharing_knowledge.jpg';
import reputation from '../../public/images/build_reputation.jpg';
import collaborate from '../../public/images/collaboration.jpg';
import visibility from '../../public/images/visibility.jpg';
import opensource from '../../public/images/opensource.jpg';
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa';

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
    desc: 'you can start contributing / get contributors for your project',
    Icon: HiOutlineCode,
  },
];

export const benefits_data = [
  {
    image_src: sharing,
    image_alt: 'sharing knowledge, bulb image with blue lines',
    title: 'Sharing Knowledge',
    desc: 'By sharing your open-source projects on Projectmate, you can help others learn from your work and contribute to the broader community of developers. This can also help you learn from others, as you may receive feedback and suggestions for improvement from users of your projects.',
  },
  {
    image_src: reputation,
    image_alt: 'building a reputation, man standing in the spotlight',
    title: 'Building a reputation',
    desc: 'You can build a reputation as a developer and demonstrate your expertise to potential employers or clients.',
    reverse: true,
  },
  {
    image_src: collaborate,
    image_alt: 'collaborating with others, people holding each others hands',
    title: 'Collaborating with others',
    desc: 'Adding your open-source projects on Projectmate can also help facilitate collaboration with other developers. This can allow you to work on larger and more complex projects, and can help you learn from others in the process.',
  },
  {
    image_src: visibility,
    image_alt: 'Increasing the visibility of your work, people cheering',
    title: 'Increasing the visibility of your work',
    desc: 'You can increase the visibility of your work and potentially reach a wider audience. This can help you gain recognition and potentially lead to new opportunities.',
    reverse: true,
  },
  {
    image_src: opensource,
    image_alt: 'promoting opensource values, opensource symbol (infinity)',
    title: 'Promoting open-source values',
    desc: 'You can also help promote the values of open-source software, such as transparency, collaboration, and sharing. This can help support the broader open-source community and contribute to the development of new technologies and solutions.',
  },
];

export const getSocialLinks = () => [
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
  {
    title: 'Twitter',
    url: 'https://twitter.com/projectmateHQ',
    Icon: FaTwitter,
    anchorTagProps: {
      target: '_blank',
      rel: 'noreferrer',
    },
  },
];
