import { FC } from 'react';
import { Typography } from '@/components/Common/Typography';
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useCopyToClipboard } from 'usehooks-ts';
import { useShareModal } from '@/hooks/useShareModal';
import { Button } from '../../ui/button';
import { useToast } from '../../ui/use-toast';
import { BUTTON_TEXT } from '@/components/Common/Constants/textLabels';

export const ShareModal: FC = () => {
  const {
    state: { isOpen, data },
    closeModal,
  } = useShareModal();
  const { toast } = useToast();
  const { url, title } = data;
  const [, copy] = useCopyToClipboard();

  const copyToClipboard = (url: string) => {
    const isCopied = copy(url);
    if (!isCopied) {
      toast({
        title: 'Copying error',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Copied to clipboard',
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="max-w-[460px] rounded-none border-2 border-[#0f0f0f] bg-[#f8f9fa] p-6 shadow-[7px_7px_0_0_#0044ff] sm:!rounded-none">
        <DialogHeader>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0044ff]">
            Spread the word
          </p>
          <DialogTitle className="font-display text-2xl font-black uppercase">
            Share project
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Share this project with your network or copy its repository link.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row flex-wrap justify-center gap-4 md:justify-start">
          <EmailShareButton subject={title} url={url}>
            <EmailIcon size={40} round={false} />
          </EmailShareButton>
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round={false} />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={40} round={false} />
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={40} round={false} />
          </WhatsappShareButton>
          <LinkedinShareButton url={url} title={title} source="Projectmate.net">
            <LinkedinIcon size={40} round={false} />
          </LinkedinShareButton>
        </div>
        <DialogFooter>
          <div className="flex w-full flex-row justify-center gap-3 md:justify-start">
            <div className="flex-1 border-2 border-[#0f0f0f] bg-white px-4 py-2">
              <Typography
                as="span"
                className="block w-40 truncate md:w-64"
                fontSize="sm"
              >
                {url}
              </Typography>
            </div>
            <Button
              size={'sm'}
              onClick={() => copyToClipboard(url)}
              className="rounded-none border-2 border-[#0f0f0f] bg-[#0044ff] font-display text-xs font-bold uppercase text-white shadow-[3px_3px_0_0_#0f0f0f] hover:bg-[#0f0f0f]"
            >
              {BUTTON_TEXT.copy}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
