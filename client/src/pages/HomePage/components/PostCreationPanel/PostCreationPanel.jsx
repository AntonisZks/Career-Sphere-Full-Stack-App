import AutoResizeTextarea from '../../../../common/components/AutoResizeTextarea/AutoResizeTextarea'

import styles from './PostCreationPanel.module.css'
import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';

import default_profile_image_male from '../../../../assets/images/default_profile_image_male.png';
import default_profile_image_female from '../../../../assets/images/default_profile_image_female.png';

/**
 * Renders the post creation panel, allowing users to create new posts. 
 * It fetches the user's gender and handles the post input fields and media.
 * 
 * @param {any} props contains properties like userID and optionally image_src for profile image
 * @returns the XML code for the post creation panel
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 07/10/2024
 */
export default function PostCreationPanel(props) {

  const [userID, setUserID] = useState(props.userID);
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUserGender = async () => {

      const baseURL = 'http://localhost:8080';

      try {

        const response = await fetch(`${baseURL}/users/${props.userID}/gender`, { method: 'GET' });
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

  if (loading) return <div>Loading...</div>

  // Render JSX for the post creation panel
  return (
    <div className={styles.create_post_container}>
      
      <PostCreationPanelHeader image_src={props.image_src} gender={gender}/>
      <PostCreationPanelInputs/>
      <PostCreationPanelFooter/>

    </div>
  );
}

/**
 * Renders the header section of the post creation panel, including the user's profile image 
 * (based on gender) and the title of the post input section.
 * 
 * @param {any} props contains the image_src for the profile image and gender
 * @returns the XML code for the header of the post creation panel
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 07/10/2024
 */
function PostCreationPanelHeader(props) {

  let ProfileImage;

  if (props.image_src) {
    ProfileImage = <AppImage src={props.image_src} className={styles.profile_image} alt='profile image'/>
  } else {
    ProfileImage = props.gender === 'male'
      ? <img src={default_profile_image_male} className={styles.profile_image} alt="profile image" />
      : <img src={default_profile_image_female} className={styles.profile_image} alt="profile image" />
  }

  return (
    <div className={styles.profile_img_title_container}>
      {ProfileImage}
      <h1>What's On Your Mind?</h1>
    </div>
  )

}

/**
 * Renders the input fields for the post creation panel, including a title 
 * input field and a resizable textarea for the post description.
 * 
 * @returns the XML code for the input fields in the post creation panel
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 07/10/2024
 */
function PostCreationPanelInputs(props) {

  // Render JSX for the title and description inputs
  return (
    <>
      <input className={styles.post_title_input} type="text" placeholder="Post Title..."/>
      <AutoResizeTextarea className={styles.post_description_input} placeholder="Post Description..."/>
    </>
  )

}

/**
 * Renders the footer of the post creation panel, including buttons to add images or 
 * videos to the post and a publish button.
 * 
 * @returns the XML code for the footer in the post creation panel
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 07/10/2024
 */
function PostCreationPanelFooter(props) {

  // Render JSX for file buttons (add image/video) and the publish button
  return (
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
  )

}
