import ConnectionProfile from "../ConnectionProfile/ConnectionProfile";
import styles from "./ProfileSidebar.module.css";
import section_styles from "../../styles/home_sections.module.css";
import banner from "../../assets/images/banner.jpg";
import profile_image from "../../assets/images/profile_image.jpg";

import user from "../../assets/images/user.jpg";
import user3 from "../../assets/images/user3.jpg";
import user5 from "../../assets/images/user5.jpg";
import user7 from "../../assets/images/user7.jpg";
import user9 from "../../assets/images/user9.jpg";

export default function ProfileSidebar() {
  return (
    <aside className={`${styles.profile_sidebar_section} ${section_styles.section}`}>
      <div className={styles.outer_container}>
        <div className={`${styles.profile_container} ${styles.panel}`}>
          <img
            src={banner}
            className={styles.banner_image}
            alt="banner image"
          />
          <img
            src={profile_image}
            className={styles.profile_image}
            alt="profile picture"
          />
          <h1 className={styles.user_fullname}>Antonis Zikas</h1>
          <div className={styles.about_me_container}>
            <h1 className={styles.panel_section_title}>About Me:</h1>
            <p>
              Hi! I'm a student at University of Athens and I am currently
              studing Computer Sciense at Department of Informatics and
              Telecommunications
            </p>
          </div>
          <div className={styles.socials_container}>
            <h1 className={styles.panel_section_title}>My Socials:</h1>
            <ul>
              <li>
                <i className="fa-solid fa-users"></i>
                <div className={styles.associates_counters_container}>
                  <a href="#">
                    <b>255K</b> followers
                  </a>
                  <a href="#">
                    <b>243K</b> following
                  </a>
                  <a href="#">
                    <b>208K</b> friends
                  </a>
                </div>
              </li>
              <li>
                <i className="fa-solid fa-envelope"></i>
                <p>antoniszikas2003@gmail.com</p>
              </li>
              <li>
                <i className="fa-solid fa-phone"></i>
                <p>6944994672</p>
              </li>
            </ul>
          </div>
          <p className={`${styles.view_profile_message} ${styles.panel_link}`}>
            <a href="#">View Profile</a>
          </p>
        </div>
        <div className={`${styles.connections_container} ${styles.panel}`}>
          <div className={styles.network_container}>
            <h1 className={styles.panel_section_title}>My Network:</h1>
            <ul>
              <li>
                <ConnectionProfile
                  image={user}
                  firstname="James"
                  lastname="Elijah"
                  description="Results-driven project manager with a focus on team leadership, process optimization, and delivering high-quality projects. Passionate about continuous improvement."
                />
              </li>
              <li>
                <ConnectionProfile
                  image={user3}
                  firstname="Liam"
                  lastname="Noam"
                  description="Experienced digital marketer specializing in SEO, content strategy, and analytics. Passionate about driving growth through data-driven, creative solutions."
                />
              </li>
              <li>
                <ConnectionProfile
                  image={user5}
                  firstname="Mia"
                  lastname="Olivia"
                  description="Skilled software engineer with expertise in full-stack development, problem-solving, and optimizing user experiences. Passionate about innovative technology and collaboration."
                />
              </li>
              <li>
                <ConnectionProfile
                  image={user7}
                  firstname="John"
                  lastname="Scott"
                  description="Detail-oriented graphic designer with expertise in branding, illustration, and visual storytelling. Committed to creating impactful and innovative designs."
                />
              </li>
              <li>
                <ConnectionProfile
                  image={user9}
                  firstname="Mary"
                  lastname="Brend"
                  description="Data analyst proficient in data visualization, statistical analysis, and business insights. Dedicated to turning complex data into actionable solutions."
                />
              </li>
            </ul>
            <p className={`${styles.shoe_all_message} ${styles.panel_link}`}>
              <a href="#">Show All</a>
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
