import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';
import styles from './ProfilePanel.module.css'


export default function ProfilePanel(props) {

  const [bannerImageURL, setBannerImageURL] = useState(props.banner_image);
  const [profileImageURL, setProfileImage] = useState(props.profile_image);
  const [userData, setUserData] = useState(props.user_data);

  useEffect(() => {
    setUserData(props.user_data);
  }, []);

  return (
    <div className={`${styles.profile_container} ${styles.panel}`}>
      <AppImage
        src={bannerImageURL}
        className={styles.banner_image}
        alt="banner image"
      />
      <AppImage
        src={profileImageURL}
        className={styles.profile_image}
        alt="profile image"
      />
      <h1 className={styles.user_fullname}>
        {userData.firstName} {userData.lastName}
      </h1>
      <div className={styles.about_me_container}>
        <h1 className={styles.panel_section_title}>About Me</h1>
        {userData.description ? (
          <p>{userData.description.split(' ').slice(0, 10).join(' ')} ...</p>
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
                <b>{userData.socials.followers}</b> followers
              </a>
              <a href="#">
                <b>{userData.socials.following}</b> following
              </a>
              <a href="#">
                <b>{userData.socials.friends}</b> friends
              </a>
            </div>
          </li>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <p>{userData.socials.email}</p>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>
            <p>{userData.socials.phoneNumber}</p>
          </li>
        </ul>
      </div>
      <p className={`${styles.view_profile_message} ${styles.panel_link}`}>
        <a href="#">View Profile</a>
      </p>
    </div>
  );

}
