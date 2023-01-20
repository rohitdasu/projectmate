import { User } from '@prisma/client';

export const getImageUrl = (user: User) => {
  return (
    user?.image ??
    `https://avatars.dicebear.com/api/initials/${user?.name}.png?backgroundColorLevel=800&fontSize=40`
  );
};
