import styles from "./LeftSidebar.module.css";
import section_styles from "../../../../styles/home_sections.module.css";

import { useEffect, useState } from "react";
import ProfileContainer from "../../components/ProfilePanel/ProfilePanel";
import ConnectionsContainer from "../../components/ConnectionsPanel/ConnectionsPanel";


export default function LeftSection(props) {

  const [userData, setUserData] = useState(props.user_data);
  const [connections, setConnections] = useState(props.user_data.connections);

  useEffect(() => {

    setUserData(props.user_data);
    setConnections(props.user_data.connections);
  
  }, [props.user_data]);

  return (
    <aside className={`${styles.profile_sidebar_section} ${section_styles.section}`}>
      <section className={styles.outer_container}>
        <ProfileContainer user_data={userData}/>
        <ConnectionsContainer connections={connections}/>
      </section>
    </aside>
  );
}
