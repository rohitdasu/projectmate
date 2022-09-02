import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../app/hooks';

const Project = ({ name, description, tags }) => {
  const Mode = useAppSelector((state) => state.mode.mode);
  return (
    <div
      className={` ${
        Mode ? 'text-white bg-box-color border-gray-200' : 'text-dark-color'
      } text-white shadow-md md:w-full w-[95%] p-2 rounded-md sm:pb-0  pb-[2rem] !mx-auto  py-2 items-center md:flex  justify-center space-x-2 space-y-2`}
    >
      <div className="md:w-[500px] w-[250px] mx-auto h-auto">
        <Image
          src={'/open-source.png'}
          alt={name}
          height={'300'}
          width={'300'}
          className="object-contain  "
        />
      </div>
      <div className="flex flex-col space-y-2">
        <h1 className="font-semibold text-xl">{name}</h1>
        <p className="text-[14px] ">{description}</p>
        <div className="sm:flex block justify-between items-center ">
          <div className="flex  space-x-2">
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
            className={`p-2 sm:my-0 my-2 flex items-center space-x-2 mr-4 bg-secondary-color ${
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
