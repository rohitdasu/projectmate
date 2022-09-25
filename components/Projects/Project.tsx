import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { openModal } from '@/store/slices/sliceModal';
import { ProjectProps } from './Project.interface';
import thumbnail from '../../public/open-source.png';
import { AiOutlineUser } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import { Tags } from './Tags';

export const Project = ({ title, description, tags, author }: ProjectProps) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const handleContribute = () => {
    return;
  };

  return (
    <div className="w-full p-2 md:p-0">
      <div className="h-full flex flex-col items-center overflow-hidden rounded-md shadow-border-shadow text-foreground-1">
        <div className="w-full h-72 relative sm:h-96 md:h-64">
          <Image
            className="object-cover"
            layout="fill"
            src={thumbnail}
            alt={title}
            placeholder="blur"
          />
        </div>
        <div className="w-full flex flex-col grow gap-5 p-4 pt-4">
          <h2 className="flex flex-col gap-2 text-xl font-semibold">
            {title}
            <span className="flex items-center gap-1 text-sm font-light ">
              <AiOutlineUser />
              {author}
            </span>
          </h2>
          <p className="h-[80px] text-sm line-clamp-4">{description}</p>
          <div className="flex flex-col gap-5">
            <div className="flex pb-2 space-x-2 md:pb-0">
              <Tags tags={tags} tagsNumber={2} />
            </div>
            <button
              onClick={() =>
                session ? handleContribute : dispatch(openModal())
              }
              className="rounded-md px-2 py-1.5 mt-2 sm:my-0 flex justify-center bg-secondary-color text-white font-bold"
            >
              <span>Contribute</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
