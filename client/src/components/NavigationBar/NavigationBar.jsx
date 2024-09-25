import { useEffect } from "react";
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
          <a href="#">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </a>
        </li>
        <li id="networkTab">
          <a href="#">
            <i className="fa-solid fa-user-group"></i>
            <p>Network</p>
          </a>
        </li>
        <li id="jobsTab">
          <a href="#">
            <i className="fa-solid fa-magnifying-glass"></i>
            <p>Jobs</p>
          </a>
        </li>
        <li id="discussionsTab">
          <a href="#">
            <i className="fa-solid fa-comments"></i>
            <p>Discussions</p>
          </a>
        </li>
        <li id="notificationsTab">
          <a href="#">
            <i className="fa-solid fa-bell"></i>
            <p>Notifications</p>
          </a>
        </li>
        <li id="personalDataTab">
          <a href="#">
            <i className="fa-solid fa-user"></i>
            <p>Personal Data</p>
          </a>
        </li>
        <li id="settingsTab">
          <a href="#">
            <i className="fa-solid fa-gear"></i>
            <p>Settings</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}
