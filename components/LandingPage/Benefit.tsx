import Image from 'next/image';
import { benefits_data } from './data';
import type { StaticImageData } from 'next/image';

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
      <div className="flex h-[400px] w-[100%] max-w-[30rem] overflow-hidden rounded-md lg:min-w-[30rem]">
        <Image
          src={image_src}
          placeholder="blur"
          alt={image_alt}
          objectFit="cover"
        />
      </div>
      <div className="flex max-w-[30rem] flex-col gap-10 text-center lg:max-w-[100%] lg:text-left">
        <h2 className="text-3xl font-bold">{title}</h2>
        <p>{desc}</p>
      </div>
    </li>
  );
};

export const BenefitsContainer = () => {
  return (
    <ul className="flex flex-col gap-[7rem] px-4 py-[5rem]">
      {benefits_data.map((item) => {
        return <Benefit key={item.title} {...item} />;
      })}
    </ul>
  );
};
