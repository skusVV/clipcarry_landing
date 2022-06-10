import React from "react";
import styles from "./AuthWrapper.module.scss";
import Image from "next/image";
import appExampleImage from "../../../../public/app_example.png";
import background from "../../../../public/honeycomb_yellow.png";
import logo from "../../../../public/logo.png";

const AuthWrapper = ({ children }) => {

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className={styles.auth}>
      <div className={styles.auth__left}>
        <div className={styles.auth__left__container}>
          <div className={styles.auth__left__image}>
            <div className={styles.auth__left__background}><Image src={background} alt=""/></div>
            <Image src={appExampleImage}/>
          </div>
          <div className={styles.auth__left__title}>New way to collect candidates</div>
          <div className={styles.auth__left__subtitle}>Have you found yourself copy-pasting information from multiple pages of a website to a spreadsheet? Such as going through LinkedIn profiles or listings on yellow pages?</div>
        </div>
      </div>
      <div className={styles.auth__right}>
        <div className={styles.auth__right__container}>
          <div className={styles.auth__right__formContainer}>
            <div className={styles.auth__right__logo}>
              <Image src={logo} alt="Logo"/>
            </div>
            {children}
          </div>
          <div className={styles.auth__right__copyright}>
            Copyright &copy; {getCurrentYear()}. Clipcarry. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
};

export default AuthWrapper;
