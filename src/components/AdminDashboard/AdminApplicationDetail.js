// ApplicationDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Popup from '../Popup/Popup';

const ApplicationDetail = () => {
  const { id } = useParams(); // Get the application ID from the URL
  const navigate = useNavigate(); // To navigate programmatically if needed
  const [application, setApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({
    message: '',
    type: '',
    isVisible: false,
    buttonLabel: '',
    buttonRoute: '',
  });

  const token = localStorage.getItem('adminAuthToken');


  
  useEffect(() => {
    const fetchApplication = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/api/admin/fetchone/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        console.log(response);
        setApplication(response.data); // Set application details
      } catch (error) {
        console.error('Error fetching application:', error);
        setPopup({
          message: 'Error fetching application details',
          type: 'error',
          isVisible: true,
          buttonLabel: 'Close',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [id, token]); // Fetch when component mounts or id/token changes


  
  const closePopup = () => {
    setPopup({ ...popup, isVisible: false });
  };

  if (isLoading) {
    return <p>Loading application details...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3>Application Details</h3>
      {application ? (
        <div>
          {/* Applicant Information */}
          <h4>Personal Information</h4>
          <p><strong>Name:</strong> {`${application.title?.title} ${application.first_name} ${application.surname}`}</p>
          <p><strong>Other Name:</strong> {application.other_name || 'N/A'}</p>
          <p><strong>Gender:</strong> {application.gender?.gender || 'N/A'}</p>
          <p><strong>Phone:</strong> {application.phone || 'N/A'}</p>
          <p><strong>Email:</strong> {application.user?.email || 'N/A'}</p>
          <p><strong>State:</strong> {application.state?.state || 'N/A'}</p>
          
          {/* Profile Picture */}
          <p><strong>Profile Picture:</strong></p>
          {application.profile_picture ? (
            <img
              src={`${process.env.REACT_APP_URL}/storage/uploads/${application.profile_picture}`}
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
          ) : (
            <p>No profile picture available.</p>
          )}

<h4>Institution Information</h4>


          <p><strong>Institution:</strong> {application.institution?.inst?.inst || 'N/A'}</p>
          <p><strong>Department:</strong> {application.institution?.faculty?.faculty || 'N/A'}</p>

          <h4>Research Information</h4>

          <p><strong>Research Title:</strong> {application.research?.research_title || 'N/A'}</p>
          <p><strong>Research Abstract:</strong> {application.research?.abstract || 'N/A'}</p>
          <p><strong>Research Proposal:</strong> {application.research?.research_proposal ? (
              <a href={`${process.env.REACT_APP_URL}/storage/uploads/proposals/${application.research?.research_proposal}`} target="_blank" rel="noopener noreferrer">View Research Proposal</a>
            ) : 'N/A'}</p>
          <p><strong>Research Costing:</strong> {application.research?.costing ? (
              <a href={`${process.env.REACT_APP_URL}/storage/uploads/costing/${application.research?.costing }`} target="_blank" rel="noopener noreferrer">View Costing</a>
            ) : 'N/A'}</p>

          {/* Co-Applicants */}
          <h4>Co-Applicants</h4>
          <p><strong>Co-Applicant 1:</strong> {application.co_applicant ? `${application.co_applicant.title?.title} ${application.co_applicant.first_name} ${application.co_applicant.last_name}` : 'None'}</p>
          <p><strong>Co-Applicant 1 CV:</strong> {application.co_applicant?.cv ? (
              <a href={`${process.env.REACT_APP_URL}/storage/uploads/cvs/${application.co_applicant?.cv}`} target="_blank" rel="noopener noreferrer">View Co-applicant CV</a>
            ) : 'N/A'}</p>
          <p><strong>Co-Applicant 2:</strong> {application.co_applicant2 ? `${application.co_applicant2.title?.title} ${application.co_applicant2.first_name} ${application.co_applicant2.last_name}` : 'None'}</p>
          <p><strong>Co-Applicant 2 CV:</strong> {application.co_applicant2?.cv ? (
              <a href={`${process.env.REACT_APP_URL}/storage/uploads/cvs/${application.co_applicant2?.cv}`} target="_blank" rel="noopener noreferrer">View Co-applicant2 CV</a>
            ) : 'N/A'}</p>
          {/* Institution Documents */}
          <h4>Institution Documents</h4>
          <p><strong>Institution Support Letter:</strong> 
            {application.institution?.inst_sup_letter ? (
              <a href={`${process.env.REACT_APP_URL}/storage/uploads/letters/${application.institution.inst_sup_letter}`} target="_blank" rel="noopener noreferrer">View Support Letter</a>
            ) : 'None'}
          </p>
          <p><strong>CV:</strong> 
            {application.institution?.cv ? (
              <a href={`${process.env.REACT_APP_URL}/storage/uploads/cvs/${application.institution.cv}`} target="_blank" rel="noopener noreferrer">View CV</a>
            ) : 'None'}
          </p>

          {/* Status */}
          <p><strong>Status:</strong> {application.status?.status || 'N/A'}</p>

        </div>
      ) : (
        <p>No application data available.</p>
      )}

      {popup.isVisible && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={closePopup}
          buttonLabel={popup.buttonLabel}
        />
      )}
    </div>
  );
};

export default ApplicationDetail;
