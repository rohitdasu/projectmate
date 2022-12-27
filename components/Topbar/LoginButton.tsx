import { useSession } from 'next-auth/react';
import { useAppDispatch } from '../../app/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { Button } from '@/components/Button';

export const LoginButton = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleModal = () => dispatch(openModal());

  return (
    <div className="hidden md:block">
      {session === null && (
        <Button onClick={handleModal} isDisabled={false} className="py-3 px-6">
          <span className="flex items-center justify-center gap-3">Login</span>
        </Button>
      )}
    </div>
  );
};
