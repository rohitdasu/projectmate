import { BenefitProps } from './Benefit.interface';
import { PlusCircle, Compass, HeartHandshake, BarChart4 } from 'lucide-react';

export const benefits: BenefitProps[] = [
  {
    id: '1',
    title: 'Add Projects',
    description: 'Boost your project’s visibility by adding it to our platform',
    icon: PlusCircle,
  },
  {
    id: '2',
    title: 'Discover Relevant Projects',
    description:
      'Find open-source projects in your tech stack and contribute to the community',
    icon: Compass,
  },
  {
    id: '3',
    title: 'Connect With Contributors',
    description:
      'Collaborate with like-minded contributors by exploring profiles of registered users',
    icon: HeartHandshake,
  },
  {
    id: '4',
    title: 'Grow Your Audience',
    description:
      'Reach a wider audience and attract potential contributors by showcasing your projects to a community with daily unique visitors of 50+',
    icon: BarChart4,
  },
];
