import Image from 'next/legacy/image';
import { benefits_data } from './data';
import type { StaticImageData } from 'next/legacy/image';

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
        <h2 className="text-left text-2xl font-bold text-gray-800 dark:text-gray-300 md:text-3xl">
          {title}
        </h2>
        <p className="text-md text-justify font-light text-gray-800 dark:text-gray-300 md:text-left md:text-lg">
          {desc}
        </p>
      </div>
    </li>
  );
};

export const BenefitsContainer = () => {
  return (
    <div className="py-28 px-4">
      <h2 className="mb-[5rem] text-center text-2xl font-bold md:text-3xl">
        What are the Benefits ?
      </h2>
      <ul className="flex flex-col gap-28">
        {benefits_data.map((item) => {
          return <Benefit key={item.title} {...item} />;
        })}
      </ul>
    </div>
  );
};
