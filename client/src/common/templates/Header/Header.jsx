import { useEffect, useState } from "react";

import AppImage from "../../components/AppImage/AppImage";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

import app_logo from "../../../assets/images/medium_logo.png";
import styles from "./Header.module.css";


/**
 * Renders the XML code of the application header component. It includes a basic logo, a 
 * navigation bar, a profile online status and an expand menu button for small devices. All 
 * these are separate components, located either in the same file or in external files.
 * 
 * @param {any} props the properties of the header component
 * @returns the header XML code
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 27/09/2024
 */
export default function Header(props) {

  const [activeTab, setActiveTab] = useState(props.activeNavigationTab);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchUserProfileImage = async () => {
      try {

        const response = await fetch(`http://localhost:8080/users/${props.userID}/profileImage`, {method: 'GET'});
        const profileImage = await response.json();
        setProfileImageUrl(profileImage.url);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }

    }

    setActiveTab(props.activeNavigationTab);
    fetchUserProfileImage();

  }, [props.activeNavigationTab, props.userID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.header}>
      <div className={styles.header_container}>

        <ApplicationLogo/>
        <NavigationBar activeTab={activeTab} />
        <div className={styles.user_online_container}>
          <AppImage
            src={profileImageUrl}
            className={styles.online_image}
            alt="profile_picture"
          />
        </div>
        <ExpandMenu/>

      </div>
    </div>
  );

}

/**
 * Render XML code fo the ApplicationLogo component. All this component does, is rendering
 * the logo of the application, stored inside the project structure in the assets' folder.
 * 
 * @returns XML code for the application logo
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 27/09/2024
 */
function ApplicationLogo() {

  return <img 
    className={styles.application_logo} 
    src={app_logo}
    alt="app_logo"
  />

}

/**
 * Renders XML code fo the OnlineImage component. This component is located at the right of
 * the header, and works as a link to the user profile page.
 * 
 * @param {any} props the properties of the OnlineImage
 * @returns XML code of the OnlineImage
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 27/09/2024
 */
function OnlineImage(props) {

  const [profileImage, setProfileImage] = useState(props.profile_image_src);

  useEffect(() => {
    setProfileImage(props.profile_image_src);
  }, []);

  return (
    <div className={styles.user_online_container}>
      <AppImage 
        src={profileImage} 
        className={styles.online_image} 
        alt="profile_picture" 
      />
    </div>
  )

}

/**
 * Renders the XML code of the expand menu component, that is part of the header. This
 * component is always visible on small devices, in other words in smaller screen dimensions.
 * 
 * @returns XML code of the expand menu component
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 27/09/2024
 */
function ExpandMenu() {

  return (
    <div className={styles.expand_menu_container}>
      <button
        onClick={() => {
          const navbar = document.getElementById("navigationBar");
          (navbar.style.left === '0px')
            ? navbar.style.left = '-210px'
            : navbar.style.left = '0px';
        }}>
        <i className="fa-solid fa-bars"></i>
      </button>
    </div>
  )

}
