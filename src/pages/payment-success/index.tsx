import type { NextPage } from "next";
import { useRouter } from "next/router";
import { LOCAL_STORAGE_USER_TOKEN } from "../../constants";
import { useDidUpdateEffect } from "../../hooks/custom.hooks";
import { useAppDispatch } from "../../hooks/redux.hooks";
import { promoteUser } from "../../redux/user/userSlice";

const PaymentSuccessPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { session_id } = router.query;

  useDidUpdateEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);

    if (token && session_id) {
      dispatch(promoteUser({ token, session_id, callback: () => { router.push('/settings'); } }));
    }
  }, [session_id]);

  return (
    <></>
  )
}

export default PaymentSuccessPage
