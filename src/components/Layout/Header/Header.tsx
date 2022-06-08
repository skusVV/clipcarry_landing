import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wrapper from "../Wrapper/Wrapper";
import styles from "./Header.module.scss";
import logo from "../../../../public/logo.png";
import crown from "../../../../public/crown.svg";

const Header = () => (
  <Wrapper>
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href="/home">
          <a>
            <Image src={logo} alt="Clipcarry Logo" />
          </a>
        </Link>
      </div>
      <nav className={styles.header__nav}>
        <Link href="#">
          <a className={styles.header__nav__item}>Setting</a>
        </Link>
        <Link href="#">
          <a className={styles.header__nav__item}>Tutorial</a>
        </Link>
        <Link href="#">
          <a className={styles.header__nav__item}>Pricing</a>
        </Link>
        <Link href="#">
          <div className={styles.header__nav__btn}>
            <Image src={crown} alt="Crown Icon"/>
            <span>Go to Premium</span>
          </div>
        </Link>
      </nav>
    </header>
  </Wrapper>
);

export default Header;
