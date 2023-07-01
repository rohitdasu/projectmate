import React, { Fragment } from 'react';
import { ShareModalProps } from './ShareModal.interface';
import { Transition, Dialog } from '@headlessui/react';
import { Typography } from '@/components/Typography';
import { IoClose } from 'react-icons/io5';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  closeModal,
  shareProjectData,
}) => {
  const { projectTitle, projectUrl } = shareProjectData;
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
                  <Dialog.Panel className="flex w-full max-w-md transform flex-col justify-center gap-4 overflow-hidden rounded-2xl border-[0.1px] bg-slate-900 px-6 pt-6 pb-12 text-left align-middle shadow-xl transition-all">
                    <div className="  flex flex-row place-content-between">
                      <Typography as="h1" fontSize="lg" align="left">
                        Share project
                      </Typography>
                      <button className="cursor-pointer" onClick={closeModal}>
                        <IoClose size={30} />
                      </button>
                    </div>
                    <div className="flex flex-row gap-4">
                      <EmailShareButton subject={projectTitle} url={projectUrl}>
                        <EmailIcon size={40} round />
                      </EmailShareButton>
                      <FacebookShareButton url={projectUrl}>
                        <FacebookIcon size={40} round />
                      </FacebookShareButton>
                      <TwitterShareButton url={projectUrl}>
                        <TwitterIcon size={40} round />
                      </TwitterShareButton>
                      <WhatsappShareButton url={projectUrl}>
                        <WhatsappIcon size={40} round />
                      </WhatsappShareButton>
                      <LinkedinShareButton
                        url={projectUrl}
                        title={projectTitle}
                        source="Projectmate.net"
                      >
                        <LinkedinIcon size={40} round />
                      </LinkedinShareButton>
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
