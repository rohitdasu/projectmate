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
import { toastMessage, messageType } from '@/components/Toaster';
import { useShareModal } from '@/hooks/useShareModal';
import { Button } from '../ui/button';

export const ShareModal: FC = () => {
  const {
    state: { isOpen, data },
    closeModal,
  } = useShareModal();
  const { url, title } = data;
  const [, copy] = useCopyToClipboard();

  const copyToClipboard = (url: string) => {
    const isCopied = copy(url);
    if (!isCopied) {
      toastMessage('Copying error', messageType.error);
      return;
    }
    toastMessage('Copied to clipboard!', messageType.success);
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share project</DialogTitle>
          <DialogDescription>
            Share this project through social network or email
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-row flex-wrap justify-center gap-4 md:justify-start">
          <EmailShareButton subject={title} url={url}>
            <EmailIcon size={40} round />
          </EmailShareButton>
          <FacebookShareButton url={url}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={url}>
            <TwitterIcon size={40} round />
          </TwitterShareButton>
          <WhatsappShareButton url={url}>
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={url} title={title} source="Projectmate.net">
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
        </div>
        <DialogFooter>
          <div className="flex w-full flex-row justify-center gap-3 md:justify-start">
            <div className="flex-1 rounded-lg bg-gray-200 py-2 px-4 dark:bg-gray-800">
              <Typography
                as="span"
                className="block w-40 truncate md:w-64"
                fontSize="sm"
              >
                {url}
              </Typography>
            </div>
            <Button size={'sm'} onClick={() => copyToClipboard(url)}>
              Copy
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
