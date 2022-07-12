import { isArray } from "lodash";
import { NextPage } from "next"
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import styles from './ForgotPassword.module.scss';
import React, { useEffect, useState } from 'react';
import SendEmailStep from "./steps/SendEmail/SendEmail";
import { useAppSelector } from "../../hooks/redux.hooks";
import CheckEmailStep from "./steps/CheckEmail/CheckEmail";
import SetPasswordStep from "./steps/SetPassword/SetPassword";
import { selectUserLoading } from "../../redux/user/userSlice";
import ShortLayout from "../../components/Layout/ShortLayout/ShortLayout";

export enum ForgotPasswordSteps {
  SendEmail = 'SendEmail',
  CheckEmail = 'CheckEmail',
  SetPassword = 'SetPassword'
}

const ForgotPasswordPage: NextPage = () => {
  const router = useRouter();
  const [step, setStep] = useState<string>('');
  const [resetKey, setResetKey] = useState<string>('');
  const userLoading = useAppSelector(selectUserLoading);
  const { reset_password_key: resetKeyParam } = router.query;

  useEffect(() => {
    if (resetKeyParam) {
      setResetKey(isArray(resetKeyParam) ? resetKeyParam[0] : resetKeyParam);
      setStep(ForgotPasswordSteps.SetPassword);
    } else {
      setStep(ForgotPasswordSteps.SendEmail);
    }
  }, [resetKeyParam]);


  const getStepComponent = () => {
    switch(step) {
      case ForgotPasswordSteps.SendEmail: {
        return <SendEmailStep onStepChange={(step) => setStep(step)}></SendEmailStep>;
      }
      case ForgotPasswordSteps.CheckEmail: {
        return <CheckEmailStep></CheckEmailStep>;
      }
      case ForgotPasswordSteps.SetPassword: {
        return <SetPasswordStep passwordResetKey={resetKey}></SetPasswordStep>;
      }
      default: break;
    }
  }

  const isLoadingActive = () => {
    return userLoading || (step ? false : true);
  }

  return (
    <ShortLayout>
      {!isLoadingActive() && <div className={styles.forgotPassword}>
        {getStepComponent()}
      </div>}
      {isLoadingActive() && <div><ClipLoader loading={isLoadingActive()}/></div>}
    </ShortLayout>
  )
}

export default ForgotPasswordPage
