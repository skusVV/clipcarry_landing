import Image from "next/image";
import Link from "next/link";
import React from "react";
import Wrapper from "../Wrapper/Wrapper";
import styles from "./Header.module.scss";
import logo from "../../../../public/logo.png";
import crown from "../../../../public/crown.svg";
import { useRouter } from "next/router";
import { useAppSelector } from "../../../hooks/redux.hooks";
import { selectUser } from "../../../redux/user/userSlice";
import { UserRoles } from "../../../constants";

const Header = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const onPremiumClick = () => {
    if (!user.token || user.role === UserRoles.GUEST) {
      router.push('/login');
    } else if (user.token && user.role === UserRoles.USER) {
      router.push('/payment');
    }
  };

  return (
    <Wrapper>
      <header className={styles.header}>
        <div className={styles.header__logo}>
          <Link href="/">
            <a>
              <Image src={logo} alt="Clipcarry Logo" />
            </a>
          </Link>
        </div>
        <nav className={styles.header__nav}>
          {/* <Link href="#">
            <a className={styles.header__nav__item}>Setting</a>
          </Link>
          <Link href="#">
            <a className={styles.header__nav__item}>Tutorial</a>
          </Link> */}
          <Link href="/#pricing-section">
            <a className={styles.header__nav__item}>Pricing</a>
          </Link>
          { user.role !== UserRoles.PAID_USER && <div onClick={onPremiumClick} className={styles.header__nav__btn}>
            <Image src={crown} alt="Crown Icon"/>
            <span>Go to Premium</span>
          </div>}
        </nav>
      </header>
    </Wrapper>);
};

export default Header;
