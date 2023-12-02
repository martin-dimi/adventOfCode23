export const parseInput = async (input: string) => {
  const file = Bun.file(input);
  return await file.text();
};
