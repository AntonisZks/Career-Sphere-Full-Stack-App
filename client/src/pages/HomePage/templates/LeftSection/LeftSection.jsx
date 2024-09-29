import styles from "./LeftSidebar.module.css";
import section_styles from "../../../../styles/home_sections.module.css";

import { useEffect, useState } from "react";
import ProfilePanel from "../../components/ProfilePanel/ProfilePanel";
import ConnectionsPanel from "../../components/ConnectionsPanel/ConnectionsPanel";


export default function LeftSection(props) {

  const [userID, setUserID] = useState(props.userID);
  const [userBannerImageURL, setUserBannerImageURL] = useState("");
  const [userProfileImageURL, setUserProfileImageURL] = useState("");
  const [userProfileData, setUserProfileData] = useState({});
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserProfileData = async () => {
      try {

        const [response, response2, response3, response4] = await Promise.all([
          fetch(`http://localhost:8080/users/${userID}/profileData`),
          fetch(`http://localhost:8080/users/${userID}/profileImage`),
          fetch(`http://localhost:8080/users/${userID}/bannerImage`),
          fetch(`http://localhost:8080/users/${userID}/connections`),
        ])

        const profileData = await response.json();
        const profileImage = await response2.json();
        const bannerImage = await response3.json();
        const connections = await response4.json();

        setUserProfileData(profileData);
        setUserProfileImageURL(profileImage.url);
        setUserBannerImageURL(bannerImage.url);
        setConnections(connections);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfileData();

  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <aside className={`${styles.profile_sidebar_section} ${section_styles.section}`}>
      <section className={styles.outer_container}>
        <ProfilePanel
          banner_image={userBannerImageURL}
          profile_image={userProfileImageURL}
          user_data={{'id': userID, ...userProfileData}}/>
        <ConnectionsPanel
          connections={connections}
        />
      </section>
    </aside>
  );
}
