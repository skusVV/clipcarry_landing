import type { NextPage } from 'next'
import Benefits from '../components/Benefits/Benefits';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Layout from '../components/Layout/Layout'
import Pricing from '../components/Pricing/Pricing';
import MessagePopup from "../components/messagePopup/MessagePopup";
import {useAppDispatch, useAppSelector} from "../hooks/redux.hooks";
import {selectIsOpen, showMessagePopup} from "../redux/message/message";
import {useEffect} from "react";
import {isArray} from "lodash";
import {LOCAL_STORAGE_REGISTRATION_PROMOCODE} from "../constants";
import {useRouter} from "next/router";

const HomePage: NextPage = () => {
    const router = useRouter();
    const isMessageOpen = useAppSelector(selectIsOpen);
    const dispatch = useAppDispatch();
    const { invite } = router.query;

    useEffect(() => {
        if (invite) {
            const promoCode = isArray(invite) ? invite[0] : invite;
            localStorage.setItem(LOCAL_STORAGE_REGISTRATION_PROMOCODE, promoCode);
        }
    }, [invite]);

    useEffect(() => {
        if (invite) {
            dispatch(showMessagePopup({ message: 'One Year Discount has been applied. Please, register to proceed!' }));
        }
    });

  return (
    <Layout>
      <Jumbotron />
      <Benefits />
      <Pricing />
        { isMessageOpen && <MessagePopup />}
    </Layout>
  )
}

export default HomePage
