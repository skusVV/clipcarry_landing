import { isArray } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthWrapper from "../../components/Layout/AuthWrapper/AuthWrapper";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import {LOCAL_STORAGE_REGISTRATION_PROMOCODE, LOCAL_STORAGE_USER_TOKEN, UserRoles} from "../../constants";
import { useDidUpdateEffect } from "../../hooks/custom.hooks";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { getUser, selectRole, selectToken } from "../../redux/user/userSlice";
import {selectIsOpen, showMessagePopup} from "../../redux/message/message";
import MessagePopup from "../../components/messagePopup/MessagePopup";

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storageToken = useAppSelector(selectToken);
  const userRole = useAppSelector(selectRole);
  const { access_token: paramToken } = router.query;
  const isMessageOpen = useAppSelector(selectIsOpen);
  const { invite } = router.query;

  useEffect(() => {
    if (invite) {
      const promoCode = isArray(invite) ? invite[0] : invite;
      localStorage.setItem(LOCAL_STORAGE_REGISTRATION_PROMOCODE, promoCode);
      dispatch(showMessagePopup({ message: 'One Year Discount has been applied. Please, register to proceed!' }))

    }
  }, [invite]);


  useDidUpdateEffect(() => {
    if (storageToken && userRole !== UserRoles.GUEST) {
      router.push('/');
    }

    if (paramToken) {
      const token = isArray(paramToken) ? paramToken[0] : paramToken; // typescript tricky moment
      router.replace('/register', undefined, { shallow: true });
      localStorage.setItem(LOCAL_STORAGE_USER_TOKEN, token);
      dispatch(getUser(token));
    }
  }, [paramToken, storageToken]);

  return (
    <AuthWrapper>
      <RegisterForm />
      { isMessageOpen && <MessagePopup />}
    </AuthWrapper>
  )
}

export default RegisterPage
