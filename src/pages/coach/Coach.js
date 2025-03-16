import React from "react";
import AppLogo from "../../assets/inspire-coach-logo.png";
import { APP_NAME } from "../../global";
import "./Coach.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faCalendarCheck,
  faCommentDots,
} from "@fortawesome/free-solid-svg-icons";

function Coach() {
  return (
    <div id="user-container-bg">
      <div id="user-container">
        <div className="user-header">
          <img
            id="user-app-logo"
            src={AppLogo}
            alt={`${APP_NAME} logo: pink ribbon with green checkmark`}
          />
          <h1 id="user-title">John Doe</h1>
          
        </div>
        <div className="user-header">
          
            <p id="user-description">Total Tasks: 7</p>
          </div>
          <div className="user-header">
        <div id="user-features-list">
          <p>
            <FontAwesomeIcon
              className="user-feature-list-item-icon"
              icon={faListCheck}
              style={{ color: "var(--purple)" }}
            />
            Input your tasks and AI will generate the steps for you
          </p>
          <p>
            <FontAwesomeIcon
              className="user-feature-list-item-icon"
              icon={faCalendarCheck}
              style={{ color: "var(--pink)" }}
            />
            Track your task due dates and completion status
          </p>
          <p>
            <FontAwesomeIcon
              className="user-feature-list-item-icon"
              icon={faCommentDots}
              style={{ color: "var(--green)" }}
            />
            Connect with a coach to receive guidance
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Coach;
