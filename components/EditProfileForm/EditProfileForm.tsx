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
  const { handleSubmit, setValue, reset, watch, control } =
    useForm<EditableUserDetails>({
      defaultValues: {
        title: currentTitle || '',
        description: currentDescription || '',
        skills: currentSkills || [],
      },
      resolver: zodResolver(schema),
    });

  const skills = watch('skills');

  const MAX_NUMBER_OF_TAGS = 4;
  const USER_DETAILS_URL = '/api/user/details';

  const resetFormData = () => {
    reset();
  };

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
          isDisabled={false}
          onClick={handleSubmit(onSubmit)}
          className="py-2"
        >
          Save
        </Button>
      </form>
    </div>
  );
};
