import React from "react";
import Wrapper from "../Wrapper/Wrapper";
import styles from './ShortLayout.module.scss';
import logo from "../../../../public/logo.png";
import arrowIcon from "../../../../public/ic_full_right_arrow.svg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const ShortLayout = ({ children }) => {
  const router = useRouter();

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  const onButtonClick = () => {
    router.push('/login');
  };

  return (
    <>
      <Wrapper className={styles.wrapper}>
        <header className={styles.shortLayout__header}>
          <div className={styles.shortLayout__header__logo}>
            <Link href="/">
              <a>
                <Image src={logo} alt="Clipcarry Logo" />
              </a>
            </Link>
          </div>
          <div onClick={onButtonClick} className={styles.shortLayout__header__button}>
            <span className={styles.shortLayout__header__button__text}>Back to Login</span>
            <span className={styles.shortLayout__header__button__arrow}><Image src={arrowIcon} alt="arrow icon" /></span>
          </div>
        </header>
      </Wrapper>
      <Wrapper>
        <main className={styles.shortLayout__main}>
          {children}
        </main>
      </Wrapper>
      <Wrapper>
        <footer className={styles.shortLayout__footer}>
          <div>
            Copyright &copy; {getCurrentYear()}. Clipcarry. All rights reserved.
          </div>
        </footer>
      </Wrapper>
    </>
  );
};



export default ShortLayout;
