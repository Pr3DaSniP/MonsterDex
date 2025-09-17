export function applyFilters(url: string, filters: Record<string, any>): string {
  const params = new URLSearchParams(filters);
  return `${url}&${params.toString()}`;
}