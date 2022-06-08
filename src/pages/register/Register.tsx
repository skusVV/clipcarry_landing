import type { NextPage } from "next";
import { useState } from "react";
import { useAppDispatch } from "../../hooks/redux.hooks";
import { registerUser, testRd } from "../../redux/user/userSlice";
import styles from "./Register.module.scss";

const RegisterPage: NextPage = () => {
  const dispatch = useAppDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onRegisterClick = () => {
    dispatch(testRd());
    dispatch(registerUser({
      email,
      password,
      lastName,
      firstName,
    }));
  }

  return (
    <div>
      <h2>hello on Register page</h2>
      <div>
        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        <input type="text" placeholder="Last Name"  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        <input type="text" placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>

      </div>
      <button onClick={onRegisterClick}>Register</button>
    </div>
  )
}

export default RegisterPage
