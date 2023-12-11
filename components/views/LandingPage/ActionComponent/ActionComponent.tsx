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
    <section
      style={{
        backgroundImage: "url('/checks.png')",
      }}
      className="mx-auto my-8 max-w-screen-xl overflow-hidden bg-cover bg-no-repeat py-8 dark:text-gray-300 md:my-16 md:py-12"
      id="action"
    >
      <div className="container mx-auto text-center">
        <h2 className="mb-4 text-2xl font-semibold md:text-3xl">
          Ready to get started?
        </h2>
        <p className="mb-8 text-sm font-light md:text-lg">
          Join our community and unleash the power of collaboration!
        </p>
        <Button size={'lg'} onClick={join} disabled={status === 'loading'}>
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
