export function formatDate(): string {
  return new Date().toISOString().split('T')[0].split('-').reverse().join('.');
}
