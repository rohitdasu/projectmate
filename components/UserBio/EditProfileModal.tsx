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

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  closeModal,
  currentTitle,
  currentDescription,
  currentSkills,
}) => {
  console.log(currentTitle);

  const { handleSubmit, setValue, reset, control } =
    useForm<EditableUserDetails>({
      defaultValues: {
        title: currentTitle,
        description: currentDescription,
        skills: currentSkills,
      },
    });
  const [isEditShowed, setIsEditShowed] = useState({
    title: false,
    description: false,
  });

  const onSubmit: SubmitHandler<EditableUserDetails> = (data) => {
    console.log(data);
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
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                          <Input
                            {...field}
                            placeholder=""
                            error={fieldState.error}
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
                          className="px-1 text-gray-300"
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
