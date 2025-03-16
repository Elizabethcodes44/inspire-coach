import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Popup.css"; // Assuming the styles are in Popup.css

const Popup = ({ message, type, onClose, buttonLabel, buttonRoute, onAction, children }) => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");  // For capturing input from the user

  const handleButtonClick = () => {
    if (onAction) onAction(inputValue);  // Pass the input value when the action is triggered
    if (buttonRoute) navigate(buttonRoute);
    onClose();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className={`popup-box ${type === "success" ? "popup-success" : type === "error" ? "popup-error" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="popup-close" onClick={onClose}>
          &times;
        </button>
        <div className="popup-message">{message}</div>
        
        {/* If children (input area) is passed, render it */}
        {children && (
          <div className="popup-input-container">
            {children}
          </div>
        )}

        {buttonLabel && (
          <button className="popup-action-button" onClick={handleButtonClick}>
            {buttonLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
