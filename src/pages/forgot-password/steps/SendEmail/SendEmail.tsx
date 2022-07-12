import Link from 'next/link';
import React, { useEffect } from 'react';
import FullButton from '../../../../components/FullButton/FullButton';
import Input from '../../../../components/Input/Input';
import styles from './SendEmail.module.scss';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import { selectError, sendResetPasswordEmail } from '../../../../redux/user/userSlice';
import { useForm } from 'react-hook-form';
import { ForgotPasswordSteps } from '../../ForgotPassword';

type Inputs = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Please enter a valid email!').required('Email is required'),
});

interface SendEmailStepProps {
  onStepChange?: (step: any) => void;
}

const SendEmailStep = ({ onStepChange }: SendEmailStepProps) => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const { formState: {errors, isDirty}, handleSubmit, control, setError } = useForm<Inputs>({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onResetSubmit = (data) => {
    dispatch(sendResetPasswordEmail({
      email: data.email,
      callback: () => {
        onStepChange(ForgotPasswordSteps.CheckEmail);
      }
    }));
  };

  useEffect(() => {
    setError('email', { message: error });
  }, [error]);

  return (
    <div className={styles.sendEmail}>
      <div className={styles.sendEmail__title}>Forgot password</div>
      <div className={styles.sendEmail__subtitle}>Please enter your email to request a reset password.</div>
      <form className={styles.sendEmail__form} onSubmit={handleSubmit(onResetSubmit)}>
        <div className={styles.sendEmail__form__row}>
          <Input type="text" placeholder="Enter your email" label="Email" name={'email'} control={control} errors={errors}/>
        </div>
        <div className={styles.sendEmail__form__button}>
          <FullButton disabled={!isDirty} text="Send reset Password" type="submit"/>
        </div>
      </form>
      <div className={styles.sendEmail__signIn}>
        You remember your password?
        <Link href="/login">
          <span className={styles.sendEmail__signIn__button}>Sign in</span>
        </Link>
      </div>
    </div>
  )
};

export default SendEmailStep;