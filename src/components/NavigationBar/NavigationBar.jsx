import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <nav id="navigationBar" className={styles.navigation_bar}>
      <ul>
        <li>
          <a href="#">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-solid fa-user-group"></i>
            <p>Network</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-solid fa-magnifying-glass"></i>
            <p>Jobs</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-solid fa-comments"></i>
            <p>Discussions</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-solid fa-bell"></i>
            <p>Notifications</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-solid fa-user"></i>
            <p>Personal Data</p>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-solid fa-gear"></i>
            <p>Settings</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}
