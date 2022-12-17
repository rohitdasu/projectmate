import { useSession } from 'next-auth/react';
import { useAppDispatch } from '../../app/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { Button } from '@/components/Button';

export const LoginButton = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleModal = () => dispatch(openModal());

  return (
    <div className="flex hidden w-full flex-col items-center justify-between gap-4 md:block md:w-auto md:flex-row lg:block">
      {session === null && (
        <Button
          onClick={handleModal}
          isDisabled={false}
          className="text-md w-full py-3 px-6 font-semibold md:w-auto md:text-lg"
        >
          <span className="flex items-center justify-center gap-3">Login</span>
        </Button>
      )}
    </div>
  );
};
