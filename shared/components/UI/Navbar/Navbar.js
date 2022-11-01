import { useState } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import Image from "next/image";

export default function Navbar({ dashboard }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  if (dashboard) {
    return (
      <div className={styles.dashContainer}>
        <div className={styles.dashLogoContainer}>
          <div className={styles.dashLogoImage}>
            <Image src="/logo.svg" width={35} height={35} alt="logo" />
          </div>
          CoAgent.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <Link href="/">
            <a>
              <div className={styles.logoContainer}>
                <div className={styles.logoImage}>
                  <Image src="/logo.svg" width={35} height={35} alt="logo" />
                </div>
                <h3 className={styles.logoText}>CoAgent.</h3>
              </div>
            </a>
          </Link>
          {/* <div className={styles.links}>
            <p>Blog</p>
          </div> */}
        </div>

        <div className={styles.right}>
          <div className={styles.signIn}>
            {/* <Link href="/login">
              <a>Sign In</a>
            </Link> */}
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
