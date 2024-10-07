import styles from './UserPost.module.css'

import { useEffect, useState } from 'react';
import AppImage from '../../../../common/components/AppImage/AppImage';

/**
 * Renders the XML code for a user's post. This includes fetching the author's 
 * profile data, the number of likes, dislikes, and comments, as well as rendering 
 * the post header, main content, and footer.
 * 
 * @param {any} props the properties of the UserPost, including post_data with details such as author_id and post_id
 * @returns the XML code of the user's post
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 07/10/2024
 */
export default function UserPost(props) {

  const [authorData, setAuthorData] = useState(null);
  const [postLikes, setPostLikes] = useState(0);
  const [postDislikes, setPostDislikes] = useState(0);
  const [postComments, setPostComments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAuthorData = async () => {

      const baseURL = 'http://localhost:8080';

      try {

        const response = await fetch(`${baseURL}/users/${props.post_data.author_id}/profileData`);
        const response2 = await fetch(`${baseURL}/users/${props.post_data.author_id}/profileImage`);
        const response3 = await fetch(`${baseURL}/home/posts/${props.post_data.post_id}/likes`);
        const response4 = await fetch(`${baseURL}/home/posts/${props.post_data.post_id}/dislikes`);
        const response5 = await fetch(`${baseURL}/home/posts/${props.post_data.post_id}/comments`);
        
        const result = await response.json();
        const result2 = await response2.json();
        const result3 = await response3.json();
        const result4 = await response4.json();
        const result5 = await response5.json();
        
        result.profile_image_url = result2.url;
        setAuthorData(result);
        setPostLikes(result3.likes);
        setPostDislikes(result4.dislikes);
        setPostComments(result5.comments);
  
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();

  }, []);

  if (loading) return <div>Loading Post...</div>

  // Render JSX code for the user post with its subcomponents
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
        comments={postComments}
      />

    </div>
  )

}

/**
 * Renders the XML code of the post header component. This includes the author's 
 * profile image, name, release date, and action buttons such as "Follow" and "More."
 * 
 * @param {any} props the properties of the PostHeader, including authorName and profileImageURL
 * @returns the XML code for the post header
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 07/10/2024
 */
function PostHeader(props) {

  // Render JSX code for the header of the post
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

/**
 * Renders the main content of the post, which includes the post title, 
 * description, and an optional image related to the post. A 'read more' 
 * button is available to expand the description.
 * 
 * @param {any} props the properties of the PostMainContent, including the title, 
 * description, and image_url of the post
 * @returns the XML code for the main content of the post
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 07/10/2024
 */
function PostMainContent(props) {

  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [imageURL, setImageURL] = useState(props.image_url);

  const fillPostDescription = () => {
    const description = document.getElementById('postDescription');
    description.innerText = props.post_data.description;
  }

  // Render JSX code for the main content of the post
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

/**
 * Renders the footer of the post, including buttons for likes, dislikes, 
 * comments, views, and additional social reactions (like share).
 * 
 * @param {any} props the properties of the PostFooter, including likes, 
 * dislikes, and comments count
 * @returns the XML code for the footer of the post
 * 
 * @AntonisZks
 * @since 1.0.0
 * @date 07/10/2024
 */
function PostFooter(props) {

  // Render JSX code for the post footer, including reactions and view/comments count
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
        <a href="#"><p><b>{props.comments}</b> comments</p></a>
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
