// // Import necessary modules and dependencies
// import { NextApiRequest, NextApiResponse } from 'next';
// import { prisma } from '@/lib/prisma';

// // Define the route handler
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   try {
//     // Get all users
//     const allUsers = await prisma.user.findMany();

//     // Update each user with the id value copied to the username field
//     const updatedUsers = await Promise.all(
//       allUsers.map(async (user) => {
//         const updatedUser = await prisma.user.update({
//           where: { id: user.id },
//           data: { username: user.id.toString() },
//         });
//         return updatedUser;
//       })
//     );

//     console.log('Users updated successfully:', updatedUsers);

//     res
//       .status(200)
//       .json({ message: 'Users updated successfully', updatedUsers });
//   } catch (error) {
//     console.error('Error updating users:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     // Disconnect PrismaClient
//     await prisma.$disconnect();
//   }
// }
