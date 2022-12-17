import { useSession } from 'next-auth/react';
import { useAppDispatch } from '../../app/hooks';
import { openModal } from '@/store/slices/sliceModal';
import { GiClick } from 'react-icons/gi';
import { Button } from '@/components/Button';
import { motion } from 'framer-motion';

export const LoginButton = () => {
  const dispatch = useAppDispatch();
  const { data: session } = useSession();

  const handleModal = () => dispatch(openModal());

  return (
    <div className="flex w-full flex-col items-center justify-between gap-4 md:w-auto md:flex-row">
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
