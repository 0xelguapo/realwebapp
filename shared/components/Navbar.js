import styles from "../../styles/Navbar.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>CoAgent</div>
        <div className={styles.right}>
          <div className={styles.signIn}>
            <Link href="/login">
              <a>Sign In</a>
            </Link>
          </div>
          <div
            className={
              menuOpen ? `${styles.menu} ${styles.menuOpen}` : `${styles.menu}`
            }
            onClick={handleMenu}
          >
            <div className={styles.menuBurger}></div>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className={menuOpen ? styles.dropDown : styles.hide}>
          <div className={styles.itemList}>About Us</div>
          <div className={styles.itemList}>Products</div>
        </div>
      )}
    </>
  );
}
