import React, { useState } from 'react';
import Image from 'next/image';
import { FileUploader } from 'react-drag-drop-files';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Toaster } from 'react-hot-toast';
import { SharedLayout } from '@/components/Layouts/SharedLayout';

const AddProject = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState<string>('');
  const [projectName, setProjectName] = useState<string>('');
  const [githubRepo, setGithubRepo] = useState<string>('');
  const [projectInfo, setProjectInfo] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const addTags = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    const value = (e.target as HTMLInputElement).value;
    if (!value.trim()) return;
    if (tags.length >= 5) return;
    setTags([...tags, value]);
    setTagInput('');
  };
  const removeTag = (index: number) => {
    setTags(tags.filter((element, i) => i !== index));
  };
  const addImageToProject = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      setSelectedImage(readerEvent.target?.result);
    };
  };
  return (
    <SharedLayout title="Projectmate | Submit Project">
      <Toaster />
      <div className="flex space-y-4 flex-col w-full mt-4 mb-12">
        <div className="w-full px-4 lg:px-0 lg:w-[70%] mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full flex flex-col mx-auto space-y-6"
          >
            <h1 className="font-semibold text-left mb-4 text-3xl">
              Add Project
            </h1>
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-lg">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Enter your project name here"
                className="w-full items-center p-2 bg-transparent outline-none border rounded-md border-gray-500 "
              />
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-lg">
                Github Repositary <span className="text-red-500">*</span>
              </label>
              <input
                value={githubRepo}
                onChange={(e) => setGithubRepo(e.target.value)}
                placeholder="Paste repository link here."
                className="w-full p-2 bg-transparent outline-none border rounded-md border-gray-500 "
              />
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-lg">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={projectInfo}
                onChange={(e) => setProjectInfo(e.target.value)}
                cols={100}
                placeholder="Describe your project"
                className="w-full bg-transparent resize-none border-gray-500 border rounded-md outline-none p-2 h-[150px]"
              />
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-lg">
                Tags <span className="text-red-500">*</span>
              </label>
              <input
                onKeyDown={addTags}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Paste repository link here."
                className="w-full p-2 bg-transparent outline-none border rounded-md border-gray-500 "
              />
              <span className="text-sm text-gray-500">
                Note: only 5 tags are applicable
              </span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <div
                    key={i}
                    onClick={() => removeTag(i)}
                    className="flex flex-wrap group space-x-1 items-center text-[15px] cursor-pointer text-blue-500 bg-background-2 w-max px-4 py-2 rounded-full"
                  >
                    <span className="capitalize">{tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-lg">
                Image <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative mx-auto flex rounded-md h-[300px] ${
                  selectedImage ? 'border-2 border-green-700 border-dashed' : ''
                }`}
              >
                {selectedImage ? (
                  <>
                    <Image
                      src={selectedImage}
                      alt="project-image"
                      className="h-full w-full object-contain"
                      layout="fill"
                    />

                    <AiFillCloseCircle
                      onClick={() => setSelectedImage(null)}
                      size={30}
                      style={{
                        zIndex: '50',
                        cursor: 'pointer',
                        position: 'absolute',
                        right: 10,
                        top: 10,
                      }}
                    />
                  </>
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
              <span className="mx-auto flex items-center text-sm text-gray-500 mt-4 ">
                Note: We would advise you to upload a picture. otherwise, the
                default github icon will appear.
              </span>
            </div>
            <button className="bg-secondary-color  text-white px-8 py-2 rounded-md w-max ml-auto">
              Submit
            </button>
          </form>
        </div>
      </div>
    </SharedLayout>
  );
};

export default AddProject;
