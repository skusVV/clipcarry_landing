import React from 'react';
import styles from './CheckEmail.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import { selectUserEmail, sendResetPasswordEmail } from '../../../../redux/user/userSlice';

const CheckEmailStep = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector(selectUserEmail);

  const onResendClick = () => {
    // we should add here some timer to prevent spam attack
    dispatch(sendResetPasswordEmail({
      email,
      callback: () => {}
    }));
  };

  return (
    <div className={styles.checkEmail}>
      <div className={styles.checkEmail__title}>Check your email</div>
      <div className={styles.checkEmail__subtitle}>We've sent an email to <b>{email}</b>. Click the link in the email to reset your password. Be sure to check the spam folder. If you don't see the email you can resend one.</div>

      <div onClick={onResendClick} className={styles.checkEmail__resend}>
        Resend reset link
      </div>
    </div>
  )
};

export default CheckEmailStep;