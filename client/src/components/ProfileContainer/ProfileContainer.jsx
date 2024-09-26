import { useEffect, useState } from 'react';
import AppImage from '../AppImage/AppImage';
import styles from './ProfileContainer.module.css'


export default function ProfileContainer(props) {

  const [userData, setUserData] = useState(props.user_data);

  useEffect(() => {
    setUserData(props.user_data);
  });

  return (
    <div className={`${styles.profile_container} ${styles.panel}`}>
      <AppImage
        src={userData.banner_image_url}
        className={styles.banner_image}
        alt="banner image"
      />
      <AppImage
        src={userData.profile_image_url}
        className={styles.profile_image}
        alt="profile image"
      />
      <h1 className={styles.user_fullname}>
        {userData.first_name} {userData.last_name}
      </h1>
      <div className={styles.about_me_container}>
        <h1 className={styles.panel_section_title}>About Me</h1>
        {userData.description ? (
          <p>{userData.description}</p>
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
                <b>{userData.followersCount}</b> followers
              </a>
              <a href="#">
                <b>{userData.followingCount}</b> following
              </a>
              <a href="#">
                <b>{userData.friendsCount}</b> friends
              </a>
            </div>
          </li>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <p>{userData.email}</p>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            <p>{userData.phone_number}</p>
          </li>
        </ul>
      </div>
      <p className={`${styles.view_profile_message} ${styles.panel_link}`}>
        <a href="#">View Profile</a>
      </p>
    </div>
  );

}
