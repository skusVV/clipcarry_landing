import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from "../Input/Input";
import styles from "./LoginForm.module.scss";
import FullButton from "../FullButton/FullButton";
import Link from "next/link";
import { loginUser, selectError } from "../../redux/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { useRouter } from "next/router";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email('Please enter valid email').required('Email is required'),
  password: yup.string().required('Password is required')
});

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector(selectError);

  const { formState: {errors}, handleSubmit, control, setError } = useForm<Inputs>({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onLoginSubmit = (data) => {
    dispatch(loginUser(data, () => {
      router.push('/home');
    }));
  }

  useEffect(() => {
    setError('email', { message: error });
    setError('password', { message: error });
  }, [error]);

  return (
    <div className={styles.login}>
      <div className={styles.login__title}>Login</div>  {/* on design we have title Create your account!. It's a bit strange */}
      <form className={styles.login__form} onSubmit={handleSubmit(onLoginSubmit)}>
        <div className={styles.login__form__row}>
          <Input type="text" placeholder="Email" label="Email" name={'email'} control={control} errors={errors}/>
        </div>
        <div className={styles.login__form__row}>
          <Input type="password" placeholder="Enter your password" showEye label="Password" name={'password'} control={control} errors={errors}/>
          <div className={styles.login__form__row__action}>Forgot password?</div> {/* Todo: add forgot password page */}
        </div>
        <div className={styles.login__form__button}>
          <FullButton text="Sign In" type="submit"/>
        </div>
      </form>
      <div className={styles.login__signUp}>
        Don't have an account?
        <Link href="/register">
          <span className={styles.login__signUp__button}>Sign up</span>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
