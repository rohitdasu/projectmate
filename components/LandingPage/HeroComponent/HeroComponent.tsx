import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';

export const HeroComponent = () => {
  return (
    <section className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-16 px-4 lg:px-0">
      <div
        className="relative flex flex-col items-center gap-8 overflow-hidden bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/checks.png')",
          backgroundPosition: 'center',
        }}
      >
        <h1 className="mx-auto max-w-5xl text-center text-3xl font-semibold text-gray-900 md:text-5xl md:!leading-[1.25] lg:text-6xl">
          <span className="text-primary-color">Supercharge</span> your
          open-source contributions
        </h1>
        <p className="mx-auto max-w-3xl text-center text-base text-gray-900 md:text-lg lg:text-xl">
          Discover open-source projects, connect with experienced maintainers,
          and collaborate with a community of passionate contributors. Join over
          150 registered users who are already making a difference
        </p>
        <Link href="/projects" className="text-center">
          <Button size={'lg'}>Explore Projects</Button>
        </Link>
      </div>
      <ArrowDown className="animate-bounce" />
    </section>
  );
};
