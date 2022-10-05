import { SharedLayout } from '@/components/Layouts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsBoxArrowUpRight } from 'react-icons/bs';

const ProjectDetails = () => {
  const router = useRouter();
  const { projectId } = router.query;
  return (
    <SharedLayout title="Project description">
      <div className="mx-auto mb-8 flex w-[90%] flex-col space-y-4 ">
        <h1 className="py-2 text-3xl font-semibold">
          PROJECTMATE - find your open source project.
        </h1>
        <div className="relative my-2 h-[200px] w-full sm:h-[400px] lg:h-[500px] ">
          <Image
            src="/project-mate.png"
            alt="Open source Image"
            layout="fill"
            // className="object-contain"
          />
          <div className="absolute  right-10 bottom-10 hidden items-center  space-x-4 rounded-xl bg-orange-600 py-2 px-8 sm:flex">
            <Image
              src={'/user.jpg'}
              alt="user-photo"
              height={40}
              width={40}
              className="rounded-full"
            />
            <div>
              <h1 className="text-lg font-semibold text-white">John Deo</h1>
              <span className="text-[12px] text-white">
                Published on 23/07/2022
              </span>
            </div>
          </div>
        </div>
        <div className="my-4 flex flex-col space-y-4">
          <p>
            A web app where you can find contributors for your open-source
            project or as an individual contributor you can find open-source
            projects. Best place to start open-source contribution. Find people
            who have the same vision as you do and contribute for building
            amazing products.
          </p>
          <p>
            A web app where you can find contributors for your open-source
            project or as an individual contributor you can find open-source
            projects. Best place to start open-source contribution. Find people
            who have the same vision as you do and contribute for building
            amazing products.
          </p>
        </div>
        <div>
          <h1 className="  mt-6 text-left text-3xl font-semibold">
            Skills required -{' '}
          </h1>
          <div className="mx-auto my-4 flex w-[95%] flex-wrap space-y-2 space-x-2">
            <span className="group flex w-max cursor-pointer flex-wrap items-center space-x-1 rounded-full bg-background-2 px-4 py-2 text-[15px] text-blue-500">
              NextAuth
            </span>
            <span className="group flex w-max cursor-pointer flex-wrap items-center space-x-1 rounded-full bg-background-2 px-4 py-2 text-[15px] text-blue-500">
              Nextjs
            </span>
            <span className="group flex w-max cursor-pointer flex-wrap items-center space-x-1 rounded-full bg-background-2 px-4 py-2 text-[15px] text-blue-500">
              Prisma
            </span>
            <span className="group flex w-max cursor-pointer flex-wrap items-center space-x-1 rounded-full bg-background-2 px-4 py-2 text-[15px] text-blue-500">
              Mongo
            </span>
          </div>
        </div>
        <button className="m-auto flex w-max items-center space-x-4 rounded-md bg-orange-500 p-2 px-4 py-2 text-xl font-semibold text-white hover:bg-orange-400">
          <span>Contribute now</span> <BsBoxArrowUpRight />
        </button>
      </div>
    </SharedLayout>
  );
};

export default ProjectDetails;
