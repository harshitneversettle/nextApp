export default function GeneratePassword(length: number) {
  const allChars =
    "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()";
  let generatedPass = "";

  for (let i = 0; i <= length - 1; i++) {
    const randomIdx = Math.floor(Math.random() * allChars.length);
    generatedPass += allChars[randomIdx];
  }
  return generatedPass;
}
