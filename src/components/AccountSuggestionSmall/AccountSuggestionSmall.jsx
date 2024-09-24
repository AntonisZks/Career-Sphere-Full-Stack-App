import styles from './AccountSuggestionSmall.module.css'


export default function AccountSuggestionSmall(props) {
  return (
    <div className={styles.account_suggestion_container}>
      <img src={props.image} alt="profile picture" width='100px' />
      <h1 className={styles.suggestion_fullname}>{props.firstname} {props.lastname}</h1>
      <p>{props.followers} followers</p>
    </div>
  )
}