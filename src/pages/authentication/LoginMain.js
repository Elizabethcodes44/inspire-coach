import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Popup from '../../components/Popup/Popup'

const LoginMain = () => {
    const navigate = useNavigate();
    const [popup, setPopup] = useState({ message: "", type: "", isVisible: false, buttonLabel: "", buttonRoute: "" });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // State for form fields and errors
    const [formData, setFormData] = useState({
        Email: '',
        Password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({
        Email: '',
        Password: '',
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
        if (!formData.Email) {
            formErrors.Email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
            formErrors.Email = 'Email is invalid';
            isValid = false;
        }

        // Password Validation
        if (!formData.Password) {
            formErrors.Password = 'Password is required';
            isValid = false;
        } else if (formData.Password.length < 6) {
            formErrors.Password = 'Password must be at least 6 characters';
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
                Email: formData.Email,                
                Password: formData.Password,
            };

            try {
                const apiUrl = process.env.REACT_APP_URL ; // Add a fallback URL
            console.log('API URL:', apiUrl); // Log the environment variable

                const response = await fetch(`${apiUrl}/api/users/userlogin`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                console.log(response);
    
                const result = await response.json();
                console.log(result);
    
                if (response.ok) {
                    console.log('Login successful:', result);
                    

                    const role = result.role
                    if (role == 'coach'){
                        // Save the token to localStorage
                    localStorage.setItem('coachAuthToken', result.token);
                    console.log( "this is coach token:", localStorage.getItem("coachAuthToken"));
                        setPopup({
                            message: "Login successful!",
                            type: "success",
                            isVisible: true,
                            buttonLabel: "Proceed to your Dashboard",
                            buttonRoute: "/coach",
                        });
                    } else {
                        // Save the token to localStorage
                    localStorage.setItem('userAuthToken', result.token);
                    console.log("this is user token:", localStorage.getItem("userAuthToken"));
                        setPopup({
                            message: "Login successful!",
                            type: "success",
                            isVisible: true,
                            buttonLabel: "Proceed to your Dashboard",
                            buttonRoute: "/manage-tasks",
                        });
                    }
                    
                } else {
                    console.error('Login failed:', result);
                    const errorMessages = result.message
                    setPopup({
                        message: `Login Failed: ${errorMessages}`,
                        type: "error",
                        isVisible: true,
                        buttonLabel: "Retry",
                        buttonRxoute: "/login",
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
                                    <h3>Coach & Mentee Login</h3>
                                    <p>Don't have an account yet? <span className='red'> Contact your coach </span> or <a href="/signup" className='auth-link'> Sign up as a coach  free</a></p>
                                </div>

                                <p>
                                    <label>Email</label>
                                    <input
                                        placeholder="Email"
                                        type="Email"
                                        id="Email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleInputChange}
                                    />
                                    {errors.Email && <span className="error"  style={{color: "red"}}>{errors.Email}</span>}
                                </p>

                                <p>
                                    <label htmlFor="pass">Password</label>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input
                                            placeholder="Password"
                                            type={showPassword ? 'text' : 'Password'}
                                            id="pass"
                                            name="Password"
                                            value={formData.Password}
                                            onChange={handleInputChange}
                                            aria-describedby="Password-error"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            style={{ marginLeft: '8px' }}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {errors.Password && <span id="Password-error" role="alert" style={{ color: 'red' }}>{errors.Password}</span>}
                                </p>

                                <div className="back-check-box">
                                    <input
                                        type="checkbox"
                                        id="box-1"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                    />
                                    Remember me
                                </div>

                                <p>
                                    <a href="/forgot-Password">Forget Password?</a>
                                </p>

                                <button type="submit" id="button" name="submit" disabled={isLoading}>
                                {isLoading ? 'Signing you in...' : 'Login'}
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

export default LoginMain;
