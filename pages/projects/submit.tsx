import React, { useState } from 'react';
import Image from 'next/image';
import { FileUploader } from 'react-drag-drop-files';
import { AiFillCloseCircle } from 'react-icons/ai';
import { Toaster } from 'react-hot-toast';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSession } from 'next-auth/react';

type FormInputs = {
  tags: string[];
  projectName: string;
  repositoryLink: string;
  projectDescription: string;
  coverImage: any;
};

const AddProject = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<FormInputs>();
  const { data: session } = useSession();

  const [tagInput, setTagInput] = useState<string>('');
  const removeTag = (index: number) => {
    setValue(
      'tags',
      watch('tags').filter((element, i) => i !== index)
    );
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetch('/api/project', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: data.projectName,
        description: data.projectDescription,
        githubRepository: data.repositoryLink,
        tags: data.tags,
        coverImg:
          'https://user-images.githubusercontent.com/48400770/190438248-fc0f3e42-c6d3-4d07-bcba-10e7fece4bc2.png',
        email: session?.user?.email,
      }),
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SharedLayout title="Projectmate | Submit Project">
      <Toaster />
      <div className="flex space-y-4 flex-col w-full mt-4 mb-12">
        <div className="w-full px-4 lg:px-0 lg:w-[70%] mx-auto">
          <form className="w-full flex flex-col mx-auto space-y-6">
            <h1 className="font-semibold text-left mb-4 text-3xl">
              Add Project
            </h1>
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-lg">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('projectName', { required: true, minLength: 3 })}
                placeholder="Enter your project name"
                className="w-full items-center p-2 bg-transparent outline-none border rounded-md border-gray-500 "
                aria-invalid={errors.projectName ? 'true' : 'false'}
              />
              {errors.projectName?.type === 'required' && (
                <p className="text-red-500">project name is required</p>
              )}
              {errors.projectName?.type === 'minLength' && (
                <p className="text-red-500">
                  project name should be minimum of 3 characters
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-lg">
                Repositary URL <span className="text-red-500">*</span>
              </label>
              <input
                {...register('repositoryLink', { required: true })}
                placeholder="Enter your repository URL"
                className="w-full p-2 bg-transparent outline-none border rounded-md border-gray-500"
                aria-invalid={errors.repositoryLink ? 'true' : 'false'}
              />
              {errors.repositoryLink?.type === 'required' && (
                <p className="text-red-500">repository link is required</p>
              )}
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-lg">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('projectDescription', {
                  required: true,
                  minLength: 15,
                })}
                cols={100}
                placeholder="Enter your project description"
                className="w-full bg-transparent resize-none border-gray-500 border rounded-md outline-none p-2 h-[150px]"
                aria-invalid={errors.projectDescription ? 'true' : 'false'}
              />
              {errors.projectDescription?.type === 'required' && (
                <p className="text-red-500">description is required</p>
              )}
              {errors.projectDescription?.type === 'minLength' && (
                <p className="text-red-500">
                  description should be minimum of 15 characters
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-2 w-full">
              <label className="text-lg">
                Tags <span className="text-red-500">*</span>
              </label>
              <Controller
                {...register('tags', { required: true })}
                name="tags"
                control={control}
                render={({ field }) => {
                  return (
                    <input
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key !== 'Enter') return;
                        const value = (e.target as HTMLInputElement).value;
                        if (!value.trim()) return;
                        if (watch('tags') && watch('tags').length == 5) return;
                        const d = watch('tags');
                        field.onChange(
                          d && d.length > 0
                            ? [...watch('tags'), value]
                            : [value]
                        );
                        setTagInput('');
                        e.preventDefault();
                      }}
                      value={tagInput}
                      name={field.name}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Enter your project tags"
                      className="w-full p-2 bg-transparent outline-none border rounded-md border-gray-500"
                      aria-invalid={errors.tags ? 'true' : 'false'}
                    />
                  );
                }}
              />
              {errors.tags?.type === 'required' && (
                <p className="text-red-500">tags are required</p>
              )}
              <span className="text-sm text-gray-500">
                Note: only 5 tags are applicable
              </span>
              <div className="flex flex-wrap gap-2">
                {watch('tags') &&
                  watch('tags').length > 0 &&
                  watch('tags').map((tag, i) => (
                    <div
                      key={i}
                      onClick={() => removeTag(i)}
                      className="flex flex-wrap group space-x-1 items-center text-[15px] cursor-pointer text-blue-500 bg-background-2 w-max px-4 py-2 rounded-full"
                    >
                      <span className="capitalize">{tag}</span>
                      <AiFillCloseCircle className="ml-2" />
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <label className="text-lg">Image</label>
              <div
                className={`relative mx-auto flex rounded-md h-[300px] ${
                  watch('coverImage')
                    ? 'border-2 border-green-700 border-dashed'
                    : ''
                }`}
              >
                {watch('coverImage') ? (
                  <>
                    <Image
                      src={watch('coverImage')}
                      alt="project-image"
                      className="h-full w-full object-contain"
                      layout="fill"
                    />

                    <AiFillCloseCircle
                      onClick={() => setValue('coverImage', null)}
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
                  <Controller
                    name="coverImage"
                    control={control}
                    render={({ field }) => {
                      return (
                        <FileUploader
                          {...field}
                          multiple={false}
                          label="Drag or upload your Image."
                          classes="file-uploader"
                          name={field.name}
                          handleChange={(file: File) => {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = (readerEvent) => {
                              field.onChange(readerEvent.target?.result);
                            };
                          }}
                        />
                      );
                    }}
                  />
                )}
              </div>
              <span className="mx-auto flex items-center text-sm text-gray-500 mt-4 ">
                Note: We would advise you to upload a picture. otherwise, the
                default github icon will appear.
              </span>
            </div>
          </form>
          <div className="w-full my-4">
            <button
              onClick={handleSubmit(onSubmit)}
              className="float-right bg-secondary-color text-white px-8 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};

export default AddProject;
