import styles from "./ProfileSidebar.module.css";
import section_styles from "../../styles/home_sections.module.css";

import { useEffect, useState } from "react";
import ProfileContainer from "../ProfileContainer/ProfileContainer";
import ConnectionsContainer from "../ConnectionsContainer/ConnectionsContainer";

export default function ProfileSidebar(props) {

  const [userData, setUserData] = useState(props.user_data);
  const [connections, setConnections] = useState(props.user_data.connections);

  useEffect(() => {

    setUserData(props.user_data);
    setConnections(props.user_data.connections);
  
  }, [props.user_data]);

  return (
    <aside className={`${styles.profile_sidebar_section} ${section_styles.section}`}>
      <div className={styles.outer_container}>
        <ProfileContainer user_data={userData}/>
        <ConnectionsContainer connections={connections}/>
      </div>
    </aside>
  );
}
