import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

export function signJwt(
  payload: object,
  keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
  options?: SignOptions | undefined
) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');
  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt(
  token: string,
  keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey'
) {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString(
    'ascii'
  );
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e) {
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
}
