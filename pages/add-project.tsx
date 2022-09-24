import React, { useRef, useState } from 'react';
import Head from 'next/head';
import { Topbar } from '@/components/Topbar/Topbar';
import { Toaster } from 'react-hot-toast';
import { AuthModal } from '../components';
import { FileUploader } from 'react-drag-drop-files';
import Image from 'next/image';

const AddProject = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [githubRepo, setGithubRepo] = useState<string>('');
  const [projectInfo, setProjectInfo] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const fileType = ['JPEG', 'JPG', 'PNG', 'GIF'];

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
  const addImageToProject = (file: any) => {
    const reader = new FileReader();
    console.log(file);
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target?.result);
    };
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
        <div className="sm:w-[90%] w-full mx-auto my-4">
          <div className=" flex space-y-4 flex-col">
            <h1 className="font-semibold  w-[85%] sm:w-[65%]  mx-auto mb-4 text-3xl ">
              Add Project
            </h1>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="w-full sm:w-[80%]  flex flex-col mx-auto space-y-6"
            >
              <div className="flex w-[85%] sm:w-[80%] mx-auto  flex-col space-y-2">
                <label className="text-lg">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <input
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter your project name here"
                  className="flex-1 w-full items-center mx-auto p-2 bg-transparent outline-none border rounded-md border-gray-500 "
                />
              </div>
              <div className="flex flex-col w-[85%] sm:w-[80%] mx-auto space-y-2">
                <label className="text-lg">
                  Github Repositary <span className="text-red-500">*</span>
                </label>
                <input
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  placeholder="Paste repository link here."
                  className="flex-1 w-full p-2 bg-transparent outline-none border rounded-md border-gray-500 "
                />
              </div>
              <div className="flex flex-col w-[85%] sm:w-[80%] mx-auto h-auto space-y-2">
                <label className="text-lg">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={projectInfo}
                  onChange={(e) => setProjectInfo(e.target.value)}
                  cols={100}
                  placeholder="Describe your project"
                  className="w-full bg-transparent  resize-none border-gray-500 border rounded-md outline-none py-2 px-4 h-[100px]"
                />
              </div>
              <div className="flex flex-col w-[85%] sm:w-[80%] mx-auto space-y-2">
                <label className="text-lg">Tags</label>
                <input
                  onKeyDown={addTags}
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Paste repository link here."
                  className="flex-1 w-full p-2 bg-transparent outline-none border rounded-md border-gray-500 "
                />
                <span className="text-sm text-gray-500">
                  note: only 5 tags are applicable
                </span>
                <div className="flex flex-wrap gap-2 ">
                  {tags.map((tag, i) => (
                    <div
                      key={i}
                      onClick={() => removeTag(i)}
                      className="flex flex-wrap group space-x-1 items-center text-[15px]  text-blue-500 bg-background-2 w-max px-4 py-2 rounded-full"
                    >
                      <span className="capitalize">{tag}</span>
                    </div>
                  ))}
                </div>
              </div>
            </form>
            <div className="w-full flex flex-col space-y-4 sm:w-[80%] mx-auto">
              <div
                className={`w-[85%] relative sm:w-[80%] mx-auto flex   rounded-md  h-[300px]`}
              >
                {selectedImage ? (
                  <Image
                    onClick={() => setSelectedImage(null)}
                    src={selectedImage}
                    alt="project-image"
                    className="h-full w-full object-contain cursor-pointer"
                    layout="fill"
                  />
                ) : (
                  <FileUploader
                    multiple={false}
                    label="Drag or upload your Image."
                    classes="file-uploader"
                    handleChange={addImageToProject}
                    name="file"
                  />
                )}
              </div>
              <span className="w-[85%] sm:w-[80%] mx-auto flex items-center  text-sm text-gray-500 mt-4 ">
                note: We would advise you to upload a picture. otherwise, the
                default github icon will appear.
              </span>
              <div className="w-[85%] sm:w-[80%] mx-auto  flex justify-end">
                <button className="bg-secondary-color  px-8 py-2 rounded-md w-max ml-auto">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProject;
