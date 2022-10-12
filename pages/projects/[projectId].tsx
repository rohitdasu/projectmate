import { SharedLayout } from '@/components/Layouts';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import axios from 'axios';
import useSWR from 'swr';
import thumbnail from '@/../public/open-source.png';

const ProjectDetails = () => {
  const router = useRouter();
  const { projectId } = router.query || {};

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(`/api/project/${projectId}`, fetcher);
  const { results: projectData } = data || {};

  if (error)
    return <div className="m-auto my-5 text-lg">Failed to load projects</div>;

  if (!data) return <div className="m-auto my-5 text-lg">Loading...</div>;

  return (
    <SharedLayout title="Project description">
      <div className="flex w-full">
        <div className="container m-auto mb-10 flex flex-col p-4 md:w-[85%]">
          <h1 className="py-2 text-4xl font-semibold">
            {projectData?.title.toUpperCase()}
          </h1>
          <div className="relative my-2 h-[300px] sm:h-[400px] lg:h-[500px]">
            <Image
              className="rounded-2xl object-cover"
              src={thumbnail}
              alt="Open source Image"
              layout="fill"
            />
          </div>
          <div className="mt-6 flex flex-row items-center gap-5">
            <Image
              src={
                projectData?.author.image ||
                `https://avatars.dicebear.com/api/initials/${projectData?.author.name}.png?backgroundColorLevel=800&fontSize=40`
              }
              alt="user-photo"
              height={40}
              width={40}
              className="rounded-full"
            />
            <h1 className="text-lg font-semibold">
              {projectData?.author.name}
            </h1>
            <span className="text-[12px] text-gray-400">
              {new Date(projectData?.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="my-6 flex flex-col">
            <p>{projectData?.description}</p>
          </div>
          <div>
            <h1 className="mt-6 text-left text-3xl font-semibold">
              Technology stack
            </h1>
            <div className="mt-5 mb-7 flex flex-wrap gap-3">
              {projectData?.tags.map((tag: string[], index: number) => (
                <span
                  key={index}
                  className="group flex w-max cursor-pointer flex-wrap items-center rounded-full bg-background-2 px-3 py-2 text-[15px] text-blue-500"
                >
                  NextAuth
                </span>
              ))}
            </div>
          </div>
          <button className=" flex w-max items-center space-x-4 rounded-md bg-orange-500 px-4 py-2 text-xl font-semibold text-white transition-all hover:bg-orange-400 hover:opacity-90">
            <span>Contribute now</span> <BsBoxArrowUpRight />
          </button>
        </div>
      </div>
    </SharedLayout>
  );
};

export default ProjectDetails;
