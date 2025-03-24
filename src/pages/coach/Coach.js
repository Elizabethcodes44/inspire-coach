import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserCard from '../../components/Coach/UserCard';
import './Coach.css';
import Popup from '../../components/Popup/Popup';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// TODO: remove once pulling from DB
import { PLACEHOLDER_TASKS } from '../../components/TasksOverview';
const PLACEHOLDER_USER = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    lastLoginDate: 'Mar 10, 2025'
}
const PLACEHOLDER_USERS_TASKS = [
  {
    user: PLACEHOLDER_USER,
    tasks: PLACEHOLDER_TASKS
  },
  {
    user: PLACEHOLDER_USER,
    tasks: PLACEHOLDER_TASKS
  },
  {
    user: PLACEHOLDER_USER,
    tasks: PLACEHOLDER_TASKS
  }
];
//////////////

function Coach() {
  const [usersTasks, setUsersTasks] = useState([]);
  const token = localStorage.getItem("coachAuthToken");

//   useEffect(() => {
//     // Fetch user details from the backend
//     fetch('/api/users')
//       .then(response => response.json())
//       .then(data => setUsers(data))
//       .catch(error => console.error('Error fetching users:', error));
//   }, []);

    const [popup, setPopup] = useState({ message: "", type: "", isVisible: false, buttonLabel: "", buttonRoute: "" });
    
    // State for form fields and errors
    const [formData, setFormData] = useState({
        Email: '',
        FirstName: '',
        LastName: '',
        Password: '',
        confirmPassword: '',
        // termsAccepted: false,
        // userType: 'student'
    });

    const [errors, setErrors] = useState({
        Email: '',
        FirstName: '',
        LastName: '',
        Password: '',
        confirmPassword: '',
        // termsAccepted: '',
        // userType: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Focus the first input on mount
    useEffect(() => {
        const emailInput = document.getElementById('Email');
        if (emailInput) {
            emailInput.focus();
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

        // Email Validation
        if (!formData.Email) {
            formErrors.Email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
            formErrors.Email = 'Email is invalid';
            isValid = false;
        }

        // First Name Validation
        if (!formData.FirstName) {
            formErrors.FirstName = 'First name is required';
            isValid = false;
        }

        // Last Name Validation
        if (!formData.LastName) {
            formErrors.LastName = 'Last name is required';
            isValid = false;
        }

        // Password Validation
        if (!formData.Password) {
            formErrors.Password = 'Password is required';
            isValid = false;
        } else if (formData.Password.length < 8) {
            formErrors.Password = 'Password must be at least 8 characters';
            isValid = false;
        }

        // Confirm Password Validation
        if (!formData.confirmPassword) {
            formErrors.confirmPassword = 'Confirm Password is required';
            isValid = false;
        } else if (formData.confirmPassword !== formData.Password) {
            formErrors.confirmPassword = 'Passwords do not match';
            isValid = false;
        }

        // // Terms and Conditions Validation
        // if (!formData.termsAccepted) {
        //     formErrors.termsAccepted = 'You must provide your consent by checking above';
        //     isValid = false;
        // }

        setErrors(formErrors);
        return isValid;
    };

  useEffect(() => {
    // TODO: remove and pull from DB
    setUsersTasks(PLACEHOLDER_USERS_TASKS);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
        setIsLoading(true);
        const data = {
            FirstName: formData.FirstName,
            LastName: formData.LastName,
            Email: formData.Email,
            Password: formData.Password,
            // password_confirmation: formData.confirmPassword,
            // userType: formData.userType
        };

        const apiUrl = process.env.REACT_APP_URL ; // Add a fallback URL
        console.log('API URL:', apiUrl); // Log the environment variable

        try {
            console.log(data);
            const response = await fetch(`${apiUrl}/api/users/traineesignup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });


            const result = await response.json();

            if (response.ok) {
                console.log('Registration successful:', result);
                // Save the Email to localStorage
                localStorage.setItem('userEmail', formData.Email);

                setPopup({
                    message: "Registration successful!",
                    type: "success",
                    isVisible: true,
                    buttonLabel: "Continue",
                    buttonRoute: "/coach",
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
                    buttonRoute: "/coach",
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
            setPopup({
                message: "An error occurred. Please try again.",
                type: "error",
                isVisible: true,
                buttonLabel: "Retry",
                buttonRoute: "/coach",
            });
        } finally {
            setIsLoading(false);
        }
    }
};

const [isPopupOpen, setIsPopupOpen] = useState(false);

const handlePopupOpen = () => {
    setIsPopupOpen(true);
};

const handlePopupClose = () => {
    setIsPopupOpen(false);
};

  return (
    <div className="coach-container">
      <div className="filters">
        {/* Add filter options here */}
        <h3> Mentee</h3>
          <Button variant="contained" onClick={handlePopupOpen}>Add Mentee</Button>
                <Dialog open={isPopupOpen} onClose={handlePopupClose}>
                    
                    <DialogContent>
                        
                            <div className="react-login-page react-signup-page pt---120 pb---120">
            <div className="container" open={isPopupOpen} onClose={handlePopupClose}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="login-right-form">
                        <DialogActions>
                        <Button onClick={handlePopupClose} color="primary">Close</Button>
                    </DialogActions>
                            <form onSubmit={handleSubmit}>
                            

                                <p>
                                    <label htmlFor="Email">Email</label>
                                    <input
                                        placeholder="Email"
                                        type="Email"
                                        id="Email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleInputChange}
                                        aria-describedby="Email-error"
                                    />
                                    {errors.Email && <span id="Email-error" role="alert" style={{ color: 'red' }}>{errors.Email}</span>}
                                </p>

                                <p>
                                    <label htmlFor="FirstName">First Name</label>
                                    <input
                                        placeholder="First Name"
                                        type="text"
                                        id="FirstName"
                                        name="FirstName"
                                        value={formData.FirstName}
                                        onChange={handleInputChange}
                                        aria-describedby="FirstName-error"
                                    />
                                    {errors.FirstName && <span id="FirstName-error" role="alert" style={{ color: 'red' }}>{errors.FirstName}</span>}
                                </p>

                                <p>
                                    <label htmlFor="LastName">Last Name</label>
                                    <input
                                        placeholder="Last Name"
                                        type="text"
                                        id="LastName"
                                        name="LastName"
                                        value={formData.LastName}
                                        onChange={handleInputChange}
                                        aria-describedby="LastName-error"
                                    />
                                    {errors.LastName && <span id="LastName-error" role="alert" style={{ color: 'red' }}>{errors.LastName}</span>}
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

                                <p>
                                    <label htmlFor="confirm-pass">Confirm Password</label>
                                    <input
                                        placeholder="Confirm Password"
                                        type="Password"
                                        id="confirm-pass"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        aria-describedby="confirm-Password-error"
                                    />
                                    {errors.confirmPassword && <span id="confirm-Password-error" role="alert" style={{ color: 'red' }}>{errors.confirmPassword}</span>}
                                </p>

                                {/* <p>
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
                                </p> */}



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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlePopupClose} color="primary">Close</Button>
                    </DialogActions>
                </Dialog>
      
      </div>
      <div className="user-card-container">
        {usersTasks.map(userTasks => (
          <UserCard key={userTasks.user.id} userTasks={userTasks} />
        ))}
      </div>
    </div>
  );
}

export default Coach;
