import AutoResizeTextarea from '../../../../common/components/AutoResizeTextarea/AutoResizeTextarea'

import styles from './PostCreationPanel.module.css'
import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';


export default function PostCreationPanel(props) {

  const [profileImage, setProfileImage] = useState(props.image_src);

  useEffect(() => {
    setProfileImage(props.image_src);
  });

  return (
    <div className={styles.create_post_container}>
      <div className={styles.profile_img_title_container}>
        <AppImage 
          src={profileImage} 
          className={styles.profile_image} 
          alt="profile picture" 
        />
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
