import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../app/hooks';

const Project = ({ name, description, tags }) => {
  const Mode = useAppSelector((state) => state.mode.mode);
  return (
    <div
      className={` ${
        Mode ? 'text-white border-gray-200' : 'text-dark-color border-gray-600'
      } text-white border-b   py-2 items-center md:flex  space-x-2 space-y-2`}
    >
      <Image
        src={'/open-source.png'}
        alt={name}
        height={'500'}
        width={'500'}
        className="object-contain h-[200px] w-[200px]  "
      />
      <div className="flex flex-col space-y-2">
        <h1 className="font-semibold text-xl">{name}</h1>
        <p className="text-[14px] ">{description}</p>
        <div className="flex justify-between items-center ">
          <div className="flex space-x-2">
            {tags.map((tag, i) => (
              <p
                key={i}
                className={`p-2  ${
                  !Mode && 'text-white'
                } text-[14px] bg-primary-color cursor-pointer rounded-md`}
              >
                {tag}
              </p>
            ))}
          </div>
          <button
            className={`p-2 flex items-center space-x-2 mr-4 bg-secondary-color ${
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

export default Project;
