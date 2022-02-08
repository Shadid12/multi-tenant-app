import { getAccessToken } from '@auth0/nextjs-auth0';	

export default async function token(req, res) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(200).json({
      accessToken: process.env.NEXT_PUBLIC_FAUNA_KEY,
     })
  }
};