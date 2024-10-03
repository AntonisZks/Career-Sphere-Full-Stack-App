import AutoResizeTextarea from '../../../../common/components/AutoResizeTextarea/AutoResizeTextarea'

import styles from './PostCreationPanel.module.css'
import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';

import default_profile_image_male from '../../../../assets/images/default_profile_image_male.png';
import default_profile_image_female from '../../../../assets/images/default_profile_image_female.png';


export default function PostCreationPanel(props) {

  const [userID, setUserID] = useState(props.userID);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserGender = async () => {
      try {

        const response = await fetch(`http://localhost:8080/users/${props.userID}/gender`, { method: 'GET' });
        const result = await response.json();
        setGender(result.gender);
      
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserGender();

  }, [props.userID]);

  let ProfileImage;

  if (props.image_src) {
    ProfileImage = <AppImage src={props.image_src} className={styles.profile_image} alt='profile image'/>
  } else {
    ProfileImage = gender === 'male'
      ? <img src={default_profile_image_male} className={styles.profile_image} alt="profile image" />
      : <img src={default_profile_image_female} className={styles.profile_image} alt="profile image" />
  }

  return (
    <div className={styles.create_post_container}>
      <div className={styles.profile_img_title_container}>
        {ProfileImage}
        <h1>What's On Your Mind?</h1>
      </div>
      <input
        className={styles.post_title_input}
        type="text"
        placeholder="Post Title..."
      />
      <AutoResizeTextarea
        className={styles.post_description_input}
        placeholder="Post Description..."
      />
      <div className={styles.create_post_footer}>
        <div className={styles.file_buttons_container}>
          <button className={styles.add_image_button}>
            <i className="fa-solid fa-image"></i>
            <p>Add Image</p>
          </button>
          <button className={styles.add_video_button}>
            <i className="fa-solid fa-video"></i>
            <p>Add Video</p>
          </button>
        </div>
        <div className={styles.publish_container}>
          <button className={styles.publish_button}>Publish</button>
        </div>
      </div>
    </div>
  );
}
