import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
} from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Lottie from 'lottie-react';
import Loader from '../../public/loading.json';
import axios from 'axios';
import { Input } from '@/components/Form/Input';
import { RichTextEditor } from '@/components/Form/RichTextEditor';
import { schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastMessage, messageType } from '../../shared';
import { Button } from '@/components/Form/Button';

type FormInputs = {
  tags: string[];
  projectName: string;
  repositoryLink: string;
  projectDescription: string;
  coverImage: string | null;
  content: string | null;
};

export const SubmitPageForm = () => {
  const { handleSubmit, setValue, watch, control, reset } = useForm<FormInputs>(
    {
      resolver: zodResolver(schema),
    }
  );
  const tags = watch('tags');
  const [loading, setLoading] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>('');
  const [contentInput, setContentInput] = useState<string>('');

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

  const resetFormData = () => {
    setContentInput('');
    reset();
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    if (loading) return;
    try {
      setLoading(true);
      await axios.post(
        '/api/project',
        {
          title: data.projectName,
          description: data.projectDescription,
          content: data.content || '',
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
      setLoading(false);
      toastMessage('project added successfully', messageType.success);
      resetFormData();
    } catch (e) {
      setLoading(false);
      toastMessage(e.message, messageType.error);
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
      toastMessage(
        "tag length shouldn't exceed 15 characters",
        messageType.error
      );
      return;
    }
    if (tags && tags.length == 5) {
      toastMessage('total number of tags should be 5', messageType.error);
      return;
    }
    const d = tags;
    field.onChange(d && d.length > 0 ? [...tags, value] : [value]);
    setTagInput('');
    e.preventDefault();
  };

  const removeTag = (index: number) => {
    setValue(
      'tags',
      tags.filter((element: string, i: number) => i !== index)
    );
  };

  const onContentChange = (
    contentValue: string,
    field: ControllerRenderProps<FormInputs, 'content'>
  ) => {
    field.onChange(contentValue);
    setContentInput(contentValue);
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
                          className="group flex w-max cursor-pointer flex-wrap items-center space-x-2 rounded-full bg-background-2 bg-orange-100 px-4 py-2 text-[15px] text-orange-500 focus:ring dark:bg-[#2c1c0f] dark:text-orange-400"
                        >
                          <span className="text-sm uppercase">{tag}</span>
                          <AiFillCloseCircle />
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
            return (
              <RichTextEditor
                {...field}
                label={'Content'}
                value={contentInput}
                onChange={(value) => onContentChange(value, field)}
              />
            );
          }}
        />
      </form>
      <div className="my-4 w-full">
        <Button
          isDisabled={loading}
          onClick={handleSubmit(onSubmit)}
          className="float-right mt-4 px-8 py-2"
          loading={loading}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};
