import styles from "./RightSection.module.css";
import section_styles from "../../../../styles/home_sections.module.css";

import AccountSuggestionSmall from "../../components/AccountSuggestionSmall/AccountSuggestionSmall";

import user from "../../../../assets/images/user.jpg";
import user2 from "../../../../assets/images/user2.jpg";
import user3 from "../../../../assets/images/user3.jpg";
import user4 from "../../../../assets/images/user4.jpg";
import user5 from "../../../../assets/images/user5.jpg";
import user6 from "../../../../assets/images/user6.jpg";

export default function RightSection() {
  return (
    <>
      <aside
        className={`${styles.suggestions_section} ${section_styles.section}`}
      >
        <div className={styles.outer_container}>
          <div className={`${styles.suggestions_container} ${styles.panel}`}>
            <h1 className={styles.title}>Suggested Accounts</h1>
            <ul>
              <li>
                <AccountSuggestionSmall
                  image={user}
                  firstname="James"
                  lastname="Elijah"
                  followers="137.801"
                />
              </li>
              <li>
                <AccountSuggestionSmall
                  image={user2}
                  firstname="Antonis"
                  lastname="Zikas"
                  followers="255.933"
                />
              </li>
              <li>
                <AccountSuggestionSmall
                  image={user3}
                  firstname="Liam"
                  lastname="Noam"
                  followers="121.360"
                />
              </li>
              <li>
                <AccountSuggestionSmall
                  image={user4}
                  firstname="Ava"
                  lastname="Evelyn"
                  followers="231.895"
                />
              </li>
              <li>
                <AccountSuggestionSmall
                  image={user5}
                  firstname="Mia"
                  lastname="Olivia"
                  followers="163.023"
                />
              </li>
              <li>
                <AccountSuggestionSmall
                  image={user6}
                  firstname="Robert"
                  lastname="Ralph"
                  followers="211.901"
                />
              </li>
            </ul>
            <p className={`${styles.show_more_message} ${styles.panel_link}`}>
              <a href="#">Show More</a>
            </p>
          </div>
        </div>
        <footer>
          <p>&copy;{new Date().getFullYear()} Career Sphere. All rights reserved.</p>
        </footer>
      </aside>
    </>
  );
}
