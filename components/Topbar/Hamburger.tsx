import { FiMenu } from 'react-icons/fi';

export const Hamburger = () => {
  return (
    <button className="md:hidden flex p-[0.67rem] overflow-hidden text-[1.6rem] shadow-border-shadow rounded-md">
      <FiMenu />
    </button>
  );
};
