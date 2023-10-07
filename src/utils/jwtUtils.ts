import jwt from 'jsonwebtoken';
import { JWTPayload } from '../types/authInterfaces';

/**
 * Create a JSON Web Token (JWT) based on the provided payload.
 *
 * @param {JWTPayload} payload - The payload to be encoded in the JWT.
 * @returns {string} The generated JWT token.
 */
export const createJWT = (payload: JWTPayload) => {
  // Create a JWT token with the provided payload and expiration time
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return token;
};

/**
 * Verify the authenticity and validity of a JSON Web Token (JWT).
 *
 * @param {string} token - The JWT to be verified.
 * @returns {object} The decoded payload of the verified JWT.
 * @throws {Error} Throws an error if JWT verification fails.
 */
export const verifyJWT = (token: string) =>
  jwt.verify(token, process.env.JWT_SECRET);
