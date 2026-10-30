import React from 'react';
import { ProjectsList } from '@/components/views/ProjectsPage/ProjectsList';
import { SharedLayout } from '@/components/Layouts';
import { useAppData } from '@/context/Common/CommonContext';
import { useSession } from 'next-auth/react';
import { useAuthModal } from '@/hooks/useAuthModal';
import { useAddProjectModal } from '@/hooks/useAddProjectModal';
import { ArrowRight } from 'lucide-react';

const Explore = () => {
  const commonData = useAppData();
  const { status } = useSession();
  const { openModal: openAuthModal } = useAuthModal();
  const { openModal: openAddProjectModal } = useAddProjectModal();

  const handleAddProject = () => {
    if (status === 'authenticated') {
      openAddProjectModal();
    } else {
      openAuthModal();
    }
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <SharedLayout title="Explore">
        <section className="flex flex-col gap-5 border-b-2 border-[#0f0f0f] py-8 sm:flex-row sm:items-end sm:justify-between md:py-12">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0044ff]">
              Explore open source
            </p>
            <h1 className="font-display text-4xl font-black uppercase tracking-tight md:text-5xl">
              Find your next codebase.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600 md:text-base">
              Search community-built projects by name or technology, discover
              something that interests you, and contribute directly.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddProject}
            className="inline-flex shrink-0 items-center justify-center gap-2 border-2 border-[#0f0f0f] bg-[#0044ff] px-5 py-3 font-display text-xs font-bold uppercase text-white shadow-[4px_4px_0_0_#0f0f0f] transition-all hover:translate-x-1 hover:translate-y-1 hover:bg-[#0f0f0f] hover:shadow-none"
          >
            Add your project <ArrowRight size={16} />
          </button>
        </section>
        <div className="pt-7">
          <ProjectsList key={commonData.randomKey} />
        </div>
      </SharedLayout>
    </div>
  );
};

export default Explore;
