import Image from 'next/legacy/image';
import { benefits_data } from './data';
import type { StaticImageData } from 'next/legacy/image';
import { Typography } from '@/components/Typography';

interface IProps {
  title: string;
  desc: string;
  reverse?: boolean;
  image_src: StaticImageData;
  image_alt: string;
}

export const Benefit: React.FC<IProps> = ({
  title,
  desc,
  reverse,
  image_src,
  image_alt,
}) => {
  return (
    <li
      className={`flex flex-col items-center gap-10 lg:flex-row ${
        reverse && 'lg:flex-row-reverse'
      }`}
    >
      <div className="flex h-[400px] w-[100%] overflow-hidden rounded-md lg:min-w-[30rem]">
        <Image
          src={image_src}
          placeholder="blur"
          alt={image_alt}
          objectFit="cover"
        />
      </div>
      <div className="flex max-w-[30rem] flex-col gap-10 text-center lg:max-w-[100%] lg:text-left">
        <Typography
          as="h2"
          align="left"
          fontSize="2xl"
          fontWeight="bold"
          className="text-gray-300 md:text-3xl"
        >
          {title}
        </Typography>
        <Typography
          as="p"
          align="justify"
          fontSize="base"
          fontWeight="light"
          className="text-gray-300 md:text-left md:text-lg"
        >
          {desc}
        </Typography>
      </div>
    </li>
  );
};

export const BenefitsContainer = () => {
  return (
    <div>
      <Typography
        as="h2"
        align="center"
        fontSize="2xl"
        fontWeight="bold"
        className="mb-20 md:text-3xl"
      >
        What are the Benefits ?
      </Typography>
      <ul className="flex flex-col gap-28">
        {benefits_data.map((item) => {
          return <Benefit key={item.title} {...item} />;
        })}
      </ul>
    </div>
  );
};
