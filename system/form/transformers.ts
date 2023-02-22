export const allowNaN = (value: number): number | undefined =>
  isNaN(value) ? undefined : value;
