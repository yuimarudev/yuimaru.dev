export default function (...r: string[]): string {
  return r.reduce((a, c, i) => a?.replace(new RegExp(`\\{${i}\\}`, "g"), c), r.shift()) as string;
}
