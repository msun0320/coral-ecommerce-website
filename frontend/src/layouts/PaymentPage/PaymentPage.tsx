import { useEffect, useState } from "react";
import { SpinnerLoading } from "../Utils/SpinnerLoading";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PaymentRequestModel from "../../models/PaymentRequestModel";

export const PaymentPage = () => {
  const [jwt, setJwt] = useState(JSON.parse(localStorage.getItem("jwt") || ""));
  const [httpError, setHttpError] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [total, setTotal] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      if (jwt) {
        const url = `${process.env.REACT_APP_API}/payments/user`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        };
        const paymentResponse = await fetch(url, requestOptions);
        if (!paymentResponse.ok) {
          throw new Error("Somgthing went wrong!");
        }
        const paymentResponseJson = await paymentResponse.json();
        setTotal(paymentResponseJson.amount);
      }
      setLoadingTotal(false);
    };
    fetchTotal().catch((error: any) => {
      setLoadingTotal(false);
      setHttpError(error.message);
    });
  }, [jwt]);

  const elements = useElements();
  const stripe = useStripe();

  async function checkout() {
    if (!stripe || !elements || !elements.getElement(CardElement)) {
      return;
    }

    setSubmitDisabled(true);

    let paymentRequestModel = new PaymentRequestModel(
      Math.round(total * 100),
      "USD"
    );

    const url = `${process.env.REACT_APP_API}/payments/payment-intent`;
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentRequestModel),
    };
    const stripeResponse = await fetch(url, requestOptions);
    if (!stripeResponse.ok) {
      setHttpError(true);
      setSubmitDisabled(false);
      throw new Error("Something went wrong!");
    }
    const stripeResponseJson = await stripeResponse.json();

    stripe
      .confirmCardPayment(
        stripeResponseJson.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        },
        { handleActions: false }
      )
      .then(async function (result: any) {
        if (result.error) {
          setSubmitDisabled(false);
          alert("There was an error");
        } else {
          const url = `${process.env.REACT_APP_API}/payments/payment-complete`;
          const requestOptions = {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          };
          const stripeResponse = await fetch(url, requestOptions);
          if (!stripeResponse.ok) {
            setHttpError(true);
            setSubmitDisabled(false);
            throw new Error("Something went wrong!");
          }
          setTotal(0);
          setSubmitDisabled(false);
        }
      });
    setHttpError(false);

    window.location.reload();
  }

  if (loadingTotal) {
    return <SpinnerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container-fluid mt-3">
        <h3 className="mb-4">Checkout</h3>
        <div className="row">
          <div className="col-md-6">
            <CardElement />
            <button
              disabled={submitDisabled}
              type="button"
              className="btn my-3 w-100"
              onClick={checkout}
            >
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order Summary</h5>
                <p className="card-text">Total: ${total}</p>
              </div>
            </div>
          </div>
        </div>

        {submitDisabled && <SpinnerLoading />}
      </div>
    </div>
  );
};
