import React from "react";
import styles from "./FullButton.module.scss";

interface FullButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const FullButton = ({ text, type = 'button', onClick = () => {} }: FullButtonProps) => (
  <button onClick={onClick} type={type} className={styles.fullButton}>
    {text}
  </button>
);

export default FullButton;
