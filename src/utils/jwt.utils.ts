import jwt from 'jsonwebtoken';

export function generateToken(
  payload: object,
): string {
  const  SECRET_KEY = process.env.SECRET_KEY;
  const expiresIn = '1d';
  
 if (!SECRET_KEY) {
    throw new Error('jwt_secret is not defined in enviroment variable');
  }
  const token = jwt.sign(payload,  SECRET_KEY, { expiresIn });
  return token;
}

export function generateAccessToken(payload: Object):string{
  const ACCESS_SECRET = process.env.ACCESS_SECRET;
  const expiresIn = '1d';
  if(!ACCESS_SECRET){
    throw new Error('get access token is not defined');
  }
  const accessToken = jwt.sign(payload, ACCESS_SECRET, {expiresIn});
   return accessToken;
}
export function generateRefreshToken(payload: Object):string{
   const REFRESH_SECRET = process.env.REFRESH_SECRET;
   const expiresIn = '7d';
   if(!REFRESH_SECRET){
    throw new Error('get refresh token is not defined');
   }
   const refreshToken = jwt.sign(payload,REFRESH_SECRET, {expiresIn})
  return refreshToken;
}