import styles from './UserPost.module.css'

import user from '../../../../assets/images/user.jpg'
import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';


function PostHeader(props) {

  return (
    <div className={styles.post_header}>
      <AppImage
        src={props.profileImageURL}
        alt="profile_picture"
      />
      <a href='#'><h1>{props.authorName}</h1></a>
      <p>{props.releaseDate}</p>
      <button className={styles.follow_button}>
        <i className="fa-solid fa-plus"></i>
        <p>Follow</p>
      </button>
      <button className={styles.more_button}>
        <i className="fa-solid fa-ellipsis"></i>
      </button>
    </div>
  )

}


export default function UserPost(props) {

  const [authorData, setAuthorData] = useState(null);
  const [description, setDescription] = useState("This is a description");
  const [loading, setLoading] = useState(true);

  const fillPostDescription = () => {
    const description = document.getElementById('postDescription');
    description.innerText = props.post_data.description;
  }

  useEffect(() => {

    const fetchAuthorData = async () => {
      try {

        const response = await fetch(`http://localhost:8080/users/${props.post_data.author_id}/profileData`);
        const response2 = await fetch(`http://localhost:8080/users/${props.post_data.author_id}/profileImage`);

        const result = await response.json();
        const result2 = await response2.json();

        result.profile_image_url = result2.url;
        setAuthorData(result);
        setDescription(props.post_data.description);
  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();

  }, []);

  if (loading) return <div>Loading...</div>

  return (
    <div className={styles.post_container}>

      <PostHeader 
        authorName={`${authorData.firstName} ${authorData.lastName}`} 
        releaseDate="2 days ago"
        profileImageURL={authorData.profile_image_url}
      />

      <div className={styles.post_main_content}>
        <h1>{props.post_data.title}</h1>
        <p id='postDescription'>
          {description.split(" ").splice(0, 20).join(" ")}
          <button onClick={fillPostDescription}>...read more</button>
        </p>
        <AppImage
          src={props.post_data.image_url}
          alt="post image"
        />
      </div>
      <div className={styles.post_footer}>

        <div className={styles.reactions_container}>
          <button>
            <div className={styles.reaction}>
              <i className="fa-regular fa-thumbs-up"></i>
              <p>1.5K</p>
            </div>
            <div className={styles.reaction}>
              <i className="fa-regular fa-thumbs-down"></i>
              <p>308</p>
            </div>
          </button>
        </div>

        <div className={styles.views_comments_container}>
          <a href="#"><p><b>2K</b> views</p></a>
          <a href="#"><p><b>482</b> comments</p></a>
        </div>
        <div className={styles.react_buttons_container}>
          <button className={styles.react_button}>
            <i className="fa-regular fa-thumbs-up"></i>
            <p>Like</p>
          </button>
          <button className={styles.react_button}>
            <i className="fa-regular fa-thumbs-down"></i>
            <p>Dislike</p>
          </button>
          <button className={styles.react_button}>
            <i className="fa-regular fa-comment-dots"></i>
            <p>Comment</p>
          </button>
          <button className={styles.react_button}>
            <i className="fa-solid fa-share"></i>
            <p>Share</p>
          </button>
          
        </div>
      
      </div>
    </div>
  )

}
