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
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

export const AuthModal = () => {
  const {
    state: { isOpen },
    closeModal,
  } = useAuthModal();

  return (
    <>
      <Dialog open={isOpen} onOpenChange={closeModal}>
        <DialogContent className="max-w-[425px] rounded-none border-2 border-[#0f0f0f] bg-[#f8f9fa] p-7 shadow-[8px_8px_0_0_#0044ff] sm:!rounded-none">
          <DialogHeader className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0044ff]">
              Open source starts here
            </p>
            <DialogTitle className="flex justify-center font-display text-2xl font-black uppercase tracking-tight">
              PROJECT_MATE
            </DialogTitle>
            <DialogDescription className="flex justify-center text-gray-600">
              Sign in to share projects and connect with makers.
            </DialogDescription>
          </DialogHeader>
          <section className="flex flex-col items-center gap-4">
            <Button
              variant={'outline'}
              size={'lg'}
              className="h-12 w-full justify-start rounded-none border-2 border-[#0f0f0f] bg-white font-display text-xs font-bold uppercase shadow-[3px_3px_0_0_#0f0f0f] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-[#eaf0ff] hover:shadow-none"
              onClick={() => {
                popupCenter('/auth/github', 'Sign In With Github');
                closeModal();
              }}
            >
              <FaGithub className="mr-2" size={32} />
              <span>{BUTTON_TEXT.continueWithGitHub}</span>
            </Button>
            <Button
              variant={'outline'}
              size={'lg'}
              className="h-12 w-full justify-start rounded-none border-2 border-[#0f0f0f] bg-white font-display text-xs font-bold uppercase shadow-[3px_3px_0_0_#0f0f0f] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-[#eaf0ff] hover:shadow-none"
              onClick={() => {
                popupCenter('/auth/google', 'Sign In With Google');
                closeModal();
              }}
            >
              <FcGoogle className="mr-2" size={32} />
              <span>{BUTTON_TEXT.continueWithGoogle}</span>
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
