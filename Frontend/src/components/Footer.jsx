import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.appFooter}>
      <div className={styles.footerContent}>
        <p className={styles.footerBrand}>GolFan</p>
        <p className={styles.footerTagline}>Play. Predict. Compete.</p>
      </div>

      <p className={styles.footerCopy}>
        © {new Date().getFullYear()} GolFan Fantasy Golf
      </p>
    </footer>
  );
}

