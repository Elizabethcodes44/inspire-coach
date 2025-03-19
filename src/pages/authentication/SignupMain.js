import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';

const SignupMain = () => {
    const navigate = useNavigate();
    const [popup, setPopup] = useState({ message: "", type: "", isVisible: false, buttonLabel: "", buttonRoute: "" });
    
    // State for form fields and errors
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        userType: 'student'
    });

    const [errors, setErrors] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        termsAccepted: '',
        userType: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Focus the first input on mount
    useEffect(() => {
        document.getElementById('email').focus();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
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

        // First Name Validation
        if (!formData.firstName) {
            formErrors.firstName = 'First name is required';
            isValid = false;
        }

        // Last Name Validation
        if (!formData.lastName) {
            formErrors.lastName = 'Last name is required';
            isValid = false;
        }

        // Password Validation
        if (!formData.password) {
            formErrors.password = 'Password is required';
            isValid = false;
        } else if (formData.password.length < 8) {
            formErrors.password = 'Password must be at least 8 characters';
            isValid = false;
        }

        // Confirm Password Validation
        if (!formData.confirmPassword) {
            formErrors.confirmPassword = 'Confirm password is required';
            isValid = false;
        } else if (formData.confirmPassword !== formData.password) {
            formErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        // Terms and Conditions Validation
        if (!formData.termsAccepted) {
            formErrors.termsAccepted = 'You must provide your consent by checking above';
            isValid = false;
        }

        setErrors(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (validateForm()) {
            setIsLoading(true);
            const data = {
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.password,
                password_confirmation: formData.confirmPassword,
                userType: formData.userType
            };

            const apiUrl = process.env.REACT_APP_URL || 'http://172.191.191.154'; // Add a fallback URL
            console.log('API URL:', apiUrl); // Log the environment variable
    
            try {
                const response = await fetch(`${apiUrl}/api/users/coachsignup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    console.log('Registration successful:', result);
                    // Save the email to localStorage
                    localStorage.setItem('userEmail', formData.email);
    
                    setPopup({
                        message: "Registration successful! An OTP has been sent to your email",
                        type: "success",
                        isVisible: true,
                        buttonLabel: "Proceed to enter OTP received",
                        buttonRoute: "/otp",
                    });
                } else {
                    console.error('Registration failed:', result);
                    const errorMessages = Object.entries(result.errors)
                        .map(([key, messages]) => `${key}: ${messages.join(', ')}`)
                        .join('\n');
                    setPopup({
                        message: `Registration Failed: ${errorMessages}`,
                        type: "error",
                        isVisible: true,
                        buttonLabel: "Retry",
                        buttonRoute: "/signup",
                    });
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setPopup({
                    message: "An error occurred. Please try again.",
                    type: "error",
                    isVisible: true,
                    buttonLabel: "Retry",
                    buttonRoute: "/signup",
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
                                    <h3>Sign Up</h3>
                                    <p>
                                        Already have an account? <Link to="/login">Log in</Link>
                                    </p>
                                </div>

                                <p>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        placeholder="Email"
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        aria-describedby="email-error"
                                    />
                                    {errors.email && <span id="email-error" role="alert" style={{ color: 'red' }}>{errors.email}</span>}
                                </p>

                                <p>
                                    <label htmlFor="firstName">First Name</label>
                                    <input
                                        placeholder="First Name"
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        aria-describedby="firstName-error"
                                    />
                                    {errors.firstName && <span id="firstName-error" role="alert" style={{ color: 'red' }}>{errors.firstName}</span>}
                                </p>

                                <p>
                                    <label htmlFor="lastName">Last Name</label>
                                    <input
                                        placeholder="Last Name"
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        aria-describedby="lastName-error"
                                    />
                                    {errors.lastName && <span id="lastName-error" role="alert" style={{ color: 'red' }}>{errors.lastName}</span>}
                                </p>

                                <p>
                                    <label htmlFor="pass">Password</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            placeholder="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            id="pass"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            aria-describedby="password-error"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ marginLeft: '8px' }}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {errors.password && <span id="password-error" role="alert" style={{ color: 'red' }}>{errors.password}</span>}
                                </p>

                                <p>
                                    <label htmlFor="confirm-pass">Confirm Password</label>
                                    <input
                                        placeholder="Confirm Password"
                                        type="password"
                                        id="confirm-pass"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        aria-describedby="confirm-password-error"
                                    />
                                    {errors.confirmPassword && <span id="confirm-password-error" role="alert" style={{ color: 'red' }}>{errors.confirmPassword}</span>}
                                </p>

                                <p>
                                    <label htmlFor="userType">I am a</label>
                                    <select
                                        id="userType"
                                        name="userType"
                                        value={formData.userType}
                                        onChange={handleInputChange}
                                        aria-describedby="userType-error"
                                    >
                                        <option value="student">Student</option>
                                        <option value="coach">Coach</option>
                                    </select>
                                    {errors.userType && <span id="userType-error" role="alert" style={{ color: 'red' }}>{errors.userType}</span>}
                                </p>

                                <div className="back-check-box">
                                    <input
                                        type="checkbox"
                                        id="box-1"
                                        name="termsAccepted"
                                        checked={formData.termsAccepted}
                                        onChange={handleInputChange}
                                    />
                                    <p>I agree to the <em>terms and conditions</em></p>
                                </div>
                                <p>{errors.termsAccepted && <span className="error" style={{ color: 'red' }}>{errors.termsAccepted}</span>}</p>

                                <button type="submit" id="button" name="submit" disabled={isLoading}>
                                    {isLoading ? 'Registering...' : 'Register'}
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

export default SignupMain;
