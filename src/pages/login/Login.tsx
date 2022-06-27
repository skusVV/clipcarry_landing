import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AuthWrapper from "../../components/Layout/AuthWrapper/AuthWrapper";
import LoginForm from "../../components/LoginForm/LoginForm";
import { LOCAL_STORAGE_USER_TOKEN } from "../../constants";

const LoginPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);

    if (token) {
      router.push('/');
    }
  }, []);


  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  )
}

export default LoginPage
