import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAuthModal } from '@/hooks/useAuthModal';
import { Button } from '@/components/ui/button';

export const ActionComponent = () => {
  const { status } = useSession();
  const router = useRouter();

  const { openModal } = useAuthModal();

  const join = () => {
    if (status === 'unauthenticated') {
      openModal();
    } else {
      router.replace('/projects');
    }
  };
  return (
    <section className="bg-gray-800 py-16 px-4 dark:bg-black md:px-8 md:py-24 xl:px-0">
      <div
        className="relative mx-auto flex max-w-screen-xl flex-col items-center gap-10 overflow-hidden bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/checks.png')",
          backgroundPosition: 'center',
        }}
      >
        <p className="w-full text-center text-base leading-[1.25] text-gray-50 dark:text-gray-300 md:w-3/4 lg:w-2/3 lg:text-3xl">
          Join the ranks of 200+ talented developers who have already signed up
        </p>
        <Button
          size={'lg'}
          variant={'secondary'}
          onClick={join}
          disabled={status === 'loading'}
        >
          {status === 'unauthenticated'
            ? 'Sign Up'
            : status === 'authenticated'
            ? 'Explore projects'
            : 'loading'}
        </Button>
      </div>
    </section>
  );
};
