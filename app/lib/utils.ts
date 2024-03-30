export function __throw(e?: Error): never {
  throw e;
}

function iterable(x: unknown): x is Iterable<unknown> {
  return typeof x === "object" && !!x && Symbol.iterator in x;
}
