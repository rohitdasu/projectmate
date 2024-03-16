import { User } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export const getUsersWithProjects = async (users: User[]) => {
  const result = await Promise.all(
    users.map(async (user) => {
      const projects = await prisma.project.findMany({
        where: { authorId: user.id },
      });

      const userProjects = projects.map((project) => project.title);

      return {
        id: user.id,
        name: user.name,
        title: user.title,
        username: user.username,
        skills: user.skills,
        description: user.description,
        profilePicture: user.image,
        role: userProjects.length > 0 ? 'GS' : 'NS',
        projects: userProjects,
        numberOfProjects: userProjects.length,
      };
    })
  );

  return result;
};
