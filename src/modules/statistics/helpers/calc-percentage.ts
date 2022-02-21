export function calcPersentage(a: number, b: number): string {
  return b === 0 ? '0%' : `${Math.round((a / b) * 100)}%`;
};