import {
  useForm,
  SubmitHandler,
  Controller,
  ControllerRenderProps,
} from 'react-hook-form';
import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EditProfileModalProps } from './UserBio.interface';
import { Typography } from '@/components/Typography';
import { Input } from '../Form';
import { EditableUserDetails } from './UserBio.interface';
import { Button } from '@/components/Button';
import { Textarea } from '@/components/Form/Textarea';
import { toastMessage, messageType } from 'shared';
import { Tags, RemoveTagFc } from '@/components/Tags';

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  closeModal,
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
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-3 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center justify-center overflow-hidden rounded-2xl border-[0.1px] bg-slate-900 px-10 pt-6 pb-12 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h2"
                  className="pb-5 text-center text-2xl font-normal leading-6 text-gray-100"
                >
                  Edit profile
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-container flex w-full flex-col space-y-6 px-0"
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
                      <Typography as="p" fontSize="xl">
                        Title:{' '}
                      </Typography>
                      <div className="flex flex-row items-center">
                        <Typography
                          as="p"
                          fontSize="base"
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
                      <Typography as="p" fontSize="xl">
                        Description:{' '}
                      </Typography>
                      <div className="flex flex-row items-center">
                        <Typography
                          as="p"
                          fontSize="base"
                          className="px-1 text-gray-300 line-clamp-2"
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
