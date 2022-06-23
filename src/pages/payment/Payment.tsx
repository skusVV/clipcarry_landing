import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper/Wrapper";
import styles from "./Payment.module.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { createPaymentIntent, selectSecret } from "../../redux/stripe/stripeSlice";
import { selectUser } from "../../redux/user/userSlice";
import { useRouter } from "next/router";
import { STRIPE_PUBLIC_KEY, UserRoles } from "../../constants";
import { useDidUpdateEffect } from "../../hooks/custom.hooks";
import { useEffect, useState } from "react";
import moment from "moment";
import { isEmpty } from "lodash";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);


const PaymentPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const clientSecret = useAppSelector(selectSecret);
  const [paidAccount, setPaidAccount] = useState(false);

  // some kind of hack, nevermind
  useDidUpdateEffect(() => {
    if (!user?.token || user?.role === UserRoles.GUEST) {
      router.push('/login');
    } else {
      if (user.role === UserRoles.PAID_USER && user.paymentExpirationDate) {
        setPaidAccount(true);
      } else {
        dispatch(createPaymentIntent());
      }
    }

  }, [user?.role, user?.token]);

  useEffect(() => {
    if (!isEmpty(user)) {
      if (user.role === UserRoles.PAID_USER && user.paymentExpirationDate) {
        setPaidAccount(true);
      } else {
        dispatch(createPaymentIntent());
      }
    }
  }, [user?.role, user?.token]);

  const appearance = {
    theme: 'stripe'
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Layout>
      <Wrapper>
        <div className={styles.payment}>
          <div className={styles.payment__left}>
            <div className={styles.payment__title}>Upgrade to Premium</div>
            <div className={styles.payment__subtitle}>Invest in your work today.</div>
            <div className={styles.payment__price}>
              <div className={styles.payment__price__value}>$9</div>
              <div className={styles.payment__price__description}>Per month, billed monthly.</div>
            </div>
            <div className={styles.payment__benefits}>
              <ul className={styles.payment__benefits__list}>
                <li className={styles.payment__benefits__list__item}>Ability to <b>import</b> templates</li>
                <li className={styles.payment__benefits__list__item}><b>Unlimited</b> custom templates</li>
                <li className={styles.payment__benefits__list__item}><b>1</b> sample template</li>
                <li className={styles.payment__benefits__list__item}><b>Unlimited</b> fields in a template</li>
                <li className={styles.payment__benefits__list__item}><b>Unlimited</b> entries</li>
              </ul>
            </div>
          </div>
          <div className={styles.payment__right}>
            { paidAccount ? (
              <div className={styles.payment__message}>
                <div>You already subscribed until: {moment(user.paymentExpirationDate).format('MM-DD-YYYY')}</div>
              </div>
            ) : clientSecret && (
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            )}
          </div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default PaymentPage
