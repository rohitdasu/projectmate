import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AccountMenu } from '@/components/Common/AccountMenu';
import { maintainers } from '@/data';
import { SiBuymeacoffee } from 'react-icons/si';

interface DiscoveryHomeProps {
  projectCount: number | null;
  userCount: number | null;
  randomUsers: Array<{
    id: string;
    name: string | null;
    image: string | null;
  }> | null;
}

const formatCount = (value: number | null) =>
  value === null
    ? 'A growing community'
    : `${new Intl.NumberFormat().format(value)}+`;

export const DiscoveryHome = ({
  projectCount,
  userCount,
  randomUsers,
}: DiscoveryHomeProps) => {
  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#0f0f0f] selection:bg-[#0044ff] selection:text-white">
      <header className="sticky top-0 z-40 border-b-2 border-[#0f0f0f] bg-[#f8f9fa]/95 px-5 backdrop-blur md:px-8">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between py-4"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-black tracking-tight md:text-2xl"
          >
            <span
              className="h-3.5 w-3.5 rounded-full bg-[#0044ff]"
              aria-hidden="true"
            />
            PROJECT_MATE
          </Link>
          <div className="hidden items-center gap-8 font-display text-sm font-bold uppercase tracking-wide md:flex">
            <Link
              className="transition-colors hover:text-[#0044ff]"
              href="/explore"
            >
              Explore
            </Link>
            <Link
              className="transition-colors hover:text-[#0044ff]"
              href="/community"
            >
              Community
            </Link>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              className="flex h-10 items-center gap-1 border-2 border-[#0f0f0f] bg-white px-2 font-display text-[10px] font-bold uppercase md:hidden"
              href="/explore"
              aria-label="Explore projects"
            >
              Explore
            </Link>
            <Link
              className="flex h-10 items-center gap-1 border-2 border-[#0f0f0f] bg-white px-2 font-display text-[10px] font-bold uppercase md:hidden"
              href="/community"
              aria-label="Visit the community"
            >
              <Users size={15} />
              Mates
            </Link>
            <AccountMenu />
          </div>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-24 text-center md:px-8 md:pb-28 md:pt-36">
          <div className="pointer-events-none absolute -right-20 top-16 h-64 w-64 rounded-full border-2 border-[#0f0f0f] opacity-[0.08] md:right-[12%]" />
          <div className="pointer-events-none absolute bottom-12 left-[10%] h-24 w-24 rotate-45 bg-[#0044ff] opacity-[0.08]" />
          <div className="relative mx-auto max-w-5xl">
            <p className="mb-8 inline-flex rounded-full border-2 border-[#0f0f0f] bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] shadow-[4px_4px_0_0_#0f0f0f] md:text-xs">
              Open source, demystified.
            </p>
            <h1 className="font-display text-5xl font-black leading-[0.92] tracking-[-0.07em] sm:text-6xl md:text-8xl">
              FIND YOUR NEXT
              <br />
              <span className="text-[#0044ff] underline decoration-[#0f0f0f] decoration-[5px] underline-offset-[8px] md:decoration-[8px] md:underline-offset-[12px]">
                CODEBASE.
              </span>
            </h1>
            <p className="mx-auto mb-10 mt-8 max-w-2xl text-lg font-medium leading-relaxed text-gray-700 md:mb-12 md:mt-10 md:text-2xl">
              Discover open-source projects, find a good first issue, and build
              something meaningful with the community.
            </p>
            <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
              <Link
                href="/explore"
                className="w-full border-2 border-[#0f0f0f] bg-[#0044ff] px-7 py-4 font-display text-base font-bold uppercase text-white shadow-[4px_4px_0_0_#0f0f0f] transition-all hover:bg-[#0f0f0f] hover:shadow-[8px_8px_0_0_#0f0f0f] sm:w-auto md:text-lg"
              >
                Explore projects{' '}
                <ArrowRight className="ml-2 inline" size={18} />
              </Link>
              <Link
                href="/community"
                className="w-full border-2 border-[#0f0f0f] bg-white px-7 py-4 font-display text-base font-bold uppercase shadow-[4px_4px_0_0_#0f0f0f] transition-all hover:shadow-[8px_8px_0_0_#0f0f0f] sm:w-auto md:text-lg"
              >
                Meet the community
              </Link>
            </div>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ul
                className="flex items-center -space-x-3"
                aria-label="Registered community members"
              >
                {randomUsers?.map((user) => (
                  <li key={user.id}>
                    <Avatar className="h-9 w-9 border-2 border-white ring-2 ring-[#0f0f0f] md:h-10 md:w-10">
                      <AvatarImage src={user.image || undefined} alt="" />
                      <AvatarFallback className="bg-[#eaf0ff] font-display text-xs font-bold text-[#0044ff]">
                        {user.name?.[0] ?? '?'}
                      </AvatarFallback>
                    </Avatar>
                  </li>
                ))}
              </ul>
              <div className="text-center sm:text-left">
                <p className="font-display text-sm font-black uppercase">
                  {userCount === null
                    ? 'A growing community'
                    : `${new Intl.NumberFormat().format(
                        userCount
                      )}+ registered users`}
                </p>
                <p className="text-xs font-medium text-gray-500">
                  No experience required. Just curiosity and a pull request.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="community-stats"
          className="overflow-hidden border-y-2 border-[#0f0f0f] bg-white py-6"
          aria-label="Projectmate community stats"
        >
          <div className="flex min-w-max animate-[projectmate-marquee_28s_linear_infinite] items-center gap-10 px-6 font-display text-lg font-bold uppercase tracking-wide md:gap-16 md:text-2xl">
            <span>🚀 {formatCount(userCount)} open-source builders</span>
            <span className="text-[#0044ff]">•</span>
            <span>🌍 {formatCount(projectCount)} projects to explore</span>
            <span className="text-[#0044ff]">•</span>
            <span>✨ Find your next contribution</span>
            <span className="text-[#0044ff]">•</span>
            <span>🚀 {formatCount(userCount)} open-source builders</span>
            <span className="text-[#0044ff]">•</span>
            <span>🌍 {formatCount(projectCount)} projects to explore</span>
            <span className="text-[#0044ff]">•</span>
            <span>✨ Find your next contribution</span>
          </div>
        </section>

        <section id="how-it-works" className="px-5 py-20 md:px-8 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 border-b-2 border-[#0f0f0f] pb-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0044ff]">
                Your next contribution starts here
              </p>
              <h2 className="font-display text-3xl font-black uppercase tracking-tight md:text-5xl">
                Find your people. Build in public.
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Link
                href="/explore"
                className="group border-2 border-[#0f0f0f] bg-white p-7 shadow-[5px_5px_0_0_#0f0f0f] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0044ff] md:p-9"
              >
                <p className="mb-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-[#0044ff]">
                  01 / Explore
                </p>
                <h3 className="font-display text-2xl font-black uppercase md:text-3xl">
                  Find a codebase worth contributing to.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Search community projects by name and technology, then jump
                  straight into the repository.
                </p>
                <p className="mt-7 inline-flex items-center gap-2 font-display text-xs font-bold uppercase group-hover:text-[#0044ff]">
                  Browse projects <ArrowRight size={16} />
                </p>
              </Link>
              <Link
                href="/community"
                className="group border-2 border-[#0f0f0f] bg-[#eaf0ff] p-7 shadow-[5px_5px_0_0_#0f0f0f] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#0044ff] md:p-9"
              >
                <p className="mb-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-[#0044ff]">
                  02 / Community
                </p>
                <h3 className="font-display text-2xl font-black uppercase md:text-3xl">
                  Meet the makers behind the work.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  Discover contributors and maintainers building open source
                  together.
                </p>
                <p className="mt-7 inline-flex items-center gap-2 font-display text-xs font-bold uppercase group-hover:text-[#0044ff]">
                  Meet the community <ArrowRight size={16} />
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t-2 border-[#0f0f0f] bg-white px-5 py-9 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-lg font-black tracking-tight"
          >
            <span
              className="h-3 w-3 rounded-full bg-[#0044ff]"
              aria-hidden="true"
            />{' '}
            PROJECT_MATE
          </Link>
          <div className="flex flex-col items-center gap-2 sm:items-start">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
              Developed by
            </p>
            <div className="flex items-center gap-2">
              <ul
                className="flex items-center -space-x-2"
                aria-label="Project maintainers"
              >
                {maintainers.map((maintainer) => (
                  <li key={maintainer.github}>
                    <Link
                      href={`${maintainer.github}/?ref=projectmate.net`}
                      target="_blank"
                      aria-label={`View ${maintainer.name} on GitHub`}
                    >
                      <Avatar className="h-8 w-8 border-2 border-white ring-1 ring-[#0f0f0f]">
                        <AvatarImage src={maintainer.avatar} alt="" />
                        <AvatarFallback className="bg-[#eaf0ff] text-xs font-bold text-[#0044ff]">
                          {maintainer.name[0]}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </li>
                ))}
              </ul>
              <span className="text-xs font-semibold text-gray-600">
                Rohit, Leewan & Jakub
              </span>
              <Link
                href="https://github.com/rohitdasu/projectmate/graphs/contributors"
                target="_blank"
                className="text-xs font-bold text-[#0044ff] underline underline-offset-2 hover:text-[#0f0f0f]"
              >
                and others
              </Link>
            </div>
          </div>
          <div className="flex gap-5 text-sm font-bold uppercase">
            <Link className="hover:text-[#0044ff]" href="/explore">
              Explore
            </Link>
            <Link className="hover:text-[#0044ff]" href="/community">
              Community
            </Link>
            <Link
              className="hover:text-[#0044ff]"
              href="https://github.com/rohitdasu/projectmate"
              target="_blank"
            >
              GitHub
            </Link>
          </div>
          <Link
            href="https://www.buymeacoffee.com/rohit.dasu"
            target="_blank"
            className="inline-flex items-center gap-2 border-2 border-[#0f0f0f] bg-[#ffdd00] px-4 py-2.5 font-display text-xs font-bold uppercase text-[#0f0f0f] shadow-[3px_3px_0_0_#0f0f0f] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          >
            <SiBuymeacoffee size={18} /> Buy me a coffee
          </Link>
        </div>
      </footer>
    </div>
  );
};
