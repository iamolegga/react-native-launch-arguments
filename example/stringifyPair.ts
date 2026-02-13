export const stringifyPair = (k: string, v: unknown) =>
  `${k}:${v}[${typeof v}]`;
