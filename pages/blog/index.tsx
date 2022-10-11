import type { NextPage } from 'next';
import { SharedLayout } from '@/components/Layouts/SharedLayout';
import { AiOutlineFormatPainter } from 'react-icons/ai';

const Blog: NextPage = () => {
  return (
    <SharedLayout title="Blog">
      <div className="flex-center mt-[5rem] flex flex-col items-center justify-center gap-5">
        <AiOutlineFormatPainter className="text-[10rem]" />
        <h1 className="text-3xl font-bold">Coming Soon ...</h1>
      </div>
    </SharedLayout>
  );
};

export default Blog;
