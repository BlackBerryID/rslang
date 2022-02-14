const getLevel = (idx: number): string => {
  if (idx === 0 || idx === 1) {
    return `A${idx % 2 + 1}`;
  }
  if (idx === 2 || idx === 3) {
    return `B${idx % 2 + 1}`;
  }
  return `C${idx % 2 + 1}`;
};

export { getLevel };
