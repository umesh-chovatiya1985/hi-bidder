import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET;

/*
 * @params {jwtToken} extracted from cookies
 * @return {object} object of extracted token
 */
export function verifyToken(jwtToken: any) {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (e) {
    console.log('e:', e);
    return null;
  }
}