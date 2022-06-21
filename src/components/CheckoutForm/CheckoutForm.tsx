import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import styles from './CheckoutForm.module.scss';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
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
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
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

        return_url: "http://localhost:3000/payment-success",
      },
    });
    // Payment failed! Please check your credit card details and try again.

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
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
        {message && <div className={styles.form__message}>{message}</div>}
        <div className={styles.form__disclaimer}>Your subscription will automatically renew every month.</div>
      </> : <div className={styles.form__spinner} id="spinner"></div>}
    </form>
  );
}