import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LOCAL_STORAGE_USER_TOKEN } from "../../constants";
import { useAppDispatch } from "../../hooks/redux.hooks";
import { promoteUser } from "../../redux/user/userSlice";

const PaymentSuccessPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);

    if (token) {
      dispatch(promoteUser(token));
    }

    router.push('/home');
  }, [])

  return (
    <></>
  )
}

export default PaymentSuccessPage
