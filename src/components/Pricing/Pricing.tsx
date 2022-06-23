import { useRouter } from 'next/router';
import React from 'react';
import { EXTENSION_LINK, UserRoles } from '../../constants';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectUser } from '../../redux/user/userSlice';
import Wrapper from '../Layout/Wrapper/Wrapper';
import styles from './Pricing.module.scss';

const Pricing = () => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const onSubscribeClick = () => {
    if (!user.token || user.role === UserRoles.GUEST) {
      router.push('/login');
    } else if (user.token && user.role === UserRoles.USER) {
      router.push('/payment');
    }
  };

  const onGetStartedClick = () => {
    if (!user.token || user.role === UserRoles.GUEST) {
      router.push('/register');
    } else if (user.token && user.role === UserRoles.USER) {
      window.open(EXTENSION_LINK, '_blank');
    }
  };

  return (
    <Wrapper className={styles.wrapper}>
      <section id="pricing-section" className={styles.pricing}>
        <div className={styles.pricing__header}>
          <div className={styles.pricing__header__title}>
            Start now your free plan
          </div>
          <div className={styles.pricing__header__subtitle}>
          In fact, you don't even need to sign up. Simply download and activate the extension from the Chrome store and start clipping and carrying (i.e. copying information and storing it somewhere else you'd need).
          </div>
        </div>
        <div className={styles.pricing__plans}>
          <div className={styles.pricing__plans__free}>
            <div className={styles.pricing__plans__title}>Free</div>
            <div className={styles.pricing__plans__price}>
              <div className={styles.pricing__plans__price__value}>$0</div>
              <div className={styles.pricing__plans__price__period}>/mo</div>
            </div>
            <div className={styles.pricing__plans__subtitle}>It's totally free</div>
            <ul className={styles.pricing__plans__benefit}>
              <li className={styles.pricing__plans__benefit__item}><b>2</b> custom templates</li>
              <li className={styles.pricing__plans__benefit__item}><b>1</b> sample template</li>
              <li className={styles.pricing__plans__benefit__item}><b>5</b> fields in a template</li>
              <li className={styles.pricing__plans__benefit__item}><b>5</b> entries</li>
            </ul>
            <div onClick={onGetStartedClick} className={styles.pricing__plans__submit}>Get started for free</div>
          </div>
          <div className={styles.pricing__plans__premium}>
            <div className={styles.pricing__plans__title}>Premium</div>
            <div className={styles.pricing__plans__price}>
              <div className={styles.pricing__plans__price__value}>$9</div>
              <div className={styles.pricing__plans__price__period}>/mo</div>
            </div>
            <div className={styles.pricing__plans__subtitle}>Try it as long as you like</div>
            <ul className={styles.pricing__plans__benefit}>
              <li className={styles.pricing__plans__benefit__item}>Ability to <b>import</b> templates</li>
              <li className={styles.pricing__plans__benefit__item}><b>Unlimited</b> custom templates</li>
              <li className={styles.pricing__plans__benefit__item}><b>1</b> sample template</li>
              <li className={styles.pricing__plans__benefit__item}><b>Unlimited</b> fields in a template</li>
              <li className={styles.pricing__plans__benefit__item}><b>Unlimited</b> entries</li>
            </ul>
            <div onClick={onSubscribeClick} className={styles.pricing__plans__submit}>Subscribe Now</div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};

export default Pricing;
