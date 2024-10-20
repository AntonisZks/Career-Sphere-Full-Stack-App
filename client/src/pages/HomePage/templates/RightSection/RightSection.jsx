import styles from "./RightSection.module.css";
import section_styles from "../../../../styles/home_sections.module.css";

import AccountSuggestionSmall from "../../components/AccountSuggestionSmall/AccountSuggestionSmall";
import Footer from "../../../../common/templates/Footer/Footer.jsx";

import user from "../../../../assets/images/user.jpg";
import user2 from "../../../../assets/images/user2.jpg";
import user3 from "../../../../assets/images/user3.jpg";
import user4 from "../../../../assets/images/user4.jpg";
import user5 from "../../../../assets/images/user5.jpg";
import user6 from "../../../../assets/images/user6.jpg";
import { useEffect, useState } from "react";

export default function RightSection(props) {

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchSuggestions = async () => {

      const baseURL = 'http://localhost:8080';

      try {

        const response = await fetch(`${baseURL}/users/${props.userID}/suggestions`, { method: 'GET' });
        const result = await response.json();
        setSuggestions(result);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }

    };

    fetchSuggestions();

  })

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <aside className={`${styles.suggestions_section} ${section_styles.section}`}>
      <section className={styles.outer_container}>
        <div className={`${styles.suggestions_container} ${styles.panel}`}>
          <h1 className={styles.title}>Suggested Accounts</h1>
          <ul>
            {suggestions.map((number, index) => (
              <li key={index}>
                <AccountSuggestionSmall 
                  image={suggestions[index].profile_image_url}
                  firstname={suggestions[index].first_name}
                  lastname={suggestions[index].last_name}
                  followers={suggestions[index].followers}
                />
              </li>
            ))}
          </ul>
          <p className={`${styles.show_more_message} ${styles.panel_link}`}>
            <a href="#">Show More</a>
          </p>
        </div>
      </section>
      <Footer/>
    </aside>
  );
}
