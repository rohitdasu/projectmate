import Image from 'next/image';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/slices/sliceModal';
import { ProjectProps } from './Project.interface';
import thumbnail from '../../public/open-source.png';
import { AiOutlineUser } from 'react-icons/ai';

export const Project = ({ title, description, tags, author }: ProjectProps) => {
  const userLogged = useAppSelector((state) => state.user.isLogged);
  const dispatch = useDispatch();
  const handleContribute = () => {
    return;
  };
  return (
    <div className="w-full p-2 md:p-0">
      <div className="flex flex-col items-center justify-center space-y-2 overflow-hidden rounded-md shadow-border-shadow text-foreground-1">
        <div className="w-full">
          <Image src={thumbnail} alt={title} placeholder="blur" />
        </div>
        <div className="flex flex-col gap-5 p-4 pt-2">
          <h2 className="flex flex-col gap-2 text-xl font-semibold">
            {title}
            <span className="flex items-center gap-1 text-sm font-light ">
              <AiOutlineUser />
              {author}
            </span>
          </h2>
          <p className="text-sm ">{description}</p>
          <div className="flex flex-col gap-5">
            <div className="flex pb-2 space-x-2 md:pb-0">
              {tags.map((tag: string, i: number) => (
                <p
                  key={i}
                  className="px-2 py-1 text-sm font-medium text-blue-500 rounded-full cursor-pointer bg-background-2"
                >
                  {tag}
                </p>
              ))}
            </div>
            <button
              onClick={() =>
                userLogged ? handleContribute : dispatch(openModal())
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
