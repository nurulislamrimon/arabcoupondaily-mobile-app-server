import jwt from "jsonwebtoken";

export function generate_token(data: { email: string }): string {
  const { email } = data;
  const token = jwt.sign({ email }, process.env.secret_key || "", {
    expiresIn: "1d",
  });
  return token;
}
