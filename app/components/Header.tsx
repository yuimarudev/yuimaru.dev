import { NavLink } from "@remix-run/react";
import styles from "./style.module.css";

export function Header() {
  return (
    <div className={styles["header-wrapper"]}>
      <header className={styles.header}>
        <h2>
          <NavLink className={[styles.link, styles.name].join(" ")} to="/">
            ゆいまる
          </NavLink>
        </h2>
        <ul className={styles.ul}>
          <li>
            <NavLink className={styles.link} to="/articles">
              ブログ
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.link} to="/about">
              誰？
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
}
