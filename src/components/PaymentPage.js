import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import paybg from "../assets/paybg.jpeg";
import "./../styles/PaymentPage.css";

const PaymentPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const savedPoints = localStorage.getItem("gamePoints") || 0;

    setPoints(parseInt(savedPoints));

    const calculatedTotalPrice = savedCart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    setTotalPrice(calculatedTotalPrice);
    setDiscountedPrice(calculatedTotalPrice - savedPoints);
  }, []);

  const handleApprove = (orderID) => {
    console.log("Payment successful! Order ID:", orderID);
    alert("Payment Successful! Order ID: " + orderID);
    navigate("/thank-you");
  };

  const initialOptions = {
    "client-id": "ARbP9DI6eIb7gVOCNqUa2BUIYYqZ-IfSkHQsk1c-6EZgb1w9Q3xF26NmBseHNwmE4lZRPVwtBDez3ete", // Your PayPal client ID
    currency: "USD",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <div className="payment-page-container"
      style={{
        backgroundImage: `url(${paybg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "20px",
      }}>
        <h2 className="payment-heading">Complete Your Payment</h2>
        <div className="payment-summary">
          <div className="price-summary">
            <p className="summary-item">
              <span className="summary-label">Total Price: </span>
              ₹{totalPrice}
            </p>
            <p className="summary-item">
              <span className="summary-label">Points Earned: </span>
              {points}
            </p>
            <div className="use-points">
              <label className="use-points-label">
                <input
                  type="checkbox"
                  checked={usePoints}
                  onChange={(e) => setUsePoints(e.target.checked)}
                />
                Use points to reduce total price
              </label>
              {usePoints && (
                <p className="discounted-price">
                  <span className="summary-label">Discounted Price: </span>
                  ₹{discountedPrice >= 0 ? discountedPrice : 0}
                </p>
              )}
            </div>
          </div>

          <div className="payment-button-container">
            <h3>Pay via PayPal</h3>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                const amountToPay = usePoints
                  ? discountedPrice / 82.5 // Convert to USD (approx INR to USD conversion rate)
                  : totalPrice / 82.5;

                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amountToPay.toFixed(2), // Format to two decimal places
                      },
                    },
                  ],
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then((details) => {
                  const orderID = details.id;
                  handleApprove(orderID);
                });
              }}
              onError={(err) => {
                console.error("Payment Error:", err);
                alert("Payment failed. Please try again.");
              }}
            />
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};

export default PaymentPage;
