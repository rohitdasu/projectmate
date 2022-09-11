import { NextApiRequest, NextApiResponse } from 'next';
import { ResponseType } from '../../interfaces';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { authorName, title, description, githubRepo, tags, userId } = req.body;

  if (req.method === 'POST') {
    const new_project = await prisma.project
      .create({
        data: {
          author: authorName,
          title: title,
          description: description,
          githubRepository: githubRepo,
          tags: tags,
          userId: userId,
        },
      })
      .then(() => {
        res.status(200).json({
          message: 'Project is created',
          success: true,
          data: new_project,
        });
      })
      .catch((e: any) => {
        console.log(e);
        res.json({ data: null, message: e, success: false });
      });
  }
}
