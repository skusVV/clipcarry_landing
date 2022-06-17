import React from "react";
import styles from "./Footer.module.scss";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../Wrapper/Wrapper";
import logo from "../../../../public/logo_white.png";
import AppToChromeButton from "../../AppToChromeButton/AppToChromeButton";

const Footer = () => {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Wrapper className={styles.wrapper}>
      <footer className={styles.footer}>
        <div className={styles.footer__top}>
          <div className={styles.footer__top__logo}>
            <Link href="/home">
              <a>
                <Image src={logo} alt="Clipcarry Logo" />
              </a>
            </Link>
          </div>
          <nav className={styles.footer__top__nav}>
            <Link href="/home">
              <a className={styles.footer__top__nav__item}>Setting</a>
            </Link>
            <Link href="/home">
              <a className={styles.footer__top__nav__item}>Tutorial</a>
            </Link>
            <Link href="/home#pricing-section">
              <a className={styles.footer__top__nav__item}>Pricing</a>
            </Link>
            <Link href="/home">
              <a className={styles.footer__top__nav__item}>Privacy Policy</a>
            </Link>
          </nav>
        </div>
        <div className={styles.footer__bottom}>
          <p className={styles.footer__bottom__copyright}>
            Copyright &copy; {getCurrentYear()}. Clipcarry. All rights reserved.
          </p>
          <Link href="/home">
            <a className={styles.footer__bottom__btn}><AppToChromeButton/></a>
          </Link>
        </div>
      </footer>
    </Wrapper>
  )
};

export default Footer;
