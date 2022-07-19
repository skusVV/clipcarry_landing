import React from "react";
import { useAppSelector } from "../../hooks/redux.hooks";
import { selectIsOpen } from "../../redux/message/message";
import MessagePopup from "../messagePopup/MessagePopup";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Main from "./Main/Main";

const Layout = ({ children }) => {
  const isMessageOpen = useAppSelector(selectIsOpen);

  return (
    <>
      <Header />
      <Main>
        {children}
      </Main>
      { isMessageOpen && <MessagePopup />}
      <Footer />
    </>
  )
};

export default Layout;
