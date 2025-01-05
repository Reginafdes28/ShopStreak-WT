import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/HomePage.css";

const productsData = [
    {
        category: "Electronics",
        items: [
            { id: 1, name: "Smartphone", price: 150000, image: "/photos/phone.jpeg", description: "Latest model with high-end specs." },
            { id: 2, name: "Laptop", price: 74000, image: "/photos/laptop.jpeg", description: "A powerful laptop for work and gaming." },
            { id: 3, name: "Headphones", price: 5000, image: "/photos/headphones.jpeg", description: "Noise-canceling over-ear headphones." },
        ],
    },
    {
        category: "Clothing",
        items: [
            { id: 4, name: "T-Shirt", price: 500, image: "/photos/tshirt.jpeg", description: "Comfortable cotton T-shirt available in all sizes." },
            { id: 5, name: "Jeans", price: 800, image: "/photos/jeans.jpeg", description: "Stylish blue jeans that match with anything." },
            { id: 6, name: "Jacket", price: 1000, image: "/photos/jacket.jpeg", description: "Warm jacket for winter days." },
        ],
    },
    {
        category: "Home Appliances",
        items: [
            { id: 7, name: "Microwave", price: 10000, image: "/photos/microwave.jpeg", description: "Efficient microwave oven for fast cooking." },
            { id: 8, name: "Vacuum Cleaner", price: 8000, image: "/photos/vaccumcleaner.jpeg", description: "High-power vacuum cleaner for deep cleaning." },
            { id: 9, name: "Air Conditioner", price: 30000, image: "/photos/ac.jpeg", description: "Air conditioner with energy-saving technology." },
        ],
    },
];

const HomePage = () => {
    const [cart, setCart] = useState(
        JSON.parse(localStorage.getItem("cart")) || []
    );
    const [selectedProduct, setSelectedProduct] = useState(null); // For product description modal
    const navigate = useNavigate();

    const addToCart = (product) => {
        const updatedCart = [...cart];
        const productIndex = updatedCart.findIndex((item) => item.id === product.id);

        if (productIndex !== -1) {
            updatedCart[productIndex].quantity += 1;
        } else {
            updatedCart.push({ ...product, quantity: 1 });
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(`${product.name} added to cart!`);
    };

    const handleShare = () => {
        navigate("/game"); // Navigate to GamePage.js
    };

    const openProductDetails = (product) => {
        setSelectedProduct(product);
    };

    const closeProductDetails = () => {
        setSelectedProduct(null);
    };

    return (
        <div
            className="home-container"
            style={{
                backgroundImage: "url('/photos/bg1.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
            }}
        >
            <h1 className="welcome-text">Welcome to ShopStreak</h1>
            <p>Your one-stop shop for everything!</p>

            <button onClick={handleShare} className="share-btn">
                Share ShopStreak and Play Game
            </button>

            {productsData.map((category) => (
                <div key={category.category} className="category-section">
                    <h2>{category.category}</h2>
                    <div className="products">
                        {category.items.map((product) => (
                            <div key={product.id} className="product-card">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="product-image"
                                    onClick={() => openProductDetails(product)} // Open description on click
                                />
                                <h3>{product.name}</h3>
                                <p>Price: ₹{product.price}</p>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="add-to-cart-btn"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {/* Product Details Modal */}
            {selectedProduct && (
                <div className="product-details-modal">
                    <div className="modal-content">
                        <button className="close-btn" onClick={closeProductDetails}>
                            X
                        </button>
                        <h3>{selectedProduct.name}</h3>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.name}
                            className="modal-image"
                        />
                        <p>{selectedProduct.description}</p>
                        <p><strong>Price:</strong> ₹{selectedProduct.price}</p>
                        <button
                            onClick={() => addToCart(selectedProduct)}
                            className="add-to-cart-btn"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            )}

            {/* Contact Details */}
            <footer className="contact-footer">
                <h3>Contact Us</h3>
                <p>Email: support@shopstreak.com</p>
                <p>Phone: +1 234 567 890</p>
                <p>Address: 123 ShopStreet, Shopping City</p>
            </footer>
        </div>
    );
};

export default HomePage;
