import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LOCAL_STORAGE_USER_TOKEN } from "../../constants";

const SignOutPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_USER_TOKEN);

    if (token) {
      localStorage.clear();
    }

    router.push('/login');
  }, [])

  return (
    <></>
  )
}

export default SignOutPage
