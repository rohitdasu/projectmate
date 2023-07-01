import React, { Fragment } from 'react';
import { ShareModalProps } from './ShareModal.interface';
import { Transition, Dialog } from '@headlessui/react';
import { Typography } from '@/components/Typography';
import { IoClose } from 'react-icons/io5';

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  closeModal,
  shareProjectData,
}) => {
  console.log(shareProjectData);
  return (
    <>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={closeModal}>
            <Transition.Child
              as={Fragment}
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
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="flex w-full max-w-md transform flex-col justify-center gap-8 overflow-hidden rounded-2xl border-[0.1px] bg-slate-900 px-6 pt-6 pb-12 text-left align-middle shadow-xl transition-all">
                    <div className="flex flex-row place-content-between">
                      <Typography as="h1" fontSize="lg" align="left">
                        Share project
                      </Typography>
                      <button className="cursor-pointer" onClick={closeModal}>
                        <IoClose size={30} />
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};
