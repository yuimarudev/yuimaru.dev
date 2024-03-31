export function __throw(e?: Error): never {
  throw e;
}

export function format(...r: string[]): string {
  return r.reduce(
    (a, c, i) => a?.replace(new RegExp(`\\{${i}\\}`, "g"), c),
    r.shift(),
  ) as string;
}
