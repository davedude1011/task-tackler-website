// src/api/upload_image.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { GauthTapper } from '~/server/gauth-tapper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {

        const { base64_image } = req.body;

        if (!base64_image) {
            return res.status(400).json({ message: 'No base64 image provided' });
        }

        const gauth_tapper = new GauthTapper();
        const upload_response = await gauth_tapper.answer_question(base64_image)

        console.log(upload_response)

        if (upload_response) {
            return res.status(200).json(upload_response);
        }
        return res.status(500).json({ message: 'Failed to upload image' });

    } catch {
        return res.status(500).json({ message: 'Error processing the image' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
