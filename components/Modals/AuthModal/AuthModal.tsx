import { useEffect, useRef, FC } from 'react';
import { AuthModalProps } from './Auth.interface';
import { useRouter } from 'next/router';
import { useAuthModal } from '@/hooks/useAuthModal';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../../ui/button';

export const AuthModal: FC<AuthModalProps> = ({ title }) => {
  const { asPath } = useRouter();

  const {
    state: { isOpen },
    closeModal,
  } = useAuthModal();

  const usePreviousRoute = () => {
    const ref = useRef<string | null>(null);

    useEffect(() => {
      ref.current = asPath;
    }, []);

    return ref.current;
  };

  const prevRoute = usePreviousRoute();

  useEffect(() => {
    if (prevRoute !== asPath && isOpen) {
      closeModal();
    }
  }, [asPath, isOpen, closeModal, prevRoute]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex justify-center text-xl">
              projectmate
            </DialogTitle>
            <DialogDescription className="flex justify-center">
              {title}
            </DialogDescription>
          </DialogHeader>
          <section className="flex flex-col items-center gap-4">
            <Button
              variant={'outline'}
              size={'lg'}
              onClick={() => {
                popupCenter('/auth/github', 'Sign In With Github');
                closeModal();
              }}
            >
              <FaGithub className="mr-2" size={32} />
              <span>Continue with Github</span>
            </Button>
            <Button
              variant={'outline'}
              size={'lg'}
              onClick={() => {
                popupCenter('/auth/google', 'Sign In With Google');
                closeModal();
              }}
            >
              <FcGoogle className="mr-2" size={32} />
              <span>Continue with Google</span>
            </Button>
          </section>
        </DialogContent>
      </Dialog>
    </>
  );
};

const popupCenter = (url: string, title: string) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX;
  const dualScreenTop = window.screenTop ?? window.screenY;

  const width =
    window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  const height =
    window.innerHeight ??
    document.documentElement.clientHeight ??
    screen.height;

  const systemZoom = width / window.screen.availWidth;

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  const newWindow = window.open(
    url,
    title,
    `width=${500 / systemZoom},height=${
      550 / systemZoom
    },top=${top},left=${left}`
  );

  newWindow?.focus();
};
