import React from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { EditProfileModalProps } from './UserBio.interface';
import { Typography } from '@/components/Typography';

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  closeModal,
}) => {
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
              <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center justify-center gap-8 overflow-hidden rounded-2xl border-[0.1px] bg-slate-900 px-6 pt-6 pb-12 text-left align-middle shadow-xl transition-all">
                <span
                  className={`flex w-full items-center justify-center font-mono  text-2xl font-bold uppercase md:space-x-2`}
                >
                  <Typography as="p" fontSize="2xl" fontWeight="bold">
                    <span className="text-white">project</span>
                    <span className="text-primary-color">mate</span>
                  </Typography>
                </span>
                <Dialog.Title
                  as="h2"
                  className="text-center text-base font-normal leading-6 text-gray-100 lg:text-lg"
                ></Dialog.Title>
                <div className="flex w-full flex-col items-center justify-center space-y-6 px-0 md:px-12">
                  {' '}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
