import AppImage from '../AppImage/AppImage'
import styles from './ConnectionProfile.module.css'


export default function ConnectionProfile(props) {

  return (
    <div className={styles.connection_profile_container}>
      <AppImage
        src={props.image_src}
        className={styles.connection_profile_image}
        alt='profile image'
      />
      <h1>{props.firstname} {props.lastname}</h1>
      {props.description ? (
        <p>{props.description.split(' ').splice(0, 3).join(' ')} ...</p>
      ) : (
        <p></p>
      )}
    </div>
  )

}
