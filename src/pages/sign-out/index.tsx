import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LOCAL_STORAGE_USER_TOKEN } from "../../constants";
import cookieCutter from 'cookie-cutter';

const SignOutPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);

    if (token) {
      localStorage.clear();

      cookieCutter.set('shared_user_token', '', { expires: new Date(0) });
    }

    router.push('/login');
  }, [])

  return (
    <></>
  )
}

export default SignOutPage
