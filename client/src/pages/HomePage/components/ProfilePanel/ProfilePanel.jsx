import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';
import styles from './ProfilePanel.module.css';

import default_profile_image_male from '../../../../assets/images/default_profile_image_male.png';
import default_profile_image_female from '../../../../assets/images/default_profile_image_female.png';

/**
 * Renders the ProfilePanel component, which displays user information such as a profile image,
 * banner image, name, description, and social links. It consists of subcomponents that render
 * the user profile header, an about me section, and social media details.
 *
 * @param {any} props The properties of the ProfilePanel component
 * @returns The JSX code for the ProfilePanel component
 *
 * @author AntonisZks
 * @since 1.0.0
 * @date 27/09/2024
 */
export default function ProfilePanel(props) {

  const [userData, setUserData] = useState(props.user_data);
  const [userGender, setUserGender] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserGender = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${props.user_data.id}/gender`, { method: 'GET' });
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

  }, [props.user_data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Render JSX code of the ProfilePanel component with its individual subcomponents
  return (
    <div className={`${styles.profile_container} ${styles.panel}`}>

      <UserProfileHeader
        banner_image={props.banner_image}
        profile_image={props.profile_image}
        first_name={userData.firstName}
        last_name={userData.lastName}
        gender={userGender}
      />
      <AboutMe
        description={userData.description}
      />
      <Socials
        followers={userData.socials.followers}
        following={userData.socials.following}
        friends={userData.socials.friends}
        email={userData.socials.email}
        phoneNumber={userData.socials.phoneNumber}
      />

      <p className={`${styles.view_profile_message} ${styles.panel_link}`}>
        <a href="#">View Profile</a>
      </p>

    </div>
  );

}

/**
 * Renders the UserProfileHeader subcomponent, which includes the banner image, profile image,
 * and the user's full name. The banner and profile images have fallback options based on
 * the user's gender if no images are provided.
 *
 * @param {any} props The properties of the UserProfileHeader
 * @returns The JSX code for the UserProfileHeader subcomponent
 *
 * @author AntonisZks
 * @since 1.0.0
 * @date 27/09/2024
 */
function UserProfileHeader(props) {

  let BannerImage;
  let ProfileImage;

  // Handling banner image logic
  if (props.banner_image) {
    BannerImage = <AppImage src={props.banner_image} className={styles.banner_image} alt="banner image" />;
  } else {
    BannerImage = props.gender === 'male'
      ? <div className={`${styles.banner_image} ${styles.default_banner_male}`}></div>
      : <div className={`${styles.banner_image} ${styles.default_banner_female}`}></div>;
  }

  // Handling profile image logic
  if (props.profile_image) {
    ProfileImage = <AppImage src={props.profile_image} className={styles.profile_image} alt="profile image" />;
  } else {
    ProfileImage = props.gender === 'male'
      ? <img src={default_profile_image_male} className={styles.profile_image} alt="profile image" />
      : <img src={default_profile_image_female} className={styles.profile_image} alt="profile image" />;
  }

  // Returning JSX code for the profile panel header subcomponent
  return (
    <>
      {BannerImage}
      {ProfileImage}
      <h1 className={styles.user_fullname}>{props.first_name} {props.last_name}</h1>
    </>
  );
}

/**
 * Renders the AboutMe subcomponent, which displays a brief description of the user. If no
 * description is provided, a default message is shown. The description is truncated to the
 * first 10 words.
 *
 * @param {any} props The properties of the AboutMe subcomponent
 * @returns The JSX code for the AboutMe subcomponent
 *
 * @author AntonisZks
 * @since 1.0.0
 * @date 27/09/2024
 */
function AboutMe(props) {

  let Description;

  // Determine what the description should be
  (props.description)
    ? Description = <p>{props.description.split(' ').slice(0, 10).join(' ')} ...</p>
    : Description = <p className={styles.no_description_message}>No Description...</p>

  // Render JSX code of the AboutMe subcomponent
  return (
    <div className={styles.about_me_container}>
      <h1 className={styles.panel_section_title}>About Me</h1>
      {Description}
    </div>
  )

}

/**
 * Renders the Socials subcomponent, which displays the user's social information such as
 * the number of followers, following, friends, email, and phone number. Each social detail
 * is represented with an appropriate icon.
 *
 * @param {any} props The properties of the Socials subcomponent
 * @returns The JSX code for the Socials subcomponent
 *
 * @author AntonisZks
 * @since 1.0.0
 * @date 27/09/2024
 */
function Socials(props) {

  // Render JSX code of the socials subcomponent
  return (
    <div className={styles.socials_container}>
      <h1 className={styles.panel_section_title}>My Socials</h1>
      <ul>
        <li>
          <i className="fa-solid fa-users"></i>
          <div className={styles.associates_counters_container}>
            <a href="#"><b>{props.followers}</b> followers</a>
            <a href="#"><b>{props.following}</b> following</a>
            <a href="#"><b>{props.friends}</b> friends</a>
          </div>
        </li>
        <li>
          <i className="fa-solid fa-envelope"></i>
          <p>{props.email}</p>
        </li>
        <li>
          <i className="fa-solid fa-phone"></i>
          <p>{props.phoneNumber}</p>
        </li>
      </ul>
    </div>
  )

}
