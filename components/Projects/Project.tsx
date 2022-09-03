import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../app/hooks';

export const Project = ({ title, description, tags }: any) => {
  const Mode = useAppSelector((state) => state.mode.mode);
  return (
    <div
      className={`${
        Mode ? 'text-white bg-box-color border-gray-200' : 'text-dark-color'
      } text-white shadow-md w-full px-2 rounded-md items-center md:flex justify-center space-y-2`}
    >
      <div className="w-[250px] md:w-[500px] mx-auto h-auto p-4">
        <Image
          src={'/open-source.png'}
          alt={title}
          height={'300'}
          width={'300'}
          className="object-contain  "
        />
      </div>
      <div className="flex flex-col space-y-2 p-2">
        <h1 className="font-semibold text-xl">{title}</h1>
        <p className="text-[14px] ">{description}</p>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex space-x-2">
            {tags.map((tag: any, i: any) => (
              <p
                key={i}
                className={`p-2 ${
                  !Mode && 'text-white'
                } text-[14px] bg-primary-color cursor-pointer rounded-md`}
              >
                {tag}
              </p>
            ))}
          </div>
          <button
            className={`p-2 mt-2 sm:my-0 flex items-center space-x-2 bg-secondary-color ${
              !Mode && 'text-white'
            } rounded-md`}
          >
            <span className="mr-2">Contribute</span>
            <Image
              src="/right-arrows.png"
              height={15}
              width={15}
              alt="go"
              className=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};
