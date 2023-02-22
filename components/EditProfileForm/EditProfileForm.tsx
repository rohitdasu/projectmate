import React from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
} from 'react-hook-form';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/Form';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/Form/Textarea';
import { toastMessage, messageType } from 'shared';
import { Tags, RemoveTagFc } from '@/components/Tags';
import {
  EditableUserDetails,
  EditProfileFormProps,
} from '@/components/EditProfileForm/EditProfileForm.interface';
import { schema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useRouter } from 'next/router';

export const EditProfileForm: React.FC<EditProfileFormProps> = ({
  currentTitle,
  currentDescription,
  currentSkills,
}) => {
  const [isEditShowed, setIsEditShowed] = useState({
    title: false,
    description: false,
  });

  const [skillsInput, setSkillsInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { handleSubmit, setValue, watch, control } =
    useForm<EditableUserDetails>({
      defaultValues: {
        title: currentTitle || '',
        description: currentDescription || '',
        skills: currentSkills || [],
      },
      resolver: zodResolver(schema),
    });
  const router = useRouter();

  const skills = watch('skills');

  const MAX_NUMBER_OF_TAGS = 4;
  const USER_DETAILS_URL = '/api/user/details';

  const onSubmit: SubmitHandler<EditableUserDetails> = async ({
    title,
    description,
    skills,
  }) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await axios.post(
        USER_DETAILS_URL,
        {
          title: title,
          description: description,
          skills: skills,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setIsLoading(false);
      toastMessage(
        'Profile information edited successfully',
        messageType.success
      );
      router.push('/user/profile');
    } catch (error) {
      setIsLoading(false);
      toastMessage(error.message, messageType.error);
    }
  };
  const onTagAddition = (
    e: React.KeyboardEvent,
    field: ControllerRenderProps<EditableUserDetails, 'skills'>
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
    if (skills && skills.length == MAX_NUMBER_OF_TAGS) {
      toastMessage(
        `total number of tags should be ${MAX_NUMBER_OF_TAGS}`,
        messageType.error
      );
      return;
    }
    const d = skills;
    field.onChange(d && d.length > 0 ? [...skills, value] : [value]);
    setSkillsInput('');
    e.preventDefault();
  };

  const removeTag: RemoveTagFc = (event, index) => {
    event.preventDefault();
    setValue(
      'skills',
      skills.filter((element: string, i: number) => i !== index)
    );
  };

  return (
    <div className="mx-auto w-full px-4 lg:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="form-container mx-auto flex w-full flex-col space-y-4 px-0"
      >
        <Typography
          as="h1"
          fontSize="3xl"
          fontWeight="semibold"
          className="mb-4"
        >
          Edit profile
        </Typography>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0 }}
          exit={{ opacity: 0 }}
        >
          {isEditShowed.title || !currentTitle ? (
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => {
                return (
                  <Input
                    {...field}
                    placeholder=""
                    error={fieldState.error}
                    label="Title"
                    hintMessage="e.g Senior software engineer"
                    required
                  />
                );
              }}
            />
          ) : (
            <div className="flex flex-col flex-wrap">
              <Typography as="p" fontSize="xl" className="space-y-2">
                Title:{' '}
              </Typography>
              <div className="flex flex-row items-center">
                <Typography as="p" fontSize="xl" className="px-1 text-gray-300">
                  {currentTitle}
                </Typography>
                <button
                  className="cursor-pointer px-1 py-1 text-xs tracking-wide text-gray-400 underline"
                  onClick={() => {
                    setIsEditShowed({
                      ...isEditShowed,
                      title: true,
                    });
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2, delay: 0 }}
          exit={{ opacity: 0 }}
        >
          {isEditShowed.description || !currentDescription ? (
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field, fieldState }) => {
                return (
                  <Textarea
                    {...field}
                    placeholder=""
                    error={fieldState.error}
                    rows={3}
                    value={field.value}
                    label="Description"
                    required
                  />
                );
              }}
            />
          ) : (
            <div className="flex flex-col flex-wrap">
              <Typography as="p" fontSize="xl" className="mb-2">
                Description:{' '}
              </Typography>
              <div className="flex flex-row items-center">
                <Typography
                  as="p"
                  fontSize="base"
                  className="px-1 text-gray-300 line-clamp-3"
                >
                  {currentDescription}
                </Typography>
                <button
                  className="cursor-pointer px-1 py-2 text-xs tracking-wide text-gray-400 underline"
                  onClick={() => {
                    setIsEditShowed({
                      ...isEditShowed,
                      description: true,
                    });
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </motion.div>
        <Controller
          name="skills"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2, delay: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <Input
                    {...field}
                    placeholder="Enter your project tags"
                    onChange={(e) => setSkillsInput(e.target.value)}
                    error={fieldState.error}
                    label="Add skills"
                    value={skillsInput}
                    onKeyDown={(e) => onTagAddition(e, field)}
                    required
                    hintMessage="Note: type a tag and press enter to add"
                  />
                </motion.div>
                {skills && skills.length > 0 && (
                  <>
                    <div className="flex items-center gap-2">
                      {skills && skills.length > 0 && (
                        <Tags
                          className="flex-wrap gap-2 uppercase"
                          tags={skills}
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
        <Button
          type="submit"
          isDisabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="flex flex-row justify-center gap-4 py-2"
        >
          Save
          {isLoading && (
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
      </form>
    </div>
  );
};
