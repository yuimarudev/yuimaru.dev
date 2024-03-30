import { loadDefaultJapaneseParser } from "@tknf/budoux-edge";
import styles from "./style.module.css";

export function TextWrapper({ children }: { children: string }) {
  const parser = loadDefaultJapaneseParser();

  return (
    <span className={styles["text-wrapper"]}>
      {concat(
        justify(
          parser
            .parse(children)
            .flatMap((x) => [
              x,
              <wbr key={Math.random().toString(36).slice(2)} />,
            ]),
        ),
      )}
    </span>
  );
}

function justify(content: (string | JSX.Element)[]) {
  const hiragana = "\u3040-\u309F～";
  const katakana = "\u30A0-\u30FF";
  const kanji =
    "\u2E80-\u2FFF\u31C0-\u31EF\u3300-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF\uFE30-\uFE4F";

  const punct: string = "[—@&=_,.?!$%\^*-+/]";
  const left: string = `[\\[({'"<«‘“]`;
  const right: string = `[\\])}'">»’”]`;

  const cjk = `[${[hiragana, katakana, kanji].join("")}]`;
  const latin = `[A-Za-z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]|${punct}`;

  const patterns = (
    [
      [cjk, `${latin}|${left}`],
      [`${latin}|${right}`, cjk],
      ["[：]", "[『]"],
      [cjk, "[：]"],
    ] satisfies [string, string][]
  ).map((x) => new RegExp(`(${x[0]})(${x[1]})`, "i"));

  return content
    .flatMap<(string | JSX.Element)[], (string | JSX.Element)[]>((v) =>
      typeof v === "string" ? [...v] : [v],
    )
    .flatMap((v, i, t) => {
      if (typeof v !== "string") return v;

      const quarter = patterns.some((x) =>
        x.exec(
          (t
            .slice(0, i)
            .reverse()
            .filter((x) => typeof x === "string")
            .at(0) ?? "") + v,
        ),
      );

      if (quarter) {
        return [
          <span
            className={styles.quarter}
            key={Math.random().toString(36).slice(2)}
          />,
          v,
        ];
      }

      return v;
    });
}

function concat(contents: (string | JSX.Element)[]): (string | JSX.Element)[] {
  const v: (string | JSX.Element)[] = [];

  for (const content of contents) {
    if (typeof content !== "string") {
      v.push(content);
      continue;
    }

    const now = v.at(-1);

    if (typeof now !== "string") {
      v.push(content);
    } else {
      v[v.length - 1] = now + content;
    }
  }

  return v;
}
