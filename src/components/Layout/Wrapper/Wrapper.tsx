import React from "react";
import styles from "./Wrapper.module.scss";

interface WrapperProps {
  className?: string;
  children: React.ReactNode;
}

const Wrapper = ({ className, children }: WrapperProps) => {
  return (
    <div className={`${styles.wrapper} ${className || ''}`}>
      <div className={styles.wrapper__container}>
        { children }
      </div>
    </div>
  );
}

export default Wrapper;
