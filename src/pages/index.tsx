import type { NextPage } from 'next'
import Benefits from '../components/Benefits/Benefits';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Layout from '../components/Layout/Layout'
import Pricing from '../components/Pricing/Pricing';
import { useAppDispatch, useAppSelector } from "../hooks/redux.hooks";
import { showMessagePopup } from "../redux/message/message";
import { useEffect, useState } from "react";
import { isArray } from "lodash";
import { LOCAL_STORAGE_REGISTRATION_PROMOCODE } from "../constants";
import { useRouter } from "next/router";
import { selectUserLoading } from '../redux/user/userSlice';
import { selectStripeLoading } from '../redux/stripe/stripeSlice';
import { ClipLoader } from 'react-spinners';

const HomePage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userLoading = useAppSelector(selectUserLoading);
  const stripeLoading = useAppSelector(selectStripeLoading);
  const { invite } = router.query;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      if (invite) {
          const promoCode = isArray(invite) ? invite[0] : invite;
          localStorage.setItem(LOCAL_STORAGE_REGISTRATION_PROMOCODE, promoCode);
          dispatch(showMessagePopup({ message: 'One Year Discount has been applied. Please, register to proceed!' }));
      }
  }, [invite]);

  useEffect(() => {
    setLoading(stripeLoading || userLoading);
  }, [stripeLoading, userLoading]);

  return (
    <Layout>
      {!loading && <>
        <Jumbotron />
        <Benefits />
        <Pricing />
      </>}
      {loading && <div><ClipLoader loading={ loading }></ClipLoader></div>}
    </Layout>
  )
}

export default HomePage
