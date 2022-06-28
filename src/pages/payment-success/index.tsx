import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import Wrapper from "../../components/Layout/Wrapper/Wrapper";
import { LOCAL_STORAGE_USER_TOKEN } from "../../constants";
import { useAppDispatch } from "../../hooks/redux.hooks";
import { promoteUser } from "../../redux/user/userSlice";
import styles from './paymentSuccess.module.scss';

const PaymentSuccessPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);

    if (token) {
      dispatch(promoteUser(token));
    }
  }, []);

  const handleHomeClick = () => {
    router.push('/');
  }

  return (
    <Layout>
      <Wrapper>
        <div className={styles.container}>
          <h2>Congratulations! You successfully upgraded to Clipcarry Premium with unlimited features. Your subscription will renew each month unless you stop your subscription.</h2>
          <div className={styles.container__button} onClick={handleHomeClick}>Back to Homepage</div>
        </div>
      </Wrapper>
    </Layout>
  )
}

export default PaymentSuccessPage
