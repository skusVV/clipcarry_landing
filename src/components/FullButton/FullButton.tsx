import React from "react";
import styles from "./FullButton.module.scss";

interface FullButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

const FullButton = ({ disabled, text, type = 'button', onClick = () => {} }: FullButtonProps) => (
  <button disabled={disabled} onClick={onClick} type={type} className={styles.fullButton}>
    {text}
  </button>
);

export default FullButton;
