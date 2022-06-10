import type { NextPage } from "next";
import AuthWrapper from "../../components/Layout/AuthWrapper/AuthWrapper";
import RegisterForm from "../../components/RegisterForm/RegisterForm";

const RegisterPage: NextPage = () => {

  return (
    <AuthWrapper>
      <RegisterForm />
    </AuthWrapper>
  )
}

export default RegisterPage