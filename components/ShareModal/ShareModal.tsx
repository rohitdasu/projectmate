import { Fragment, FC } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { Typography } from '@/components/Common/Typography';
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
import { useCopyToClipboard } from 'usehooks-ts';
import { toastMessage, messageType } from '@/components/Toaster';
import { useShareModal } from '@/hooks/useShareModal';

export const ShareModal: FC = () => {
  const {
    state: { isOpen, data },
    closeModal,
  } = useShareModal();
  const { url, title } = data;
  const [, copy] = useCopyToClipboard();

  const copyToClipboard = (url: string) => {
    const isCopied = copy(url);
    if (!isCopied) {
      toastMessage('Copying error', messageType.error);
      return;
    }
    toastMessage('Copied to clipboard!', messageType.success);
  };

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
                  <Dialog.Panel className="flex w-full max-w-md transform flex-col justify-center gap-7  overflow-hidden rounded-2xl border-[0.1px] bg-slate-900 px-6 pt-6 pb-12 text-left align-middle shadow-xl transition-all">
                    <div className="  flex flex-row place-content-between">
                      <Typography
                        as="h1"
                        fontSize="lg"
                        align="left"
                        fontWeight="semibold"
                      >
                        Share project
                      </Typography>
                      <button className="cursor-pointer" onClick={closeModal}>
                        <IoClose size={30} />
                      </button>
                    </div>
                    <div className="flex flex-row flex-wrap gap-4">
                      <EmailShareButton subject={title} url={url}>
                        <EmailIcon size={40} round />
                      </EmailShareButton>
                      <FacebookShareButton url={url}>
                        <FacebookIcon size={40} round />
                      </FacebookShareButton>
                      {/* <FontAwesomeIcon icon="fa-brands fa-x-twitter" /> */}
                      <TwitterShareButton url={url}>
                        <TwitterIcon size={40} round />
                      </TwitterShareButton>
                      <WhatsappShareButton url={url}>
                        <WhatsappIcon size={40} round />
                      </WhatsappShareButton>
                      <LinkedinShareButton
                        url={url}
                        title={title}
                        source="Projectmate.net"
                      >
                        <LinkedinIcon size={40} round />
                      </LinkedinShareButton>
                    </div>
                    <div className="flex flex-row gap-3">
                      <div className="w-1/2 rounded-lg bg-gray-700 py-2 px-4">
                        <Typography
                          as="span"
                          className="block truncate"
                          fontSize="sm"
                        >
                          {url}
                        </Typography>
                      </div>
                      <button
                        onClick={() => copyToClipboard(url)}
                        className="rounded-lg bg-primary-color px-3"
                      >
                        Copy
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
