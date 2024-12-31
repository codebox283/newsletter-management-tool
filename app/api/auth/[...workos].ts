// // src/pages/api/auth/[...workos].ts

// import { NextApiRequest, NextApiResponse } from 'next';
// import { WorkOS } from 'workos';

// const workos = new WorkOS(process.env.WORKOS_API_KEY!);

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     const { code } = req.query;

//     // Exchange code for access token here (implement token exchange logic)

//     res.status(200).json({ message: 'Authentication successful' });
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
