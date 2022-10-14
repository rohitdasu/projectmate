import React, { useState } from 'react';
import Image from 'next/image';
import { FileUploader } from 'react-drag-drop-files';
import { AiFillCloseCircle } from 'react-icons/ai';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import Loader from '../../public/loading.json';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type FormInputs = {
  tags: string[];
  projectName: string;
  repositoryLink: string;
  projectDescription: string;
  coverImage: string | null;
};

const fileTypes: string[] = ['JPG', 'JPEG', 'PNG', 'GIF'];

const SubmitProject = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const [tagInput, setTagInput] = useState<string>('');
  const removeTag = (index: number) => {
    setValue(
      'tags',
      watch('tags').filter((element: string, i: number) => i !== index)
    );
  };

  const [fileError, setFileError] = useState(false);
  const [fileKey, setFileKey] = useState(uuidv4().toString());

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      Router.push('/');
    },
  });

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Lottie animationData={Loader} />
      </div>
    );
  }

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    try {
      await axios.post(
        '/api/project',
        {
          title: data.projectName,
          description: data.projectDescription,
          githubRepository: data.repositoryLink,
          tags: data.tags,
          coverImg:
            'https://user-images.githubusercontent.com/48400770/190438248-fc0f3e42-c6d3-4d07-bcba-10e7fece4bc2.png',
          email: session?.user?.email,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('project added successfully');
      reset();
      setFileError(false);
      setFileKey(uuidv4().toString());
    } catch (e) {
      toast.error(e.message);
    }
  };

  const coverImageValue = watch('coverImage');

  return (
    <SharedLayout title="Submit Project">
      <div className="mt-4 mb-12 flex w-full flex-col space-y-4">
        <div className="mx-auto w-full px-4 lg:w-[70%] lg:px-0">
          <form className="form-container mx-auto flex w-full flex-col space-y-6">
            <h1 className="mb-4 text-left text-3xl font-semibold">
              Add Project
            </h1>
            <div className="flex w-full flex-col space-y-2">
              <label className="text-lg">
                Project Name <span className="text-red-500">*</span>
              </label>
              <input
                {...register('projectName', { required: true, minLength: 3 })}
                placeholder="Enter your project name"
                className={`w-full items-center rounded-md border border-gray-500 bg-transparent p-2 outline-none focus:border-2 focus:border-2 focus:border-blue-600 ${
                  errors.projectName && 'border-red-500'
                }`}
                aria-invalid={errors.projectName ? 'true' : 'false'}
              />
              {errors.projectName?.type === 'required' && (
                <p className="text-xs text-red-500">project name is required</p>
              )}
              {errors.projectName?.type === 'minLength' && (
                <p className="text-xs text-red-500">
                  project name should be minimum of 3 characters
                </p>
              )}
            </div>
            <div className="flex w-full flex-col space-y-2">
              <label className="text-lg">
                Repository URL <span className="text-red-500">*</span>
              </label>
              <input
                {...register('repositoryLink', {
                  required: {
                    value: true,
                    message: 'repository link is required',
                  },
                  pattern: {
                    value:
                      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
                    message: 'repository link is invalid',
                  },
                })}
                placeholder="Enter your repository URL"
                className={`w-full rounded-md border border-gray-500 bg-transparent p-2 outline-none focus:border-2 focus:border-blue-600 ${
                  errors.repositoryLink && 'border-red-500'
                }`}
                aria-invalid={errors.repositoryLink ? 'true' : 'false'}
              />
              {(errors.repositoryLink?.type === 'required' ||
                errors.repositoryLink?.type === 'pattern') && (
                <p className="text-xs text-red-500">
                  {errors.repositoryLink?.message}
                </p>
              )}
            </div>
            <div className="flex w-full flex-col space-y-2">
              <label className="text-lg">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                {...register('projectDescription', {
                  required: true,
                  minLength: 160,
                })}
                cols={100}
                placeholder="Enter your project description"
                className={`h-[150px] w-full resize-none rounded-md border-gray-500 bg-transparent p-2 ${
                  errors.projectDescription && 'border-red-500'
                }`}
                aria-invalid={errors.projectDescription ? 'true' : 'false'}
              ></textarea>
              {errors.projectDescription?.type === 'required' && (
                <p className="text-xs text-red-500">description is required</p>
              )}
              {errors.projectDescription?.type === 'minLength' && (
                <p className="text-xs text-red-500">
                  description should be minimum of 160 characters
                </p>
              )}
            </div>
            <div className="flex w-full flex-col space-y-2">
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
                        if (value.length > 15) {
                          toast.error(
                            "tag length shouldn't exceed 15 characters"
                          );
                          return;
                        }
                        if (watch('tags') && watch('tags').length == 5) {
                          toast.error('total number of tags should be 5');
                          return;
                        }
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
                      className={`w-full rounded-md border border-gray-500 bg-transparent p-2 outline-none focus:border-2 focus:border-blue-600 ${
                        errors.tags && 'border-red-500'
                      }`}
                      aria-invalid={errors.tags ? 'true' : 'false'}
                    />
                  );
                }}
              />
              {errors.tags?.type === 'required' && (
                <p className="text-xs text-red-500">tags are required</p>
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
                      className="group flex w-max cursor-pointer flex-wrap items-center space-x-1 rounded-full bg-background-2 px-4 py-2 text-[15px] text-blue-500"
                    >
                      <span className="uppercase">{tag}</span>
                      <AiFillCloseCircle className="ml-2" />
                    </div>
                  ))}
              </div>
            </div>
            <div className="cover-container space-y-2">
              <label className="text-lg">Cover Image</label>
              <div
                className={`relative mx-auto flex h-[300px] rounded-md ${
                  coverImageValue
                    ? 'border-2 border-dashed border-green-700'
                    : ''
                }`}
              >
                {coverImageValue ? (
                  <>
                    <Image
                      src={coverImageValue}
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
                          key={fileKey}
                          multiple={false}
                          label="Drag or upload your Image."
                          classes={`file-uploader ${
                            fileError && 'file-uploader-error'
                          }`}
                          name={field.name}
                          maxSize={2}
                          types={fileTypes}
                          handleChange={(file: File) => {
                            setFileError(false);
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = (readerEvent) => {
                              field.onChange(readerEvent.target?.result);
                            };
                          }}
                          onTypeError={() => setFileError(true)}
                          onSizeError={() => setFileError(true)}
                        />
                      );
                    }}
                  />
                )}
              </div>
              <span className="mx-auto mt-4 flex items-center text-sm text-gray-500 ">
                Note: We would advise you to upload a picture. otherwise, the
                default github icon will appear.
              </span>
            </div>
            <div className="space-y-2">
              <label className="text-lg">
                Content <span className="text-red-500">*</span>
              </label>
              <ReactQuill theme="snow" value={''} />
            </div>
          </form>
          <div className="my-4 w-full">
            <button
              onClick={handleSubmit(onSubmit)}
              className="float-right rounded-md bg-secondary-color px-8 py-2 text-white hover:bg-blue-800 focus:bg-blue-800 focus:ring"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </SharedLayout>
  );
};

export default SubmitProject;
