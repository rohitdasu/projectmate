import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from '@/pages';
import { ArrowDown, Star } from 'lucide-react';
import Link from 'next/link';

export const HeroComponent = ({
  userCount,
  randomUsers,
}: {
  userCount: number | null;
  randomUsers: User[] | null;
}) => {
  return (
    <section className="flex h-full flex-col items-center justify-center gap-16 px-4 md:px-8 xl:px-0">
      <div
        className="relative flex flex-col items-center gap-8 overflow-hidden bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/checks.png')",
          backgroundPosition: 'center',
        }}
      >
        <h1 className="mx-auto max-w-4xl text-center text-2xl font-semibold text-gray-900 md:text-5xl md:!leading-[1.25] dark:text-gray-300">
          Supercharge your open-source contributions
        </h1>
        <p className="mx-auto max-w-2xl text-center text-sm font-light text-gray-900 md:text-lg dark:text-gray-300">
          Explore projects, contribute seamlessly, access insightful stats,
          effortlessly share, connect with a vibrant community, and showcase
          your work with a personalized portfolio.
        </p>
        <Button size={'lg'} asChild>
          <Link href="/projects" className="text-center">
            Explore Projects
          </Link>
        </Button>
        <section className="flex flex-row gap-3">
          <ul className="flex flex-row items-center">
            {randomUsers?.map((user: User, idx: number) => (
              <li
                className="transition-all hover:z-10 hover:-translate-y-1"
                key={idx}
                style={{ marginLeft: idx > 0 ? -15 : 0 }}
              >
                <Link href={'profile/' + user.username}>
                  <Avatar className="h-8 w-8 md:h-9 md:w-9">
                    <AvatarImage src={user.image} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                </Link>
              </li>
            ))}
          </ul>
          <section>
            <section className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4 text-white"
                  fill="orange"
                />
              ))}
            </section>
            <p className="text-xs font-light md:text-sm">
              loved by {userCount} registered users
            </p>
          </section>
        </section>
      </div>
      <Link href="#demo" className="">
        <ArrowDown className="animate-bounce" />
      </Link>
    </section>
  );
};
