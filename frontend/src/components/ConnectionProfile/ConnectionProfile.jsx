import styles from './ConnectionProfile.module.css'


export default function ConnectionProfile(props) {
  return (
    <div className={styles.connection_profile_container}>
      <img src={props.image} alt="profile_picture"/>
      <h1>{props.firstname} {props.lastname}</h1>
      <p>{props.description.split(' ').splice(0, 3).join(' ')} ...</p>
    </div>
  )
}