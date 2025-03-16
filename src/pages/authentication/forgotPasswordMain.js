import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Popup from '../../components/Popup/Popup'
import ForgotPassword from './forgotPassword';

const ForgotPasswordMain = () => {
    const navigate = useNavigate();
    const [popup, setPopup] = useState({ message: "", type: "", isVisible: false, buttonLabel: "", buttonRoute: "" });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // State for form fields and errors
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        // Email Validation
        if (!formData.email) {
            formErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            formErrors.email = 'Email is invalid';
            isValid = false;
        }

        // Password Validation
        if (!formData.password) {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 6) {
            formErrors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data before submitting
        if (validateForm()) {
            setIsLoading(true);
            const data = {
                email: formData.email,                
                password: formData.password,
            };

            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/confirm-user`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    console.log('Login successful:', result);
                    // Save the token to localStorage
                    localStorage.setItem('authToken', result.token);
    
                    setPopup({
                        message: "forgot password successful!",
                        type: "success",
                        isVisible: true,
                        buttonLabel: "Proceed to your application Dashboard",
                        buttonRoute: "/login",
                    });
                } else {
                    console.error('Login failed:', result);
                    const errorMessages = result.message
                    setPopup({
                        message: `Login Failed: ${errorMessages}`,
                        type: "error",
                        isVisible: true,
                        buttonLabel: "Retry",
                        buttonRoute: "/login",
                    });
                }
            } catch (error) {
                console.error('Error during Login:', error);
                setPopup({
                    message: "An error occurred. Please try again.",
                    type: "error",
                    isVisible: true,
                    buttonLabel: "Retry",
                    buttonRoute: "/login",
                });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <div className="react-login-page react-signup-page pt---120 pb---120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="login-right-form">
                            <form onSubmit={handleSubmit}>
                                <div className="login-top">
                                    <h3>Forgot Password</h3>
                                    <p>Don't have an account yet? <a href="/signup">Sign up for free</a></p>
                                </div>

                                <p>
                                    <label>Email</label>
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.email && <span className="error"  style={{color: "red"}}>{errors.email}</span>}
                                </p>

                             

                          

                             

                                <button type="submit" id="button" name="submit" disabled={isLoading}>
                                {isLoading ? 'Sending you OTP...' : 'Forgo Password'}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {popup.isVisible && (
                <Popup
                    message={popup.message}
                    type={popup.type}
                    onClose={() => setPopup({ ...popup, isVisible: false })}
                    buttonLabel={popup.buttonLabel}
                    buttonRoute={popup.buttonRoute}
                />
            )}
        </div>
    );
};

export default ForgotPasswordMain;
