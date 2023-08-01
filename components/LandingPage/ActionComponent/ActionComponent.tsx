import { useAppDispatch } from '@/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { useSession } from 'next-auth/react';
import { AuthModal } from '@/components';
import { useRouter } from 'next/router';

export const ActionComponent = () => {
  const { status } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const join = () => {
    if (status === 'unauthenticated') {
      dispatch(openModal());
    } else {
      router.replace('/projects');
    }
  };
  return (
    <section className="bg-green-900 py-16 px-4 md:py-24">
      <AuthModal title="Continue with your social account" />
      <div
        className="relative mx-auto flex max-w-screen-xl flex-col items-center gap-10 overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/checks.png')" }}
      >
        <p className="w-full text-center text-base leading-[1.25] text-green-50 md:w-3/4 lg:w-2/3 lg:text-3xl">
          Join the ranks of 150+ talented developers who have already signed up
        </p>
        <button
          onClick={join}
          disabled={status === 'loading'}
          className="rounded-md bg-green-50 py-2 px-4 text-sm font-medium text-green-900 hover:bg-green-200 md:text-base lg:py-3 lg:px-6"
        >
          {status === 'unauthenticated'
            ? 'Sign Up'
            : status === 'authenticated'
            ? 'Explore projects 🎉'
            : 'loading'}
        </button>
      </div>
    </section>
  );
};
