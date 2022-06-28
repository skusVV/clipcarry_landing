import React, { useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Input from "../Input/Input";
import styles from "./RegisterForm.module.scss";
import FullButton from "../FullButton/FullButton";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hooks";
import { registerUser, selectError } from "../../redux/user/userSlice";
import { useRouter } from "next/router";
import {showMessagePopup} from "../../redux/message/message";


type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  firstName: yup.string().required('First name is Required'),
  lastName: yup.string().required('Last name is Required'),
  email: yup.string().email('Please enter valid email').required('Email is required'),
  password: yup.string().required('Password is required')
  // Todo: discuss about password pattern
  // password: yup
  //   .string()
  //   .required('Please Enter your password')
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  //   ),
});

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const error = useAppSelector(selectError);

  const { formState: { errors }, handleSubmit, control, setError } = useForm<Inputs>({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  useEffect(() => {
    setError('email', { message: error });
  }, [error]);

  const onRegisterSubmit = (data) => {
    dispatch(registerUser(data, () => {
      router.push('/payment');
      // dispatch(showMessagePopup({ message: 'You have been successfully registered and logged in.' }));
    }));
  }

  return (
    <div className={styles.register}>
      <div className={styles.register__title}>Create your account!</div>
      <form className={styles.register__form} onSubmit={handleSubmit(onRegisterSubmit)}>
        <div className={styles.register__form__row}>
          <div className={styles.register__form__col}>
            <Input type="text" placeholder="First name" label="First name" name={'firstName'} control={control} errors={errors}/>
          </div>
          <div className={styles.register__form__col}>
            <Input type="text" placeholder="Last name" label="Last name" name={'lastName'} control={control} errors={errors}/>
          </div>
        </div>
        <div className={styles.register__form__row}>
          <Input type="text" placeholder="Email" label="Email" name={'email'} control={control} errors={errors}/>
        </div>
        <div className={styles.register__form__row}>
          <Input type="password" placeholder="Enter your password" showEye label="Password" name={'password'} control={control} errors={errors}/>
        </div>
        <div className={styles.register__form__button}>
          <FullButton text="Get Started" type="submit"/>
        </div>
      </form>
      <div className={styles.register__signIn}>
        Already have an account?
        <Link href="/login">
          <span className={styles.register__signIn__button}>Sign in</span>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
