import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LOCAL_STORAGE_USER_TOKEN } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { promoteUser, selectLoading } from "../../redux/user/userSlice";

const PaymentSuccessPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);

  useEffect(() => {
    console.log('router', router);
    // cs_test_a1AfQEFs2xmD6XU5ILZDo0tysVIMwDxcGB3yaOa52t21kfxvIne06dqgFq
    // const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);
    //
    // if (token) {
    //   dispatch(promoteUser(token));
    // }
  }, []);

  useEffect(() => {
    // if (!loading) {
    //   router.push('/payment');
    // }
  }, [loading]);

  return (
    <></>
  )
}

export default PaymentSuccessPage
