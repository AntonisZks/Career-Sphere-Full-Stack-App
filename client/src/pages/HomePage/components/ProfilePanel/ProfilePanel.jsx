import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';
import styles from './ProfilePanel.module.css'

import default_profile_image_male from '../../../../assets/images/default_profile_image_male.png'
import default_profile_image_female from '../../../../assets/images/default_profile_image_female.png'


export default function ProfilePanel(props) {

  const [userData, setUserData] = useState(props.user_data);
  const [userGender, setUserGender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserGender = async () => {
      try {

        const response = await fetch(`http://localhost:8080/users/${props.user_data.id}/gender`, {method: 'GET'});
        const result = await response.json();
        setUserGender(result.gender);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGender();

    setUserData(props.user_data);

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`${styles.profile_container} ${styles.panel}`}>
      {(props.banner_image !== null) ? (
        <AppImage
          src={props.banner_image}
          className={styles.banner_image}
          alt="banner image"
        />
      ) : (
        <>
          {(userGender === 'male') ? (
            <div className={`${styles.banner_image} ${styles.default_banner_male}`}></div>
          ) : (
            <div className={`${styles.banner_image} ${styles.default_banner_female}`}></div>
          )}
        </>
      )}

      {(props.profile_image !== null) ? (
        <AppImage
          src={props.profile_image}
          className={styles.profile_image}
          alt="profile image"
        />
      ) : (
        <>
          {(userGender === 'male') ? (
            <img
              src={default_profile_image_male}
              className={styles.profile_image}
              alt="profile image"
            />
          ) : (
            <img
              src={default_profile_image_female}
              className={styles.profile_image}
              alt="profile image"
            />
          )}
        </>
      )}

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
