import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { closeModal } from '../../store/slices/modalSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, Provider_github, Provider_google } from '../../lib/firebase';
import Router, { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';

export const AuthModal = () => {
  const mode = useAppSelector((state) => state.mode.mode);
  const isOpen = useAppSelector((state) => state.modal.modal);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleGoogleSignin = () => {
    signInWithPopup(auth, Provider_google)
      .then(() => {
        mode
          ? toast.success('Login Successful', {
              duration: 2000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
          : toast.success('Login Successful');
      })
      .catch((error) =>
        mode
          ? toast.error(error.code, {
              duration: 2000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
          : toast.error(error.code)
      );

    dispatch(closeModal());
  };
  const handleGithubSignin = () => {
    signInWithPopup(auth, Provider_github)
      .then(() => {
        mode
          ? toast.success('Login Successful', {
              duration: 2000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
          : toast.success('Login Successful');
      })
      .catch((error) =>
        mode
          ? toast.error(error.code, {
              duration: 2000,
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            })
          : toast.error(error.code)
      );
    dispatch(closeModal());
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          tw="relative z-10"
          onClose={() => dispatch(closeModal())}
        >
          <Toaster />
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
                <Dialog.Panel
                  className={`w-full ${
                    mode ? '!bg-dark-mode' : '!bg-white'
                  }  max-w-md transform overflow-hidden rounded-2xl  p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <Dialog.Title
                    as="h3"
                    className={`text-lg text-center font-medium leading-6 text-gray-900 ${
                      mode ? '!text-white' : '!text-gray-700'
                    }`}
                  >
                    Continue with your social accounts.
                  </Dialog.Title>
                  <div tw="mx-4  flex h-[100px] justify-evenly  items-center ">
                    <button
                      tw="items-center flex space-x-2 "
                      onClick={handleGithubSignin}
                    >
                      {mode ? (
                        <Image
                          src="/dark-github.svg"
                          height={30}
                          width={30}
                          alt="github-logo"
                        />
                      ) : (
                        <Image
                          src="/github.svg"
                          height={30}
                          width={30}
                          alt="github-logo"
                        />
                      )}
                      <span
                        className={`${mode ? 'text-white' : 'text-gray-700'}`}
                      >
                        Github
                      </span>
                    </button>

                    <button
                      tw="items-center flex space-x-2"
                      onClick={handleGoogleSignin}
                    >
                      <Image
                        src="/google.png"
                        alt="google-logo"
                        height={30}
                        width={30}
                      />
                      <span
                        className={`${mode ? 'text-white' : 'text-gray-700'}`}
                      >
                        Google
                      </span>
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
};
