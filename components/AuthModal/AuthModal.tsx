import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { closeModal } from '../../store/slices/sliceModal';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, providerGithub, providerGoogle } from '../../lib/firebase';
import toast, { Toaster } from 'react-hot-toast';
import { IAuthData } from './Auth.interface';
import 'twin.macro';
import { setUserLoggedOut } from 'store/slices/sliceUser';

enum ProviderType {
  'GOOGLE',
  'GITHUB',
}

export const AuthModal = ({ title }: IAuthData) => {
  const mode = useAppSelector((state) => state.mode.mode);
  const isOpen = useAppSelector((state) => state.modal.modal);
  const dispatch = useAppDispatch();

  const createUser = async (
    email: string | null,
    firebaseUID: string | null,
    token: string
  ): Promise<boolean> => {
    const body = {
      email,
      firebaseUID,
    };
    const res = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      return true;
    }
    await signOut(auth);
    dispatch(setUserLoggedOut());
    throw Error('Something went wrong! Please try again.');
  };

  const handleSignin = async (loginWith: ProviderType) => {
    try {
      dispatch(closeModal());
      const data = await signInWithPopup(
        auth,
        loginWith === ProviderType.GOOGLE ? providerGoogle : providerGithub
      );

      const token = await data.user.getIdToken();
      await createUser(data.user.email, data.user.uid, token);
      mode
        ? toast.success('Login Successful', {
            position: 'bottom-center',
            duration: 2000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          })
        : toast.success('Login Successful', { position: 'bottom-center' });
    } catch (error) {
      mode
        ? toast.error(error.message, {
            position: 'bottom-center',
            duration: 2000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          })
        : toast.error(error.message, { position: 'bottom-center' });
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          tw="relative z-[999]"
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
                <Dialog.Panel className="w-full bg-background-1 max-w-md transform overflow-hidden rounded-2xl text-left align-middle shadow-xl transition-all border border-color-border-1 flex flex-col items-center justify-center gap-8 px-6 pt-6 pb-12">
                  <span
                    className={`text-2xl flex w-full justify-center items-center  md:space-x-2 font-bold font-mono text-gray-900 uppercase text-foreground-1`}
                  >
                    <p>
                      project<span className="text-primary-color">mate</span>
                    </p>
                  </span>
                  <Dialog.Title
                    as="h2"
                    className="text-base lg:text-lg text-center font-normal leading-6 text-gray-900 text-foreground-1"
                  >
                    {title}
                  </Dialog.Title>
                  <div tw="w-full px-0 md:px-12 flex justify-center space-y-6 flex-col items-center">
                    <button
                      className="flex items-center justify-between w-full border py-2 px-3 rounded-lg border-color-1 focus:ring"
                      onClick={() => handleSignin(ProviderType.GITHUB)}
                    >
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="fill-filler-1"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 0C5.37 0 0 5.37 0 12C0 17.31 3.435 21.795 8.205 23.385C8.805 23.49 9.03 23.13 9.03 22.815C9.03 22.53 9.015 21.585 9.015 20.58C6 21.135 5.22 19.845 4.98 19.17C4.845 18.825 4.26 17.76 3.75 17.475C3.33 17.25 2.73 16.695 3.735 16.68C4.68 16.665 5.355 17.55 5.58 17.91C6.66 19.725 8.385 19.215 9.075 18.9C9.18 18.12 9.495 17.595 9.84 17.295C7.17 16.995 4.38 15.96 4.38 11.37C4.38 10.065 4.845 8.985 5.61 8.145C5.49 7.845 5.07 6.615 5.73 4.965C5.73 4.965 6.735 4.65 9.03 6.195C9.99 5.925 11.01 5.79 12.03 5.79C13.05 5.79 14.07 5.925 15.03 6.195C17.325 4.635 18.33 4.965 18.33 4.965C18.99 6.615 18.57 7.845 18.45 8.145C19.215 8.985 19.68 10.05 19.68 11.37C19.68 15.975 16.875 16.995 14.205 17.295C14.64 17.67 15.015 18.39 15.015 19.515C15.015 21.12 15 22.41 15 22.815C15 23.13 15.225 23.505 15.825 23.385C18.2072 22.5807 20.2772 21.0497 21.7437 19.0074C23.2101 16.965 23.9993 14.5143 24 12C24 5.37 18.63 0 12 0Z"
                        />
                      </svg>
                      <span className="text-base font-light lg:text-lg text-foreground-1">
                        Continue with Github
                      </span>
                      <span></span>
                    </button>

                    <button
                      className="items-center justify-between flex w-full border py-2 px-3 rounded-lg border-color-1 focus:ring"
                      onClick={() => handleSignin(ProviderType.GOOGLE)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        width="30"
                        height="30"
                      >
                        <path
                          fill="#FFC107"
                          d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                        <path
                          fill="#FF3D00"
                          d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                        />
                        <path
                          fill="#4CAF50"
                          d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                        />
                        <path
                          fill="#1976D2"
                          d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                        />
                      </svg>
                      <span className="text-base font-light lg:text-lg text-foreground-1">
                        Continue with Google
                      </span>
                      <span></span>
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
