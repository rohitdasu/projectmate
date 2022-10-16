import React, { useState } from 'react';
import Image from 'next/image';
import { FileUploader } from 'react-drag-drop-files';
import { AiFillCloseCircle } from 'react-icons/ai';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
} from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import Loader from '../../public/loading.json';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Input } from '@/components/Form/Input';
import { RichTextEditor } from '@/components/Form/RichTextEditor';

type FormInputs = {
  tags: string[];
  projectName: string;
  repositoryLink: string;
  projectDescription: string;
  coverImage: string | null;
  content: string | null;
};

const fileTypes: string[] = ['JPG', 'JPEG', 'PNG', 'GIF'];

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
};

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

  const handleOnKeyDown = (
    e: React.KeyboardEvent,
    field: ControllerRenderProps<FormInputs, 'tags'>
  ) => {
    if (e.key !== 'Enter') return;
    const value = (e.target as HTMLInputElement).value;
    if (!value.trim()) return;
    if (value.length > 15) {
      toast.error("tag length shouldn't exceed 15 characters");
      return;
    }
    if (watch('tags') && watch('tags').length == 5) {
      toast.error('total number of tags should be 5');
      return;
    }
    const d = watch('tags');
    field.onChange(d && d.length > 0 ? [...watch('tags'), value] : [value]);
    setTagInput('');
    e.preventDefault();
  };

  return (
    <SharedLayout title="Submit Project" hasContainer>
      <div className="mt-4 mb-12 flex w-full flex-col space-y-4 px-0 lg:px-4">
        <div className="mx-auto w-full px-4 lg:px-0">
          <form className="form-container mx-auto flex w-full flex-col space-y-6">
            <h1 className="mb-4 text-left text-3xl font-semibold">
              Add Project
            </h1>
            <Controller
              name="projectName"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Project name must be provided',
                },
                minLength: {
                  value: 2,
                  message: 'Project name must be at least 2 characters long',
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    placeholder="Enter your project name"
                    error={fieldState.error}
                    label="Project Name"
                    required
                  />
                );
              }}
            />
            <Controller
              name="repositoryLink"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'repository link is required',
                },
                pattern: {
                  value:
                    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
                  message: 'repository link is invalid',
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    placeholder="Enter your repository URL"
                    error={fieldState.error}
                    label="Repository URL"
                    required
                  />
                );
              }}
            />
            <Controller
              name="projectDescription"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Project description is required',
                },
                minLength: {
                  value: 160,
                  message:
                    'Project description must be at least 160 characters long',
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    placeholder="Enter your project description"
                    error={fieldState.error}
                    label="Description"
                    required
                  />
                );
              }}
            />
            <Controller
              name="tags"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: 'Tags are required',
                },
              }}
              render={({ field, fieldState }) => {
                return (
                  <>
                    <Input
                      {...field}
                      placeholder="Enter your project tags"
                      onChange={(e) => setTagInput(e.target.value)}
                      error={fieldState.error}
                      label="Tags"
                      value={tagInput}
                      onKeyDown={(e) => handleOnKeyDown(e, field)}
                      required
                      hintMessage="Note: only 5 tags are allowed"
                    />
                    {watch('tags') && watch('tags').length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {watch('tags') &&
                          watch('tags').length > 0 &&
                          watch('tags').map((tag, i) => (
                            <div
                              key={i}
                              onClick={() => removeTag(i)}
                              className="group flex w-max cursor-pointer flex-wrap items-center space-x-1 rounded-full bg-background-2 px-4 py-2 text-[15px] text-blue-500"
                            >
                              <span>{tag}</span>
                              <AiFillCloseCircle className="ml-2" />
                            </div>
                          ))}
                      </div>
                    )}
                  </>
                );
              }}
            />
            <Controller
              name="content"
              control={control}
              render={({ field }) => {
                return <RichTextEditor {...field} label={'Content'} />;
              }}
            />
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
              <p className="mt-4 text-sm italic text-gray-500">
                Note: We would advise you to upload a picture. otherwise, the
                default github icon will appear.
              </p>
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
