import React from 'react';

import checkIcon from "../../../public/circle_check.png";
import styles from './MessagePopup.module.scss';
import { useAppSelector } from '../../hooks/redux.hooks';
import { selectMessage } from "../../redux/message/message";
import Image from "next/image";

const MessagePopup = () => {
    const message = useAppSelector(selectMessage);

    return (
        <div className={styles.popup}>
            <div className={styles.popup__container}>
                <Image src={checkIcon} alt="ok"/>
                <div className={styles.popup__message}>{ message }</div>
            </div>
        </div>
    );
}

export default MessagePopup;
