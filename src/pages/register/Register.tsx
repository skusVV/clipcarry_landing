import { isArray } from "lodash";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthWrapper from "../../components/Layout/AuthWrapper/AuthWrapper";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import { LOCAL_STORAGE_USER_TOKEN, UserRoles } from "../../constants";
import { useDidUpdateEffect } from "../../hooks/custom.hooks";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { getUser, selectRole, selectToken } from "../../redux/user/userSlice";

const RegisterPage: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const storageToken = useAppSelector(selectToken);
  const userRole = useAppSelector(selectRole);
  const { access_token: paramToken } = router.query;

  useDidUpdateEffect(() => {
    if (storageToken && userRole !== UserRoles.GUEST) {
      router.push('/home');
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
    </AuthWrapper>
  )
}

export default RegisterPage
