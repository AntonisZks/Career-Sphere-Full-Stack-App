import styles from './AccountSuggestionSmall.module.css'
import AppImage from '../../../../common/components/AppImage/AppImage'

import default_profile_image_male from '../../../../assets/images/default_profile_image_male.png';
import default_profile_image_female from '../../../../assets/images/default_profile_image_female.png';


export default function AccountSuggestionSmall(props) {

  let ProfileImage;

  // Handle the profile image of the suggestion
  if (props.image) {
    ProfileImage = <AppImage src={props.image} alt='profile image'/>
  } else {
    ProfileImage = props.gender === 'male'
      ? <img src={default_profile_image_male} className={styles.connection_profile_image} alt="profile image" />
      : <img src={default_profile_image_female} className={styles.connection_profile_image} alt="profile image" />
  }

  return (
    <div className={styles.account_suggestion_container}>
      {ProfileImage}
      <h1 className={styles.suggestion_fullname}>{props.firstname} {props.lastname}</h1>
      <p>{props.followers} followers</p>
    </div>
  )
}
