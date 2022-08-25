import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';
function AuthModal({ isOpen, setIsOpen }: any) {
  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" tw="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div tw="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div tw="fixed inset-0 overflow-y-auto">
            <div tw="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel tw="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    tw="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    Continue with your social accounts.
                  </Dialog.Title>
                  <div tw="mx-4  flex h-[100px] justify-evenly  items-center ">
                    <button tw="items-center flex space-x-2 ">
                      <Image
                        src="/github.svg"
                        height={30}
                        width={30}
                        alt="github-logo"
                      />
                      <span>Github</span>
                    </button>

                    <button tw="items-center flex space-x-2">
                      <Image
                        src="/google.png"
                        alt="google-logo"
                        height={30}
                        width={30}
                      />
                      <span>Google</span>
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default AuthModal;
