import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({handlePayClick}: any) {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/404`,
      },
      redirect: "if_required"
    });

    if (error) {
        console.log(error);
      if(error.type){
        if(error.type == "validation_error"){
            setMessage(error.message);
        }
      }
    } 
    else if(paymentIntent && paymentIntent.status === "succeeded"){
      handlePayClick(paymentIntent);
    }
    else {
      // handlePayClick("An unexpected error occured.");
      setMessage("An unexpected error occured.");
    }
    setIsProcessing(false);
  };

  return (
    <div className="border shadow rounded p-4">
        <form id="payment-form" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" />
            <div className="text-center">
                <button className="btn bg-primary-color text-white mt-3" disabled={isProcessing || !stripe || !elements} id="submit">
                    <span id="button-text">
                    {isProcessing ? "Processing ... " : "Pay now"}
                    </span>
                </button>
            </div>
            {/* Show any error or success messages */}
            {message && <div style={{color: "#990000"}} id="payment-message">{message}</div>}
        </form>
    </div>
  );
}