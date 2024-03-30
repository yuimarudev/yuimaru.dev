import type { MetaFunction } from "@remix-run/cloudflare";
import { TextWrapper } from "~/components/TextWrapper";
import styles from "~/styles/_index.module.css";

export const meta: MetaFunction = () => {
  return [
    { title: "yuimaru" },
    {
      name: "description",
      content: "yuimaru のサイト",
    },
    { name: "og:image", content: "/favicon.webp" },
    {
      name: "theme-color",
      content: "#1d9bf0",
    },
  ];
};

export default function Index() {
  return (
    <div className={styles["index-root"]}>
      <div className={styles.greet}>
        <img className={styles.icon} src="/favicon.webp" alt="" />
        <h2 className={styles.name}>
          <TextWrapper>yuimaru</TextWrapper>
        </h2>
      </div>
      <p>
        <TextWrapper>ゆいまる(yuimaru)のサイトです</TextWrapper>
      </p>
    </div>
  );
}
