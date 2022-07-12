import React, { useEffect } from 'react';
import FullButton from '../../../../components/FullButton/FullButton';
import Input from '../../../../components/Input/Input';
import styles from './SetPassword.module.scss';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import { resetUserPassword, selectError } from '../../../../redux/user/userSlice';

type Inputs = {
  new_password: string;
  confirm_password: string;
};

const schema = yup.object().shape({
  new_password: yup.string().required('Field is required.').min(8, 'Must be at least 8 characters.'),
  confirm_password: yup.string().oneOf([yup.ref('new_password')], "Both password must match.").required('Field is required.')
});

interface SetPasswordStepProps {
  passwordResetKey: string;
}

const SetPasswordStep = ({ passwordResetKey }: SetPasswordStepProps) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const { formState: {errors, isDirty}, handleSubmit, control, setError } = useForm<Inputs>({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onResetSubmit = (data) => {
    dispatch(resetUserPassword({
      resetPasswordKey: passwordResetKey,
      password: data.new_password,
      callback: () => {
        router.push('/login');
      }
    }));
  };

  useEffect(() => {
    setError('confirm_password', { message: error });
  }, [error]);

  return (
    <div className={styles.setPassword}>
      <div className={styles.setPassword__title}>Create new password</div>
      <div className={styles.setPassword__subtitle}>Your new password must be different from previous used password.</div>

      <form className={styles.setPassword__form} onSubmit={handleSubmit(onResetSubmit)}>
        <div className={styles.setPassword__form__row}>
          <Input showEye={true} type="password" placeholder="Enter your new password" label="New Password" name={'new_password'} control={control} errors={errors}/>
        </div>
        <div className={styles.setPassword__form__row}>
          <Input showEye={true} type="password" placeholder="Enter confirm password" label="Confirm Password" name={'confirm_password'} control={control} errors={errors}/>
        </div>
        <div className={styles.setPassword__form__button}>
          <FullButton disabled={!isDirty} text="Reset Password" type="submit"/>
        </div>
      </form>
    </div>
  )
};

export default SetPasswordStep;