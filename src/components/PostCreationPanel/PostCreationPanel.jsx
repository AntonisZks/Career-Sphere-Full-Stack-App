import AutoResizeTextarea from '../AutoResizeTextarea/AutoResizeTextarea'
import profile_image from '../../assets/images/profile_image.jpg'

import styles from './PostCreationPanel.module.css'


export default function PostCreationPanel() {
  return (
    <div className={styles.create_post_container}>
      <div className={styles.profile_img_title_container}>
        <img src={profile_image} alt="profile picture" />
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
