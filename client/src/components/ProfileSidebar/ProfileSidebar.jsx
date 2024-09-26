import ConnectionProfile from "../ConnectionProfile/ConnectionProfile";
import AppImage from "../AppImage/AppImage";

import styles from "./ProfileSidebar.module.css";
import section_styles from "../../styles/home_sections.module.css";

import { useEffect, useState } from "react";

export default function ProfileSidebar(props) {

  const [userData, setUserData] = useState(props.user_data);
  const [connections, setConnections] = useState(props.user_data.connections);

  useEffect(() => {

    setUserData(props.user_data);
    setConnections(props.user_data.connections);
  
  }, [props.user_data]);

  return (
    <aside className={`${styles.profile_sidebar_section} ${section_styles.section}`}>
      <div className={styles.outer_container}>
        <div className={`${styles.profile_container} ${styles.panel}`}>
          <AppImage
            src={props.user_data.banner_image_url}
            className={styles.banner_image}
            alt="banner image"
          />
          <AppImage
            src={props.user_data.profile_image_url}
            className={styles.profile_image}
            alt="profile image"
          />
          <h1 className={styles.user_fullname}>{props.user_data.first_name} {props.user_data.last_name}</h1>
          <div className={styles.about_me_container}>
            <h1 className={styles.panel_section_title}>About Me</h1>
            {props.user_data.description ? (
              <p>{props.user_data.description}</p>
            ) : (
              <p className={styles.no_description_message}>No Description...</p>
            )}
          </div>
          <div className={styles.socials_container}>
            <h1 className={styles.panel_section_title}>My Socials</h1>
            <ul>
              <li>
                <i className="fa-solid fa-users"></i>
                <div className={styles.associates_counters_container}>
                  <a href="#">
                    <b>{props.user_data.followersCount}</b> followers
                  </a>
                  <a href="#">
                    <b>{props.user_data.followingCount}</b> following
                  </a>
                  <a href="#">
                    <b>{props.user_data.friendsCount}</b> friends
                  </a>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <p>{props.user_data.email}</p>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <p>{props.user_data.phone_number}</p>
              </li>
            </ul>
          </div>
          <p className={`${styles.view_profile_message} ${styles.panel_link}`}>
            <a href="#">View Profile</a>
          </p>
        </div>
        <div className={`${styles.connections_container} ${styles.panel}`}>
          <div className={styles.network_container}>
            <h1 className={styles.panel_section_title}>My Network</h1>
            <ul>
              {connections.map((number, index) => (
                <li key={index}>
                  <ConnectionProfile
                    image_src={connections[index].profile_image_url}
                    firstname={connections[index].first_name}
                    lastname={connections[index].last_name}
                    description={connections[index].description}
                  />
                </li>
              ))}
            </ul>
            <p className={`${styles.show_all_message} ${styles.panel_link}`}>
              <a href="#">Show All</a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
