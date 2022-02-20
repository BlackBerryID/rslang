const getLevel = (idx: number): string => {
  const codeCof = Math.floor(idx / 2);
  return `${String.fromCharCode(65 + codeCof)}${idx % 2 + 1}`;
};

export { getLevel };
