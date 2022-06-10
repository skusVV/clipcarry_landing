import type { NextPage } from "next";
import AuthWrapper from "../../components/Layout/AuthWrapper/AuthWrapper";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage: NextPage = () => {

  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  )
}

export default LoginPage
