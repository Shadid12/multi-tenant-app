import { getAccessToken } from '@auth0/nextjs-auth0';	

export default async function token(req, res) {
  const { accessToken } = await getAccessToken(req, res);
  if(!accessToken) { 
    res.status(401).json({
      error: 'UnAuthorized',
      accessToken: null
    });
  }
  res.status(200).json({ accessToken });
};