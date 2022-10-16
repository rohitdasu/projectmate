import React, { useState } from 'react';
import Image from 'next/image';
import { AiFillCloseCircle } from 'react-icons/ai';
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
import { FileDrop } from '@/components/Form/FileDrop';
import { schema } from './schema';
import { yupResolver } from '@hookform/resolvers/yup';

type FormInputs = {
  tags: string[];
  projectName: string;
  repositoryLink: string;
  projectDescription: string;
  coverImage: string | null;
  content: string | null;
};

const fileTypes: string[] = ['JPG', 'JPEG', 'PNG', 'GIF'];

export const SubmitPageForm = () => {
  const { handleSubmit, setValue, watch, control, reset } = useForm<FormInputs>(
    {
      resolver: yupResolver(schema),
    }
  );
  const coverImageValue = watch('coverImage');
  const tags = watch('tags');

  const [tagInput, setTagInput] = useState<string>('');
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

  const onTagAddition = (
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
    if (tags && tags.length == 5) {
      toast.error('total number of tags should be 5');
      return;
    }
    const d = tags;
    field.onChange(d && d.length > 0 ? [...tags, value] : [value]);
    setTagInput('');
    e.preventDefault();
  };

  const onFileChange = (
    file: File,
    field: ControllerRenderProps<FormInputs, 'coverImage'>
  ) => {
    setFileError(false);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      field.onChange(readerEvent.target?.result);
    };
  };

  const removeTag = (index: number) => {
    setValue(
      'tags',
      tags.filter((element: string, i: number) => i !== index)
    );
  };
  return (
    <div className="mx-auto w-full px-4 lg:px-0">
      <form className="form-container mx-auto flex w-full flex-col space-y-6">
        <h1 className="mb-4 text-left text-3xl font-semibold">Add Project</h1>
        <Controller
          name="projectName"
          control={control}
          defaultValue=""
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
          defaultValue=""
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
          defaultValue=""
          render={({ field, fieldState }) => {
            return (
              <Input
                {...field}
                placeholder="Enter your project description"
                error={fieldState.error}
                value={field.value}
                label="Description"
                required
              />
            );
          }}
        />
        <Controller
          name="tags"
          control={control}
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
                  onKeyDown={(e) => onTagAddition(e, field)}
                  required
                  hintMessage="Note: only 5 tags are allowed"
                />
                {tags && tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags &&
                      tags.length > 0 &&
                      tags.map((tag, i) => (
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
              coverImageValue ? 'border-2 border-dashed border-green-700' : ''
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
                    <FileDrop
                      {...field}
                      fileKey={fileKey}
                      label="Drag or upload your Image."
                      classes={`file-uploader ${
                        fileError && 'file-uploader-error'
                      }`}
                      name={field.name}
                      maxSize={2}
                      types={fileTypes}
                      handleChange={(file: File) => onFileChange(file, field)}
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
  );
};
