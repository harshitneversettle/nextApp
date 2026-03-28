import bcrypt from "bcrypt";

export async function generateHash(pass: string) {
  const hash = await bcrypt.hash(pass, 10);
  return hash;
}
