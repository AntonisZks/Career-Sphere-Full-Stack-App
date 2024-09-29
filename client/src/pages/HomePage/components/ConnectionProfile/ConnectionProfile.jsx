import AppImage from '../../../../common/components/AppImage/AppImage'
import styles from './ConnectionProfile.module.css'

import default_profile_image_male from '../../../../assets/images/default_profile_image_male.png';
import default_profile_image_female from '../../../../assets/images/default_profile_image_female.png';


export default function ConnectionProfile(props) {

  let ProfileImage, description;

  // Handle the profile image of the connection
  if (props.image_src) {
    ProfileImage = <AppImage src={props.image_src} className={styles.connection_profile_image} alt='profile image'/>
  } else {
    ProfileImage = props.gender === 'male'
      ? <img src={default_profile_image_male} className={styles.connection_profile_image} alt="profile image" />
      : <img src={default_profile_image_female} className={styles.connection_profile_image} alt="profile image" />
  }

  // Determine the description
  description = props.description ? props.description.split(' ').splice(0, 3).join(' ') : '';

  // Render JSX code of the ConnectionProfile component
  return (
    <div className={styles.connection_profile_container}>
      {ProfileImage}
      <h1>{props.firstname} {props.lastname}</h1>
      <p>{description}</p>
    </div>
  )

}
