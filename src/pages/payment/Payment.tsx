import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper/Wrapper";
import styles from "./Payment.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { selectUser } from "../../redux/user/userSlice";
import { useRouter } from "next/router";
import { UserRoles, EXTENSION_LINK } from "../../constants";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { createPaymentLink, selectStripeLoading } from "../../redux/stripe/stripeSlice";
import { useDidUpdateEffect } from "../../hooks/custom.hooks";
import { ClipLoader } from "react-spinners";

const PaymentPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const stripeLoading = useAppSelector(selectStripeLoading);
  const [paidAccount, setPaidAccount] = useState(false);

  useDidUpdateEffect(() => {
    if (!user.loading) {
      if (!user?.token || user?.role === UserRoles.GUEST) {
        router.push('/login');
      } else {
        dispatch(createPaymentLink({
          resolve: (redirectUrl) => {
            router.push(redirectUrl);
          },
          reject: () => {
            setPaidAccount(true);
          }
        }));
      }
    }
  }, [user]);

  useEffect(() => {
    setLoading((user && user.loading) || stripeLoading);
  }, [user.loading, stripeLoading]);

  return (
    <Layout>
      { !loading && <Wrapper>
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
            { paidAccount && (
              <div className={styles.payment__message}>
                <div>You already subscribed until: {moment(user.paymentExpirationDate).format('MM-DD-YYYY')}</div>
                <Link href={EXTENSION_LINK}>
                  <a target='_blank'>Download the Chrome extension and log in with your email to start using Clipcarry Premium</a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Wrapper> }
      { loading && <div><ClipLoader loading={loading}/></div>}
    </Layout>
  )
}

export default PaymentPage
