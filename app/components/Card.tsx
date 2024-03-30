import { NavLink } from "@remix-run/react";
import { TextWrapper } from "./TextWrapper";
import styles from "./style.module.css";

export function Card({
  href,
  title,
  description,
  date,
}: { href: string; title: string; description: string; date: Date }) {
  return (
    <NavLink className={styles.anchor} to={href}>
      <div className={styles.card}>
        <details open>
          <summary>
            <h3>
              <TextWrapper>{title}</TextWrapper>
            </h3>
          </summary>
          <p>
            <TextWrapper>
              {Intl.DateTimeFormat("ja-jp", {
                dateStyle: "long",
                timeStyle: "long",
              }).format(date)}
            </TextWrapper>
          </p>
          <p>
            <TextWrapper>{description}</TextWrapper>
          </p>
        </details>
      </div>
    </NavLink>
  );
}
