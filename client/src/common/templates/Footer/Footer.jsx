import styles from './Footer.module.css';


export default function Footer() {

  return (
    <footer className={styles.footer}>
      <p>&copy;{new Date().getFullYear()} Career Sphere. All rights reserved.</p>
    </footer>
  )

}
