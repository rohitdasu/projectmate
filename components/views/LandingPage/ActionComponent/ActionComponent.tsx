import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAuthModal } from '@/hooks/useAuthModal';
import { Button } from '@/components/ui/button';
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

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
      className="mx-auto max-w-screen-xl overflow-hidden bg-cover bg-no-repeat py-8 md:py-12 dark:text-gray-300"
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
            ? BUTTON_TEXT.singUp
            : status === 'authenticated'
            ? BUTTON_TEXT.exploreProjects
            : 'loading'}
        </Button>
      </div>
    </section>
  );
};
