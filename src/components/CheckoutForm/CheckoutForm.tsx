import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from './CheckoutForm.module.scss';
import { BASE_URL } from "../../constants";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [paymentError, setPaymentError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setPaymentError("Your payment was not successful, please try again.");
          break;
        default:
          setPaymentError("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {

        return_url: `${BASE_URL}/payment-success`,
      },
    });
    if (error.type === "card_error" || error.type === "validation_error") {
      // setPaymentError(error.message);
      setPaymentError("Payment failed! Please check your credit card details and try again.");
      // Lauri's request "Payment failed! Please check your credit card details and try again."
    } else {
      setPaymentError("Payment failed! Please check your credit card details and try again.");
    }

    setIsLoading(false);
  };


  const onFormReady = () => {
    setIsFormActive(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <PaymentElement onReady={onFormReady} className={styles.form__element}/>
      { isFormActive ? <>
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className={styles.form__spinner} id="spinner"></div> : "Pay $9 and upgrade"}
          </span>
        </button>
        {!paymentError && message && <div className={styles.form__message}>{message}</div>}
        {!message && paymentError && <div className={`${styles.form__message} ${styles.form__message__error}`}>{paymentError}</div>}
        <div className={styles.form__disclaimer}>Your subscription will automatically renew every month.</div>
      </> : <div className={styles.form__spinner} id="spinner"></div>}
    </form>
  );
}