import ConnectionProfile from "../../components/ConnectionProfile/ConnectionProfile";

import { useState, useEffect } from 'react';
import styles from './ConnectionsPanel.module.css'


export default function ConnectionsPanel(props) {

  const [connections, setConnections] = useState(props.connections);

  useEffect(() => {
    setConnections(props.connections);
  });

  // Render JSX code of the ConnectionsPanel component and its subcomponents
  return (
    <div className={`${styles.connections_container} ${styles.panel}`}>
      <div className={styles.network_container}>
        <h1 className={styles.panel_section_title}>My Network</h1>
        <ul>
          {props.connections.map((number, index) => (
            <li key={index}>
              <ConnectionProfile
                image_src={connections[index].profile_image_url}
                firstname={connections[index].first_name}
                lastname={connections[index].last_name}
                description={connections[index].description}
                gender={connections[index].gender}
              />
            </li>
          ))}
        </ul>
        <p className={`${styles.show_all_message} ${styles.panel_link}`}>
          <a href="#">Show All</a>
        </p>
      </div>
    </div>
  );

}
