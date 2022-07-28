import React, { useEffect } from 'react';
import Input from '../../../../components/Input/Input';
import { UserState } from '../../../../redux/user/userSlice';
import styles from './GeneralTab.module.scss';
import { useForm } from 'react-hook-form';
import moment from 'moment';

interface GeneralTabProps {
  user: UserState
}


type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
};

const GeneralTab = ({ user }: GeneralTabProps) => {
  const { control, formState: { errors }, setValue } = useForm<Inputs>({
    defaultValues: {
      firstName: user && user.firstName ? user.firstName : '',
      lastName: user && user.lastName ? user.lastName : '',
      email: user && user.email ? user.email : '',
    }
  });

  useEffect(() => {
    setValue('firstName', user.firstName);
    setValue('lastName', user.lastName);
    setValue('email', user.email);
  }, [user]);

  return (
    <div className={styles.general}>
      <div className={styles.general__title}>General</div>
      <form className={styles.general__form}>
        <div className={styles.general__form__row}>
          <Input type='text' control={control} errors={errors} name='firstName' label='First Name' placeholder='Enter First Name' disabled={true}></Input>
        </div>
        <div className={styles.general__form__row}>
          <Input type='text' control={control} errors={errors} name='lastName' label='Last Name' placeholder='Enter Last Name' disabled={true}></Input>
        </div>
        <div className={styles.general__form__row}>
          <Input type='text' control={control} errors={errors} name='email' label='Email' placeholder='Enter Email' disabled={true}></Input>
        </div>
        {user && user.paymentExpirationDate && <div className={styles.general__form__row}>
          <div>You subscribed until: {moment(user.paymentExpirationDate).format('MM-DD-YYYY')}</div>
        </div>}
      </form>
    </div>
  );

}

export default GeneralTab;
