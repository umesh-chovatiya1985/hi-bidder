// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import HtmlParser from './libs/HtmlParser';
import { mailer } from './mail-sender/mailer'
type Data = {
  name: string
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({ name: 'I am hello world' })
}
