import React, { useState } from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
} from 'react-hook-form';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Lottie from 'lottie-react';
import Loader from '../../public/animations/loading.json';
import axios from 'axios';
import { Input } from '@/components/Form/Input';
import { schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { toastMessage, messageType } from '../../shared';
import { Button } from '@/components/Button';
import { Tags, RemoveTagFc } from '@/components/Tags';
import { Typography } from '../Typography';
import { FormInputs } from './SubmitPageForm.interface';

export const SubmitPageForm = () => {
  const { handleSubmit, setValue, watch, control, reset } = useForm<FormInputs>(
    {
      resolver: zodResolver(schema),
    }
  );
  const tags = watch('tags');
  const [loading, setLoading] = useState<boolean>(false);
  const [tagInput, setTagInput] = useState<string>('');

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
          content: '',
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

  const removeTag: RemoveTagFc = (event, index) => {
    event.preventDefault();
    setValue(
      'tags',
      tags.filter((element: string, i: number) => i !== index)
    );
  };

  return (
    <div className="mx-auto w-full px-4 lg:px-0">
      <form className="form-container mx-auto flex w-full flex-col space-y-6">
        <Typography
          as="h1"
          align="left"
          fontSize="3xl"
          fontWeight="semibold"
          className="mb-4"
        >
          Submit Project
        </Typography>
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
                  <>
                    <div className="flex items-center gap-2">
                      {tags && tags.length > 0 && (
                        <Tags
                          className="flex-wrap gap-2 uppercase"
                          tags={tags}
                          removeTagHandler={removeTag}
                        />
                      )}
                    </div>
                  </>
                )}
              </>
            );
          }}
        />
      </form>
      <div className="my-4 w-full">
        <Button
          isDisabled={loading}
          onClick={handleSubmit(onSubmit)}
          className="float-right mt-4 flex flex-row gap-4 px-8 py-2"
        >
          Submit
          {loading && (
            <svg
              aria-hidden="true"
              className="h-4 w-4 animate-spin fill-primary-color text-gray-200"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
        </Button>
      </div>
    </div>
  );
};
