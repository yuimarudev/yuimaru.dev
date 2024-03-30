import type { MetaFunction } from "@remix-run/cloudflare";
import { TextWrapper } from "~/components/TextWrapper";
import styles from "~/styles/about.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "yuimaru って誰？" },
    {
      name: "description",
      content: "yuimaru とは誰なのかを簡潔に説明します",
    },
    {
      property: "og:image",
      content: "/favicon.webp",
    },
    {
      name: "theme-color",
      content: "#1d9bf0",
    },
  ];
};

export default function About() {
  return (
    <div className={styles.about}>
      <h2>誰？</h2>
      <p>
        <TextWrapper>ゆいまる(yuimaru)という者です</TextWrapper>
      </p>
      <h2>属性</h2>
      <ul>
        <li>高校生</li>
        <li>
          パソコンカタカタ
          <ul>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>
              Rust
              <ul>
                <li>
                  <TextWrapper>Kernelを書きます</TextWrapper>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>絵を描きます</li>
      </ul>
    </div>
  );
}
