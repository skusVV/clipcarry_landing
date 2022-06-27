import type { NextPage } from 'next'
import Benefits from '../components/Benefits/Benefits';
import Jumbotron from '../components/Jumbotron/Jumbotron';
import Layout from '../components/Layout/Layout'
import Pricing from '../components/Pricing/Pricing';
import MessagePopup from "../components/messagePopup/MessagePopup";
import {useAppSelector} from "../hooks/redux.hooks";
import {selectIsOpen} from "../redux/message/message";

const HomePage: NextPage = () => {
    const isMessageOpen = useAppSelector(selectIsOpen);
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
