import React from 'react';
import AppLogo from '../assets/inspire-coach-logo.png';
import { APP_NAME } from '../global';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faCalendarCheck, faCommentDots } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


const Home = (props)=> {
    const { ctaBtn } = props;
  
  return (
    <div id='home-page-container-bg'>
        <div id='home-page-container'>
           
            <img id='home-page-app-logo' src={AppLogo} alt={`${APP_NAME} logo: pink ribbon with green checkmark`} />
            <h1 id='home-page-title'>Welcome to InspireCoach!</h1>
            <p id='home-page-description'>InspireCoach is an AI-powered application that helps people with disabilities navigate their jobs with task management tools and personalized coaching.</p>
            <div id='home-page-features-list'>
                <p>
                    <FontAwesomeIcon 
                        className='home-page-feature-list-item-icon' 
                        icon={faListCheck} 
                        style={{ color: 'var(--purple)' }}
                    /> 
                    Input your tasks and AI will generate the steps for you
                </p>
                <p>
                    <FontAwesomeIcon 
                        className='home-page-feature-list-item-icon' 
                        icon={faCalendarCheck} 
                        style={{ color: 'var(--pink)' }}
                    /> 
                    Track your task due dates and completion status
                </p>
                <p>
                    <FontAwesomeIcon 
                        className='home-page-feature-list-item-icon' 
                        icon={faCommentDots} 
                        style={{ color: 'var(--green)' }}
                    /> 
                    Connect with a coach to receive guidance
                </p>
                
                        
                
            </div>
            <Button id='signUp' variant="contained" aria-label='Button to sign up' className="signup-coach-button"><Link to="/signup">Sign Up As a Coach </Link></Button>
        </div>
    </div>
  );
}

export default Home;