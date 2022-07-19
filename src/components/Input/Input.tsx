import React, { useState } from "react";
import { Control, FieldError, UseFormRegisterReturn } from "react-hook-form";
import styles from "./Input.module.scss";

const PASSWORD = 'password';
const TEXT = 'text';

interface InputProps {
  type: "text" | "password" | "number" | "email";
  label: string;
  placeholder: string;
  name: string;
  control?: Control<any, any>;
  required?: boolean;
  showEye?: boolean;
  disabled?: boolean;
  errors?: {
    [keys: string]: FieldError;
  };
}

const Input = ({ label, type, name, required, placeholder, disabled, errors, control: { register }, showEye = false}: InputProps) => {

  const [ inputType, setInputType ] = useState(type);

  const getError = () => {
    return errors[name]?.message || '';
  };

  const handleEyeClick = () => {
    const newType = inputType === PASSWORD ? TEXT : type;
    setInputType(newType);
  }

  const getEyeIcon = () => {
    if (inputType === PASSWORD) {
      return (<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12.005C10.5304 12.005 11.0391 11.7943 11.4142 11.4192C11.7893 11.0441 12 10.5354 12 10.005C12 9.47457 11.7893 8.96586 11.4142 8.59079C11.0391 8.21572 10.5304 8.005 10 8.005C9.46957 8.005 8.96086 8.21572 8.58579 8.59079C8.21071 8.96586 8 9.47457 8 10.005C8 10.5354 8.21071 11.0441 8.58579 11.4192C8.96086 11.7943 9.46957 12.005 10 12.005Z"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M0.458008 10.005C1.73201 5.948 5.52201 3.005 10 3.005C14.478 3.005 18.268 5.948 19.542 10.005C18.268 14.062 14.478 17.005 10 17.005C5.52201 17.005 1.73201 14.062 0.458008 10.005ZM14 10.005C14 11.0659 13.5786 12.0833 12.8284 12.8334C12.0783 13.5836 11.0609 14.005 10 14.005C8.93914 14.005 7.92173 13.5836 7.17158 12.8334C6.42143 12.0833 6.00001 11.0659 6.00001 10.005C6.00001 8.94414 6.42143 7.92672 7.17158 7.17658C7.92173 6.42643 8.93914 6.005 10 6.005C11.0609 6.005 12.0783 6.42643 12.8284 7.17658C13.5786 7.92672 14 8.94414 14 10.005Z"/>
        </svg>);
    } else {
      return (<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M4.07099 2.7665C3.89616 2.59547 3.662 2.50083 3.41894 2.50297C3.17589 2.5051 2.94338 2.60385 2.77151 2.77794C2.59964 2.95203 2.50215 3.18753 2.50004 3.43371C2.49792 3.6799 2.59136 3.91708 2.76022 4.09417L15.7382 17.2394C15.913 17.4104 16.1472 17.505 16.3902 17.5029C16.6333 17.5008 16.8658 17.402 17.0377 17.2279C17.2095 17.0538 17.307 16.8183 17.3091 16.5721C17.3113 16.326 17.2178 16.0888 17.049 15.9117L15.6835 14.5286C17.1273 13.3626 18.195 11.7869 18.75 10.0029C17.569 6.19364 14.0557 3.43033 9.90459 3.43033C8.45146 3.42834 7.01838 3.77385 5.72198 4.43876L4.07192 2.7665H4.07099ZM8.02093 6.7664L9.42441 8.18889C9.73874 8.10434 10.0695 8.1049 10.3835 8.19052C10.6976 8.27613 10.9839 8.4438 11.2139 8.67674C11.4439 8.90967 11.6094 9.19971 11.6939 9.51781C11.7785 9.83591 11.779 10.1709 11.6955 10.4893L13.099 11.9109C13.5171 11.1935 13.6878 10.3558 13.5844 9.5294C13.481 8.70302 13.1093 7.9349 12.5278 7.34589C11.9463 6.75688 11.188 6.38039 10.3721 6.27566C9.55623 6.17092 8.72914 6.34389 8.02093 6.76733V6.7664Z"/>
        <path d="M12.5 15.9622L9.96415 13.3667C9.05231 13.3083 8.19265 12.9114 7.54653 12.2505C6.9004 11.5896 6.51223 10.7101 6.45486 9.7772L3.01027 6.25293C2.21802 7.21821 1.61983 8.33402 1.25 9.53637C2.44477 13.4291 6.00002 16.2529 10.1986 16.2529C10.9929 16.2529 11.7638 16.1522 12.5 15.9622Z"/>
      </svg>);
    }
  }

  return (
    <div className={styles.input}>
      <div className={`${styles.input__label} ${required ? styles.input__label__required : ''}`}>{label}</div>
      <input className={`
                ${styles.input__field}
                ${getError() ? styles.error : ''}
                ${type === PASSWORD ? styles.input__field__eye : ''}
             `}
             placeholder={placeholder}
             disabled={disabled}
             type={inputType}
             name={name}
             {...register(name)}/>

      { getError() && <div className={styles.input__error}>{getError()}</div> }

      { showEye && <div className={styles.input__eye} onClick={handleEyeClick}>{getEyeIcon()}</div> }
    </div>
  )
}

export default Input;
