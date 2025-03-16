import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';  
import Popup from '../../components/Popup/Popup'


const OtpMain = () => {
    const [popup, setPopup] = useState({ message: "", type: "", isVisible: false, buttonLabel: "", buttonRoute: "" });
    const [isLoading, setIsLoading] = useState(false);

    // State for form fields and errors
    const [formData, setFormData] = useState({
       email: '',
        otpCode: '',
    });

    const [errors, setErrors] = useState({
        otpCode: '',
    });

    const navigate = useNavigate(); 
    // Retrieve email from localStorage on component mount
    useEffect(() => {
        const savedEmail = localStorage.getItem('userEmail');
        if (savedEmail) {
            setFormData((prevData) => ({
                ...prevData,
                email: savedEmail,
            }));
        }
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


        // OTP Validation
        if (!formData.otpCode) {
            formErrors.otpCode = 'Enter OTP sent to your email';
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
            const data ={
                email: formData.email,
                otp: formData.otpCode,
            };
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/verify-otp`, {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify(data)
                }); 
                
                const result = await response.json();
                if (response.ok) {
                    console.log('OTP Verified successful:', result);
                    setPopup({
                        message: "Verification successful! ",
                        type: "success",
                        isVisible: true,
                        buttonLabel: "Proceed to Login now",
                        buttonRoute: "/login",
                    }); // Redirect to the OTP page after successful registration
                } else {
                    console.error('Verification failed:', result);
                    // Display error messages to the user
                    const errorMessages = Object.entries(result.errors)
                    .map(([key, messages]) => `${key}: ${messages.join(', ')}`)
                    .join('\n');
                    setPopup({
                        message: `Verification Failed: ${errorMessages}`,
                        type: "error",
                        isVisible: true,
                        buttonLabel: "Retry",
                        buttonRoute: "/otp",
                    }); 
                                }
            
            } 
            catch (error) {
                console.error('Error during Verifiaction:', error);
                setPopup({
                    message: "An error occurred. Please try again.",
                    type: "error",
                    isVisible: true,
                    buttonLabel: "Retry",
                    buttonRoute: "/otp",
                }); }
                      finally {
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
                                    <h3>Verify Your Email</h3>
                                    <p>A One Time Passcode(OTP) has been sent to your email (check your spam folder also)</p>
                                </div>

                                <p>
                                    <label>Enter One Time Passcode </label>
                                    <input
                                        placeholder="Enter the OTP Code sent to your Email"
                                        type="password"
                                        id="otp"
                                        name="otpCode"
                                        value={formData.otpCode}
                                        onChange={handleInputChange}
                                    />
                                    {errors.otpCode && <span className="error"  style={{color: "red"}}>{errors.otpCode}</span>}
                                </p>

                               


                                <button type="submit" id="button" name="submit" disabled={isLoading}>{isLoading ? 'Verifying...' : 'Verify'}</button>
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

export default OtpMain;
