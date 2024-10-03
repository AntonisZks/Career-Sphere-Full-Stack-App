import styles from './PostsSection.module.css'
import section_styles from '../../../../styles/home_sections.module.css'

import PostCreationPanel from '../../components/PostCreationPanel/PostCreationPanel'
import UserPost from '../../components/UserPost/UserPost'

import ai from '../../../../assets/images/ai.jpg'
import group from '../../../../assets/images/group.jpg'
import uoa from '../../../../assets/images/uoa.jpg'
import { useState, useEffect } from 'react'


export default function PostsSection(props) {

  const [userID, setUserID] = useState(props.userID);
  const [userProfileImageURL, setUserProfileImageURL] = useState("");
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState('true');

  useEffect(() => {
    
    const fetchUserProfileData = async () => {
      try {

        const response = await fetch(`http://localhost:8080/users/${userID}/profileImage`);
        const response2 = await fetch(`http://localhost:8080/home/posts?uid=${userID}`);

        const profileImage = await response.json();
        const posts = await response2.json();

        setUserProfileImageURL(profileImage.url);
        setPosts(posts);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }

    };

    fetchUserProfileData();
    
  }, []);

  if (loading) { return <div>Loading...</div> }

  return (
    <section className={`${styles.posts_section} ${section_styles.section}`}>
      <PostCreationPanel image_src={userProfileImageURL} userID={userID}/>
      {/* <div className={styles.posts_list_outer_container}>
        <UserPost image={ai}/>
        <UserPost image={group}/>
        <UserPost image={uoa}/>
      </div> */}
    </section>
  )

}
