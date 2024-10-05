import styles from './UserPost.module.css'

import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';


export default function UserPost(props) {

  const [authorData, setAuthorData] = useState(null);
  const [postLikes, setPostLikes] = useState(0);
  const [postDislikes, setPostDislikes] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAuthorData = async () => {

      const baseURL = 'http://localhost:8080';

      try {

        const response = await fetch(`${baseURL}/users/${props.post_data.author_id}/profileData`);
        const response2 = await fetch(`${baseURL}/users/${props.post_data.author_id}/profileImage`);
        const response3 = await fetch(`${baseURL}/home/posts/${props.post_data.post_id}/likes`);
        const response4 = await fetch(`${baseURL}/home/posts/${props.post_data.post_id}/dislikes`);
        

        const result = await response.json();
        const result2 = await response2.json();
        const result3 = await response3.json();
        const result4 = await response4.json();

        result.profile_image_url = result2.url;
        setAuthorData(result);
        setPostLikes(result3.likes);
        setPostDislikes(result4.dislikes);
  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();

  }, []);

  if (loading) return <div>Loading Post...</div>

  return (
    <div className={styles.post_container}>

      <PostHeader 
        authorName={`${authorData.firstName} ${authorData.lastName}`} 
        releaseDate="2 days ago"
        profileImageURL={authorData.profile_image_url}
      />

      <PostMainContent 
        title={props.post_data.title} 
        description={props.post_data.description} 
        image_url={props.post_data.image_url}
      />

      <PostFooter
        likes={postLikes}
        dislikes={postDislikes}
      />

    </div>
  )

}

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

function PostMainContent(props) {

  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [imageURL, setImageURL] = useState(props.image_url);

  const fillPostDescription = () => {
    const description = document.getElementById('postDescription');
    description.innerText = props.post_data.description;
  }

  return (
    <div className={styles.post_main_content}>
      <h1>{title}</h1>
      <p id='postDescription'>
        {description.split(" ").splice(0, 20).join(" ")}
        <button onClick={fillPostDescription}>...read more</button>
      </p>
      <AppImage
        src={imageURL}
        alt="post image"
      />
    </div>
  )

}

function PostFooter(props) {

  return (
    <div className={styles.post_footer}>

      <div className={styles.reactions_container}>
        <button>
          <div className={styles.reaction}>
            <i className="fa-regular fa-thumbs-up"></i>
            <p>{props.likes}</p>
          </div>
          <div className={styles.reaction}>
            <i className="fa-regular fa-thumbs-down"></i>
            <p>{props.dislikes}</p>
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
  )

}
