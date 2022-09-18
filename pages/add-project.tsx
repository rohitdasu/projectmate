import React, { useState } from 'react';
import Head from 'next/head';
import { Topbar } from '@/components/Topbar/Topbar';
import { Toaster } from 'react-hot-toast';
import { AuthModal } from '../components';
import { Icon } from '@iconify/react';
import { useAppSelector } from 'app/hooks';

const AddProject = () => {
  const mode = useAppSelector((state) => state.mode.mode);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [githubRepo, setGithubRepo] = useState<string>('');
  const [projectInfo, setProjectInfo] = useState<string>('');

  const addTags = (e: any) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value;
    if (!value.trim()) return;
    if (tags.length >= 5) return;
    setTags([...tags, value]);
    setTagInput('');
  };
  const removeTag = (index: any) => {
    setTags(tags.filter((element, i) => i !== index));
  };
  return (
    <div>
      <Head>
        <title>Projectmate | Add a Project</title>
      </Head>
      <Topbar />
      <main className="flex flex-col w-full">
        <Toaster />
        <AuthModal title={'Login to Continue'} />
        <div className="w-[90%] mx-auto mt-4">
          <h1 className="font-semibold text-center text-3xl text-secondary-color">
            Please fill the form to display to your project
          </h1>
          <div className="flex mt-6 space-x-4 ">
            <div className="w-[35%] ">
              <div
                className={`w-[80%] mx-auto flex items-center justify-center rounded-md ${
                  mode ? 'bg-gray-600' : 'bg-gray-100'
                } h-[300px]`}
              >
                <button className="bg-secondary-color py-2 px-4 rounded-md">
                  Browse files
                </button>
              </div>
              <span className="w-[80%] mx-auto flex items-center justify-center text-sm text-gray-500 mt-4 ">
                note: We would advise you to upload a picture. otherwise, the
                default github icon will appear.
              </span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex-1 space-y-6 px-4"
            >
              <div className="flex flex-col space-y-2">
                <label className="text-lg">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter your project name here"
                  className="flex-1 w-[80%] p-2 bg-transparent outline-none border rounded-md border-gray-500 "
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg">
                  Github Repositary <span className="text-red-500">*</span>
                </label>
                <input
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  placeholder="Paste repository link here."
                  className="flex-1 w-[80%] p-2 bg-transparent outline-none border rounded-md border-gray-500 "
                />
              </div>
              <div className="flex flex-col h-auto space-y-2">
                <label className="text-lg">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={projectInfo}
                  onChange={(e) => setProjectInfo(e.target.value)}
                  cols={100}
                  placeholder="Describe your project"
                  className="w-[80%] bg-transparent  resize-none border-gray-500 border rounded-md outline-none py-2 px-4 h-[100px]"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-lg">Tags</label>
                <input
                  onKeyDown={addTags}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Paste repository link here."
                  className="flex-1 w-[80%] p-2 bg-transparent outline-none border rounded-md border-gray-500 "
                />
                <span className="text-sm text-gray-500">
                  note: only 5 tags are applicable
                </span>
                <div className="flex space-x-2">
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      className="flex flex-wrap group space-x-1 items-center text-[15px] bg-primary-color text-white w-max px-4 py-2 rounded-md"
                    >
                      <span className="capitalize">{tag}</span>

                      <Icon
                        icon="akar-icons:cross"
                        color="white"
                        height={20}
                        width={20}
                        className="cursor-pointer hover:text-secondary-color rounded-full p-1"
                        onClick={() => removeTag(i)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <button className="bg-secondary-color p-2 rounded-md w-[80%]">
                Submit
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProject;
