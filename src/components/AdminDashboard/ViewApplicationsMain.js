import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../Popup/Popup";
import SideMenu from "./SideMenu";

const ViewApplicationsMain = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSingle, setIsLoadingSingle] = useState(false);
  const [applications, setApplications] = useState([]);
  const [singleApplication, setSingleApplication] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Current page

  const itemsPerPage = 5;
  // Pagination logic
 const hasPrevious = currentPage > 1;
 const hasNext = applications.length === itemsPerPage && !isLoading;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [popup, setPopup] = useState({
    message: "",
    type: "",
    isVisible: false,
    buttonLabel: "",
    buttonRoute: "",
  });
  const [confirmPopup, setConfirmPopup] = useState({
    isVisible: false,
    applicationID: null,
    statusID: null,
  });
  const [queryPopup, setQueryPopup] = useState({
    isVisible: false,
    applicationID: null,
    reason: "",
    errorMessage: "", // To display error message if required field is empty
  });
  const [deletePopup, setDeletePopup] = useState({
    isVisible: false,
    applicationID: null,
    statusID: null,
  });

  const token = localStorage.getItem("adminAuthToken");
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchApplications = async (page = 1) => {
  setIsLoading(true);
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}/api/admin/fetchall?page=${page}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setApplications(response.data);
    setCurrentPage(page);
  } catch (error) {
    console.error("Error fetching applications:", error);
  } finally {
    setIsLoading(false);
  }
};

const handlePrevious = () => {
  if (currentPage > 1) fetchApplications(currentPage - 1);
};

const handleNext = () => {
  if (applications.length === itemsPerPage) fetchApplications(currentPage + 1);
};




useEffect(() => {
  fetchApplications();
}, []);

  const handleSingle = (id) => {
    navigate(`/application/${id}`);
  };



  const handleStatusUpdate = async (applicationID, statusID) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/update-status/${applicationID}`,
        { status: statusID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        setPopup({
          message: "Status updated successfully!",
          type: "success",
          isVisible: true,
          buttonLabel: "Close",
        });
  
        // Optionally update the applications state optimistically
        setApplications((prevApps) =>
          Array.isArray(prevApps) 
            ? prevApps.map((app) =>
                app.id === applicationID ? { ...app, status_id: statusID } : app
              )
            : []
        );
  
        // Refresh the application list
        await fetchApplications(currentPage);
      } else {
        setPopup({
          message: `Failed to update status: ${response.data?.message || "Unknown error"}`,
          type: "error",
          isVisible: true,
          buttonLabel: "Close",
        });
      }
    } catch (error) {
      setPopup({
        message: `Error updating status: ${error.message || "Unknown error"}`,
        type: "error",
        isVisible: true,
        buttonLabel: "Close",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleDelete = async (applicationID, statusID) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/delete-application`,
        { id: applicationID },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        setPopup({
          message: "Application deleted successfully!",
          type: "success",
          isVisible: true,
          buttonLabel: "Close",
        });
  
        // Update the state safely
        setApplications((prevApps) =>
          Array.isArray(prevApps) ? prevApps.filter((app) => app.id !== applicationID) : []
        );

              // Refresh applications
      fetchApplications();
      } else {
        setPopup({
          message: `Failed to delete application: ${response.data?.message || "Unknown error"}`,
          type: "error",
          isVisible: true,
          buttonLabel: "Close",
        });
      }
    } catch (error) {
      setPopup({
        message: `Error deleting application: ${error.message || "Unknown error"}`,
        type: "error",
        isVisible: true,
        buttonLabel: "Close",
      });
    } finally {
      setIsLoading(false);
    }
  };
  


  const handleStatusChange = (applicationID, statusID) => {
    setConfirmPopup({
      isVisible: true,
      applicationID,
      statusID,
    });
  };


  const confirmStatusUpdate = () => {
    const { applicationID, statusID } = confirmPopup;
    handleStatusUpdate(applicationID, statusID);
    setConfirmPopup({ isVisible: false, applicationID: null, statusID: null });
  };

  const confirmDeleteApplication = () => {
    const { applicationID, statusID } = deletePopup;
    handleDelete(applicationID, statusID);
    setDeletePopup({ isVisible: false, applicationID: null, statusID: null });
  };

  const handleQuerySubmit = async () => {
    const { applicationID, reason } = queryPopup;
  
    // Validation for required field
    if (!reason.trim()) {
      setQueryPopup({
        ...queryPopup,
        errorMessage: "Reason is required", // Show error if field is empty
      });
      return;
    }
  
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/api/admin/query-application/${applicationID}`,
        { reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        setPopup({
          message: "Query submitted successfully!",
          type: "success",
          isVisible: true,
          buttonLabel: "Close",
        });
        setQueryPopup({ isVisible: false, applicationID: null, reason: "" });
        fetchApplications();  // This will refresh the data from the server
      }
    } catch (error) {
      setPopup({
        message: `Failed to submit query: ${error.message || "Unknown error"}`,
        type: "error",
        isVisible: true,
        buttonLabel: "Close",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const truncate = (text, limit = 1) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > limit ? `${words.slice(0, limit).join(" ")}...` : text;
  };

  
  const handleQueryClick = (applicationID) => {
    setQueryPopup({
      isVisible: true,
      applicationID: applicationID,
      reason: "",
      errorMessage: "", // Reset error message
    });
  };

  const handleDeleteButton = (applicationID) => {
    setDeletePopup({
      isVisible: true,
      applicationID,
    });
  };


  const getStatusStyle = (statusID) => {
    switch (statusID) {
      case 1:
        return { backgroundColor: "#ffebee", color: "#1b5e20" }; //incomplete

      case 2:
        return { backgroundColor: "#f5f5f5", color: "#1b5e20" }; //submitted
      case 3:
        return { backgroundColor: "#ffff00", color: "#1b5e20" }; // reviewing
      case 4:
        return { backgroundColor: "#e0f7ea", color: "#1b5e20" }; //approved
      case 5:
        return { backgroundColor: "#EC3237", color: "#b71c1c" }; //denied
      default:
        return {};
    }
  };

  const tableStyle = {
    maxWidth: "100%",
    overflowX: "auto",
    marginTop: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const styles = {
    container: { display: "flex", minHeight: "100vh" },
    content: { flex: 3, padding: "20px" },
    table: { width: "100%", borderCollapse: "collapse", backgroundColor: "#fff" },
    paginationContainer: { display: "flex", justifyContent: "center", margin: "20px 0" },
    paginationButton: (isEnabled) => ({
      margin: "0 5px",
      padding: "10px 15px",
      cursor: isEnabled ? "pointer" : "not-allowed",
      backgroundColor: isEnabled ? "#007bff" : "#e0e0e0",
      color: isEnabled ? "#fff" : "#aaa",
      border: "none",
      borderRadius: "4px",
      fontSize: "14px",
    }),
    header: {
      fontWeight: "bold",
      backgroundColor: "#4CAF50",
      color: "#fff",
      padding: "12px 15px",
      textTransform: "uppercase",
      borderBottom: "2px solid #ddd",
    },
    deleteHeader: {
      fontWeight: "bold",
      backgroundColor: "#ff0000",
      color: "#fff",
      padding: "12px 15px",
      textTransform: "uppercase",
      borderBottom: "2px solid #ddd",
    },
    cell: {
      padding: "12px 15px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
      fontSize: "14px",
      color: "#333",
    },
    
    rowHover: { cursor: "pointer", backgroundColor: "#f5f5f5" },
    linkStyle: { color: "#007bff", textDecoration: "underline", cursor: "pointer" },

    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      margin: "20px 0",
    },
    
    activePage: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
    },
  };
  const paginationButton = (isEnabled) => ({
    margin: "0 5px",
    padding: "10px 15px",
    cursor: isEnabled ? "pointer" : "default",
    backgroundColor: isEnabled ? "#007bff" : "#f0f0f0",
    color: isEnabled ? "#fff" : "#333",
    border: "1px solid #ccc",
    borderRadius: "5px",
  });

  return (
    <div style={styles.container}>
           
       {/* Hamburger Button for mobile */}
       {isMobile && (
        <button
          style={{
            ...styles.hamburgerButton,
            position: isMenuOpen ? "fixed" : "absolute", // Fix button at top when menu is open
            top: isMenuOpen ? "10px" : "20px", // Adjust position when the menu is open
            right: "20px", // Position at the top right
            zIndex: 1000, // Ensure it's always above other elements
          }}
          onClick={toggleMenu}
        >
          {isMenuOpen ? "X" : "☰"}
        </button>
      )}

       {/* Side menu for mobile screens */}
       {isMobile && isMenuOpen && <SideMenu />}
      {!isMobile && <SideMenu />}
      <div style={{ overflowX: "auto" }}>
        <h3>View Applications</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div style={tableStyle}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.header}>S/N</th>
                  <th style={styles.header}>Applicant Name</th>
                  <th style={styles.header}>Institution</th>
                  <th style={styles.header}>Research Title</th>
                  <th style={styles.header}>Abstract</th>
                  <th style={styles.header}>Co-Applicant 1</th>
                  <th style={styles.header}>Co-Applicant 2</th>
                  <th style={styles.header}>Update Status</th>
                  <th style={styles.header}>Query</th>
                  <th style={styles.deleteHeader}>Delete</th>
                </tr>
              </thead>
              <tbody>
              {applications.data?.map((app, index) => {
                const serialNumber = (currentPage - 1) * itemsPerPage + index + 1;
                return (
  <tr
    key={app.id}
    style={{ ...styles.rowHover, ...getStatusStyle(app.status_id) }}
  >
    <td style={styles.cell}>{serialNumber}</td>
    <td style={styles.cell} onClick={() => handleSingle(app.id)}>
      <span style={styles.linkStyle}>
        {`${app.title?.title || ""} ${app.first_name || ""} ${app.surname || ""}`}
      </span>
    </td>
    <td style={styles.cell}>{app.institution?.inst?.inst || "N/A"}</td>
    <td style={styles.cell}>{truncate(app.research?.research_title) || "N/A"}</td>
    <td style={styles.cell}>{truncate(app.research?.abstract) || "N/A"}</td>
    <td style={styles.cell}>
      {app.co_applicant
        ? `${app.co_applicant.title?.title || ""} ${app.co_applicant.first_name || ""} ${app.co_applicant.surname || ""}`
        : "None"}
    </td>
    <td style={styles.cell}>
      {app.co_applicant2
        ? `${app.co_applicant2.title?.title || ""} ${app.co_applicant2.first_name || ""} ${app.co_applicant2.surname || ""}`
        : "None"}
    </td>
    <td style={styles.cell}>
      <select
        onChange={(e) => {
          const selectedStatusID = parseInt(e.target.value);
          if (selectedStatusID) {
            handleStatusChange(app.id, selectedStatusID);
          }
        }}
      >
        <option value="">Select Action</option>
        <option value="3">Reviewing</option>
        <option value="4">Approved</option>
        <option value="5">Denied</option>
      </select>
    </td>
    <td style={styles.cell}>
      <button onClick={() => handleQueryClick(app.id)}>Query</button>
    </td>
    <td style={styles.cell}>
      <button onClick={() => handleDeleteButton(app.id)}>Delete</button>
    </td>
  </tr>
                )
})}

              </tbody>
            </table>
          </div>
        )}

        {isLoadingSingle && <p>Loading application details...</p>}

        {popup.isVisible && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => setPopup({ ...popup, isVisible: false })}
            buttonLabel={popup.buttonLabel}
            buttonRoute={popup.buttonRoute}
          />
        )}
{deletePopup.isVisible && (
          <Popup
            message="Are you sure you want to delete this application?"
            type="confirm"
            onClose={() =>
              setDeletePopup({ isVisible: false, applicationID: null, statusID: null })
            }
            buttonLabel="Yes"
            onAction={confirmDeleteApplication}
          />
        )}


        {confirmPopup.isVisible && (
          <Popup
            message="Are you sure you want to update the status?"
            type="confirm"
            onClose={() =>
              setConfirmPopup({ isVisible: false, applicationID: null, statusID: null })
            }
            buttonLabel="Yes"
            onAction={confirmStatusUpdate}
          />
        )}
       {queryPopup.isVisible && (
  <Popup
    message="Enter the reason for querying this application:"
    type="input"
    onClose={() => setQueryPopup({ isVisible: false, applicationID: null, reason: "" })}
    buttonLabel="Submit"
    onAction={handleQuerySubmit}
  >
    <textarea
      value={queryPopup.reason}
      onChange={(e) => setQueryPopup({ ...queryPopup, reason: e.target.value })}
      placeholder="Enter reason here..."
      required
    />
    {queryPopup.errorMessage && (
      <div style={{ color: "red", fontSize: "12px" }}>{queryPopup.errorMessage}</div>
    )}
  </Popup>
)}
    <div style={styles.paginationContainer}>
  {applications?.links?.map((link, index) => (
    <button
      key={index}
      onClick={() => {
        if (link.url) {
          const page = new URL(link.url).searchParams.get("page");
          fetchApplications(parseInt(page));
        }
      }}
      disabled={!link.url || link.active}
      style={{
        paginationButton,
        ...(link.active ? styles.activePage : {}),
      }}
    >
      {link.label === "&laquo; Previous" ? "Prev" : link.label === "Next &raquo;" ? "Next" : link.label}
    </button>
  ))}
</div>
      </div>

  

    </div>
  );
};

export default ViewApplicationsMain;
