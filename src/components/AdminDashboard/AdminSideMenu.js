import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const AdminSideMenu = () => {

    const handleLogout = () => {
        localStorage.removeItem("adminAuthToken");
        window.location.href = "/adminlogin"; // Redirect to login page
      };

      const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

      useEffect(() => {
         const handleResize = () => setIsMobile(window.innerWidth <= 600);
         window.addEventListener("resize", handleResize);
         return () => window.removeEventListener("resize", handleResize);
       }, []);
     
    const navigate = useNavigate();
 // Inline styles
 const styles = {
    dashboardContainer: {
      display: "flex",
      minHeight: "100vh",
    },
    adminSideMenuContainer: {
      flex: 1,
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRight: "1px solid #ddd",
    },
    contentContainer: {
      flex: 3,
      padding: "20px",
      backgroundColor: "#fff",
    },
    adminSideMenu: {
      marginBottom: "20px",
    },
    heading: {
      marginBottom: "10px",
      color: "#333",
    },
    status: {
      fontSize: "14px",
      marginBottom: "20px",
    },
    statusOpen: {
      color: "green",
      fontWeight: "bold",
    },
    menuButton: {
      backgroundColor: "#ec3237",
      color: "white",
      border: "none",
      borderRadius: "5px",
      width: "80%",
      marginBottom: "10px",
      padding: "10px",
      cursor: "pointer",
    },
    applicationList: {
      marginBottom: "20px",
    },
    applicationListItem: {
      marginBottom: "10px",
    },
    applicationLink: {
      textDecoration: "none",
      color: "#0066cc",
    },
    applicationLinkHover: {
      textDecoration: "underline",
    },
    primaryButton: {
      backgroundColor: "#1db540",
      color: "white",
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      marginTop: "20px",
      cursor: "pointer",
    },
  };





return (
    <div style={styles.adminSideMenuContainer}>
      <h2 style={styles.heading}>Get Started</h2>
      <p style={styles.status}>
        <strong>Application Status: <span style={styles.statusOpen}>Open</span></strong>
      </p>
      {[
        { text: "Home", path: "/admindashboard" },
        { text: "View All Applications", path: "/admindashboard/viewapplications" },
        { text: "Add Post ", path: "/admindashboard/addpost" },
        { text: "View Post", path: "/admindashboard/viewpost" },
      ].map((menu, index) => (
        <button key={index} style={styles.menuButton} onClick={() => navigate(menu.path)}>{menu.text}</button>
      ))}
      <button style={styles.menuButton} onClick={() => handleLogout()}>Log Out</button>
    </div>
  );
};

  export default AdminSideMenu;