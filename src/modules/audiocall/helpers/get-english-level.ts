const getLevel = (idx: number): string => {
  const codeCof = idx > 3 ? 2 : (idx > 1 ? 1 : 0)
  return `${String.fromCharCode(65 + codeCof)}${idx % 2 + 1}`
};

export { getLevel };
