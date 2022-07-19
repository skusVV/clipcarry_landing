import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import FullButton from '../../../../components/FullButton/FullButton';
import Input from '../../../../components/Input/Input';
import { showMessagePopup } from '../../../../redux/message/message';
import { useAppDispatch, useAppSelector } from '../../../../hooks/redux.hooks';
import { changeUserPassword, selectError } from '../../../../redux/user/userSlice';
import styles from './PasswordTab.module.scss';

type Inputs = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

const schema = yup.object().shape({
  old_password: yup.string().required('Field is required'),
  new_password: yup.string().required('Field is required.').min(8, 'Must be at least 8 characters.'),
  confirm_password: yup.string().oneOf([yup.ref('new_password')], "Both password must match.").required('Field is required.')
});

const PasswordTab = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  const { formState: {errors, isDirty}, handleSubmit, control, setError, reset } = useForm<Inputs>({
    resolver: yupResolver(schema),
    reValidateMode: 'onBlur'
  })

  const onSubmit = (data: Inputs) => {
    dispatch(changeUserPassword({
      oldPassword: data.old_password,
      newPassword: data.new_password,
      callback: () => {
        reset();
        dispatch(showMessagePopup({ message: 'Your password was successfully changed!' }));
      }
    }));
  }

  useEffect(() => {
    setError('old_password', { message: error });
  }, [error]);


  return (
    <div className={styles.password}>
      <div className={styles.password__title}>Set Password</div>
      <form className={styles.password__form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.password__form__row}>
          <Input showEye={true} type='password' control={control} errors={errors} name='old_password' label='Old Password' placeholder='Enter old password'></Input>
        </div>
        <div className={styles.password__form__row}>
          <Input showEye={true} type='password' control={control} errors={errors} name='new_password' label='New Password' placeholder='Enter new password'></Input>
        </div>
        <div className={styles.password__form__row}>
          <Input showEye={true} type='password' control={control} errors={errors} name='confirm_password' label='Confirm New Password' placeholder='Confirm new password'></Input>
        </div>

        <div className={styles.password__form__button}>
          <FullButton disabled={!isDirty} text="Save Password" type="submit"/>
        </div>
      </form>
    </div>
  );
};

export default PasswordTab;
