import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/cartbg.jpeg";
import "./../styles/CartPage.css";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [points, setPoints] = useState(0); // Points earned from the game
    const [usePoints, setUsePoints] = useState(false); // Whether points are used to discount
    const [totalPrice, setTotalPrice] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);
    const navigate = useNavigate();

    // Load cart and points from localStorage on component mount
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);

        const savedPoints = parseInt(localStorage.getItem("gamePoints")) || 0;
        setPoints(savedPoints);

        const calculatedTotalPrice = savedCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalPrice(calculatedTotalPrice);
    }, []);

    // Update discounted price whenever points, total price, or usePoints changes
    useEffect(() => {
        const newDiscountedPrice = usePoints
            ? Math.max(0, totalPrice - points) // Ensure non-negative discounted price
            : totalPrice;
        setDiscountedPrice(newDiscountedPrice);
    }, [points, totalPrice, usePoints]);

    // Remove an item from the cart
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        const updatedTotalPrice = updatedCart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotalPrice(updatedTotalPrice);
    };

    // Navigate to the payment page on checkout
    const handleCheckout = () => {
        navigate("/payment");
    };

    return (
        <div
            className="cart-container"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <h2>Your Cart</h2>
            {cart.length > 0 ? (
                cart.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="cart-item-image"
                        />
                        <div className="cart-item-details">
                            <h3>{item.name}</h3>
                            <p>Price: ₹{item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="remove-btn"
                        >
                            Remove
                        </button>
                    </div>
                ))
            ) : (
                <p>Your cart is empty.</p>
            )}

            <div className="cart-summary">
                <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
                <p>Points Earned: {points}</p>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={usePoints}
                            onChange={(e) => setUsePoints(e.target.checked)}
                        />
                        Use points to deduct from total price
                    </label>
                </div>
                {usePoints && (
                    <p>
                        Discounted Price after using points: ₹
                        {discountedPrice.toFixed(2)}
                    </p>
                )}
                <button onClick={handleCheckout} className="checkout-btn">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default CartPage;
