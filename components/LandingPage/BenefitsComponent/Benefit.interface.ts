export type Benefit = {
  id: string;
  title: string;
  description: string;
};

export interface BenefitProps {
  benefits: Benefit[];
}
