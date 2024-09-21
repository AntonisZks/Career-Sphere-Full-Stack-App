import app_logo from "../../assets/images/medium_logo.png";
import profile_image from "../../assets/images/profile_image.jpg";
import NavigationBar from "../NavigationBar/NavigationBar";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <img
          className={styles.application_logo}
          src={app_logo}
          alt="app_logo"
        />
        <NavigationBar activeTab='homeTab' />
        <div className={styles.user_online_container}>
          <img src={profile_image} alt="profile_picture" />
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
