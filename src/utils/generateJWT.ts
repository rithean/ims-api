import jwt, { JwtPayload,  SignOptions } from "jsonwebtoken";

const DEFAULT_SIGN_OPTIONS: SignOptions = {
  expiresIn: "1h",
};

export function generateAccessToken(
  payload: JwtPayload,
  options: SignOptions = DEFAULT_SIGN_OPTIONS
): string {
  const secret = process.env.SECRET_KEY as string;

  if (!secret) {
    throw new Error("SECRET_KEY is not defined in the environment variables.");
  }

  return jwt.sign(payload, secret, options);
}
