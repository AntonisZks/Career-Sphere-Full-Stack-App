import { useEffect, useState } from "react";
import app_logo from "../../assets/images/medium_logo.png";
import NavigationBar from "../NavigationBar/NavigationBar";
import styles from "./Header.module.css";
import AppImage from "../AppImage/AppImage";

export default function Header(props) {

  const [activeTab, setActiveTab] = useState(props.activeNavigationTab);
  const [profileImage, setProfileImage] = useState(props.user_data.profile_image_url);

  useEffect(() => {

    setProfileImage(props.user_data.profile_image_url);

  }, [props.user_data.profile_image_url]);

  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <img
          className={styles.application_logo}
          src={app_logo}
          alt="app_logo"
        />
        <NavigationBar activeTab={activeTab} />
        <div className={styles.user_online_container}>
          <AppImage 
            src={props.user_data.profile_image_url} 
            className={styles.online_image} 
            alt="profile_picture" 
          />
        </div>
        <div className={styles.expand_menu_container}>
          <button
            onClick={() => {
              const navbar = document.getElementById("navigationBar");
              (navbar.style.left == '0px') ? navbar.style.left = '-210px' : navbar.style.left = '0px';  
            }}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
