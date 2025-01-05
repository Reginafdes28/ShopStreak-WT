import React, { useState, useEffect } from "react";
import background from "../assets/gamebg.jpeg";
import "./../styles/GamePage.css";

const GamePage = () => {
    const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [points, setPoints] = useState(0);

    // Generate a random number between 1 and 100
    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Load points from localStorage on page load
    useEffect(() => {
        const savedPoints = parseInt(localStorage.getItem("gamePoints")) || 0;
        setPoints(savedPoints);
    }, []);

    // Save points to localStorage and notify other components
    const updatePoints = (newPoints) => {
        setPoints(newPoints);
        localStorage.setItem("gamePoints", newPoints);

        // Dispatch a custom event to notify other components
        const pointsUpdatedEvent = new Event("gamePointsUpdated");
        window.dispatchEvent(pointsUpdatedEvent);
    };

    // Handle guess submission
    const handleGuess = () => {
        const userGuess = parseInt(guess);

        if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
            setMessage("Please enter a valid number between 1 and 100.");
            return;
        }

        if (userGuess === randomNumber) {
            const newPoints = points + 10;
            updatePoints(newPoints);
            setMessage(`Correct! You guessed the number: ${randomNumber}`);
            setRandomNumber(generateRandomNumber());
            setGuess("");
            alert("You earned 10 points! Points have been updated in your cart.");
        } else if (userGuess < randomNumber) {
            setMessage("Too low! Try again.");
        } else {
            setMessage("Too high! Try again.");
        }
    };

    // Handle sharing the link
    const handleShare = async () => {
        const shareData = {
            title: "Number Guessing Game",
            text: "Join me in playing this fun Number Guessing Game!",
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                alert("Thanks for sharing!");
                updatePoints(points + 5); // Add 5 points for sharing
            } else {
                // Fallback for desktop browsers
                navigator.clipboard.writeText(window.location.href);
                alert("Link copied to clipboard! Thanks for sharing.");
                updatePoints(points + 5); // Add 5 points for sharing
            }
        } catch (err) {
            console.error("Error sharing:", err);
        }
    };

    // Handle game restart
    const restartGame = () => {
        setRandomNumber(generateRandomNumber());
        setGuess("");
        setMessage("");
    };

    return (
        <div className="game-container"
        style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            padding: "20px",
          }}>
            <h2>Number Guessing Game</h2>
            <p>Guess the number between 1 and 100. Earn points for each correct guess!</p>

            <div className="game-input">
                <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Enter your guess"
                />
                <button onClick={handleGuess}>Submit Guess</button>
            </div>

            {message && <p className="game-message">{message}</p>}
            <p className="game-points">Points: {points}</p>

            <button className="share-button" onClick={handleShare}>
                Share Link and Earn 5 Points
            </button>

            <button className="restart-button" onClick={restartGame}>
                Restart Game
            </button>
        </div>
    );
};

export default GamePage;
