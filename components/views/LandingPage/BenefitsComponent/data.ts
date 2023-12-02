import { BenefitProps } from './Benefit.interface';
import { Globe, Code, Users, BarChart4, UserPlus } from 'lucide-react';

export const benefits: BenefitProps[] = [
  {
    id: '1',
    title: 'Showcase GitHub Repositories',
    description:
      'Highlight your open-source projects from GitHub for increased visibility',
    icon: Code,
  },
  {
    id: '2',
    title: 'Enhanced Repository Statistics',
    description:
      'Explore detailed statistics and insights for all listed projects to determine which ones align best with your interests and contributions',
    icon: BarChart4,
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description:
      'Create a personalized profile to showcase your projects, skills, and social links and utilize your public profile as a portfolio website to showcase your work and attract opportunities',
    icon: Globe,
  },
  {
    id: '4',
    title: 'Connect with Contributors',
    description:
      'Discover and connect with like-minded contributors through the Mates page',
    icon: Users,
  },
];
