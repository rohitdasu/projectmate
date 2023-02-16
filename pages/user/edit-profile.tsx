import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
} from 'react-hook-form';
import { SharedLayout } from '@/components/Layouts';
import { NextPage } from 'next';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import Lottie from 'lottie-react';
import Loader from 'public/animations/loading.json';
import { motion } from 'framer-motion';
import { Typography } from '@/components/Typography';
import { Input } from '@/components/Form';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/Form/Textarea';
import { toastMessage, messageType } from 'shared';
import { Tags, RemoveTagFc } from '@/components/Tags';
import { EditableUserDetails } from '@/components/UserBio';

export type EditProfileProps = {
  currentTitle: string;
  currentDescription: string;
  currentSkills: string[];
};

const EditProfile: NextPage<EditProfileProps> = ({
  currentTitle,
  currentDescription,
  currentSkills,
}) => {
  const { handleSubmit, setValue, watch, control } =
    useForm<EditableUserDetails>({
      defaultValues: {
        title: currentTitle,
        description: currentDescription,
        skills: currentSkills,
      },
    });

  const skills = watch('skills');
  const [isEditShowed, setIsEditShowed] = useState({
    title: false,
    description: false,
  });

  const [skillsInput, setSkillsInput] = useState<string>('');

  const { status } = useSession({
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

  const onSubmit: SubmitHandler<EditableUserDetails> = (data) => {
    console.log(data);
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
    if (skills && skills.length == 4) {
      toastMessage('total number of tags should be 4', messageType.error);
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
    <SharedLayout title="Submit Project" hasContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        exit={{ opacity: 0 }}
        className="m-auto mb-12 flex flex-col space-y-4 rounded-lg pt-4 md:max-w-xl md:p-6"
      >
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
              {isEditShowed.title ? (
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
                    <Typography
                      as="p"
                      fontSize="xl"
                      className="px-1 text-gray-300"
                    >
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
              {isEditShowed.description ? (
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
      </motion.div>
    </SharedLayout>
  );
};

export default EditProfile;

// Temporary mocking requesting data from api
export async function getServerSideProps() {
  const temporaryUserDetails = {
    title: 'Senior software engineer',
    description:
      'A Software Engineer is an IT professional who designs, develops and maintains computer software at a company.',
    skills: ['Web Development', 'Backend', 'Spring'],
    numberOfProjects: 0,
  };

  return {
    props: {
      currentTitle: temporaryUserDetails.title,
      currentDescription: temporaryUserDetails.description,
      currentSkills: temporaryUserDetails.skills,
    },
  };
}
