import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper/Wrapper";
import styles from "./Payment.module.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { createPaymentIntent, selectSecret } from "../../redux/stripe/stripeSlice";
import { selectUser } from "../../redux/user/userSlice";
import { useRouter } from "next/router";
import { UserRoles } from "../../constants";

const stripePromise = loadStripe("pk_test_51LB1byIQyZGkbh1HBIXNvF61b0QvwXqq5Io9Nv1qiLtHMFBx4ro0G5IYgWhsWEqzDjfJR5geSPsZeQiuFG7L29uY00Vf8UujWn");


const PaymentPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const clientSecret = useAppSelector(selectSecret);

  useEffect(() => {
    if (!user?.token || user?.role === UserRoles.GUEST) {
      router.push('/login');
    } else if (user.role === UserRoles.PAID_USER) {
      router.push('/home');
    }

    dispatch(createPaymentIntent());
  }, []);

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
            {clientSecret && (
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
