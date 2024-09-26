import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavigationBar.module.css";

export default function NavigationBar(props) {

  useEffect(() => {
    const element = document.getElementById(props.activeTab);
    
    element.classList.remove('active_tab');
    
    if (element !== null) {
      element.classList.add('active_tab');
    }
    
    const active = document.querySelector('.active_tab');
    if (active !== null) {
      
      const active_link = active.getElementsByTagName('a')[0];

      active_link.style.color = 'rgb(116, 32, 243)';
      active_link.style.setProperty('--navigationTabAfterWidth', '90%');
      active_link.style.setProperty('--navigationTabAfterColor', 'rgb(116, 32, 243)');

    }

  }, [props.activeTab]);

  return (
    <nav id="navigationBar" className={styles.navigation_bar}>
      <ul>
        <li id="homeTab">
          <Link to="/home">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </Link>
        </li>
        <li id="networkTab">
          <Link to="/network">
            <i className="fa-solid fa-user-group"></i>
            <p>Network</p>
          </Link>
        </li>
        <li id="jobsTab">
          <Link to="#">
            <i className="fa-solid fa-magnifying-glass"></i>
            <p>Jobs</p>
          </Link>
        </li>
        <li id="discussionsTab">
          <Link to="#">
            <i className="fa-solid fa-comments"></i>
            <p>Discussions</p>
          </Link>
        </li>
        <li id="notificationsTab">
          <Link to="#">
            <i className="fa-solid fa-bell"></i>
            <p>Notifications</p>
          </Link>
        </li>
        <li id="personalDataTab">
          <Link to="#">
            <i className="fa-solid fa-user"></i>
            <p>Personal Data</p>
          </Link>
        </li>
        <li id="settingsTab">
          <Link to="#">
            <i className="fa-solid fa-gear"></i>
            <p>Settings</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
