import React from 'react';
import { useAppDispatch } from '@/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { useSession } from 'next-auth/react';
import { AuthModal } from '@/components';
import { useRouter } from 'next/router';

export const ActionComponent = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleModal = () => dispatch(openModal());
  const join = () => {
    if (session === null) {
      handleModal();
    } else {
      router.replace('/projects');
    }
  };
  return (
    <section className="bg-green-900 py-16 px-4 md:py-24">
      <AuthModal title="Continue with your social account" />
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-10">
        <p className="w-full text-center text-base leading-[1.25] text-green-50 md:w-3/4 lg:w-2/3 lg:text-3xl">
          Join the ranks of 150+ talented developers who have already signed up
          for projectmate.net
        </p>
        <button
          onClick={join}
          className="rounded-md bg-green-50 py-2 px-4 text-sm font-medium text-green-900 hover:bg-green-200 md:text-base lg:py-3 lg:px-6"
        >
          {session === null ? 'Sign Up' : 'Explore projects 🎉'}
        </button>
      </div>
    </section>
  );
};
