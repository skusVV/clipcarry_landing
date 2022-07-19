import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import Layout from '../../components/Layout/Layout';
import Wrapper from '../../components/Layout/Wrapper/Wrapper';
import { UserRoles } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { createPaymentLink, getPortalLink, selectStripeLoading } from '../../redux/stripe/stripeSlice';
import { selectUser } from '../../redux/user/userSlice';
import styles from './Settings.module.scss';
import GeneralTab from './tabs/general-tab/GeneralTab';
import PasswordTab from './tabs/password-tab/PasswordTab';
import crownSmall from '../../../public/crown_small.svg';

export enum SettingTabs {
  GENERAL = 'general',
  PASSWORD = 'password',
  BILLING = 'billing'
}

const SettingsPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const stripeLoading = useAppSelector(selectStripeLoading);
  const [activeTab, setActiveTab] = useState(SettingTabs.GENERAL);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading((user && user.loading) || stripeLoading);
  }, [user.loading, stripeLoading]);

  const getUserAvatar = () => {
    return (<div className={styles.settings__user__avatar__placeholder}>{getUserFirstLetter()}</div>) // or rear user image
  };

  const getUserFullName = () => {
    return `${user.firstName} ${user.lastName}`;
  };

  const getUserFirstLetter = () => {
    return user?.firstName.split('')[0]?.toUpperCase() || 'A';
  };

  const onBillingClick = () => {
    if (user && user.role === UserRoles.PAID_USER) {
      dispatch(getPortalLink({ callback: (redirectUrl) => {
        router.push(redirectUrl);
      }}));
    } else {
      dispatch(createPaymentLink({
        resolve: (redirectUrl) => {
          router.push(redirectUrl);
        },
        reject: () => {}
      }));
    }
  };

  const getNavOptions = () => {
    return [
      { title: 'General', key: SettingTabs.GENERAL, onClick: () => { setActiveTab(SettingTabs.GENERAL) } },
      { title: 'Password', key: SettingTabs.PASSWORD, onClick: () => { setActiveTab(SettingTabs.PASSWORD) } },
      { title: 'Billing', key: SettingTabs.BILLING, onClick: onBillingClick },
    ];
  };

  const renderNavigation = (options) => {
    return options.map((option) => (
      <li className={ styles.settings__nav__item }
          data-active={ activeTab === option.key }
          key={ option.key }
          onClick={ option.onClick }>{ option.title }</li>
    ));
  };

  const renderTab = () => {
    switch (activeTab) {
      case SettingTabs.GENERAL: {
        return <GeneralTab user={user}></GeneralTab>
      }
      case SettingTabs.PASSWORD: {
        return <PasswordTab></PasswordTab>
      }
      default: break;
    }
  };

  const onLogoutClick = () => {
    router.push('/sign-out');
  };

  const onBannerClick = () => {
    dispatch(createPaymentLink({
      resolve: (redirectUrl) => {
        router.push(redirectUrl);
      },
      reject: () => {}
    }));
  };

  const isBannerVisible = () => {
    return user && user.role === UserRoles.USER;
  }

  return (
    <Layout>
      <Wrapper>
        <div className={styles.settings}>
          <aside className={styles.settings__aside}>
            <div className={styles.settings__user}>
              <div className={styles.settings__user__avatar}>
                { getUserAvatar() }
              </div>
              <div className={styles.settings__user__info}>
                <div className={styles.settings__user__info__name}>{getUserFullName()}</div>
                <div className={styles.settings__user__info__email}>{user.email}</div>
              </div>
            </div>

            <ul className={styles.settings__nav}>
              { renderNavigation(getNavOptions()) }
            </ul>

            <div className={styles.settings__logout}>
              <span onClick={onLogoutClick}>Logout</span>
            </div>

            { isBannerVisible() && <div className={styles.settings__banner}>
              <div className={styles.settings__banner__title}>Upgrade Now</div>
              <div className={styles.settings__banner__message}>Everything is unlimited, create templates, add fields and save entries</div>
              <div className={styles.settings__banner__button} onClick={onBannerClick}>
                <Image src={crownSmall}></Image>
                <span className={styles.settings__banner__button__text}>Go to premium</span>
              </div>
            </div> }
          </aside>

          <div className={styles.settings__content}>
            { renderTab() }
          </div>
        </div>
        { loading && <div className={styles.spinner}><ClipLoader loading={ loading }/></div> }
      </Wrapper>
    </Layout>
  );
}

export default SettingsPage;