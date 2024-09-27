import styles from './PostsSection.module.css'
import section_styles from '../../../../styles/home_sections.module.css'

import PostCreationPanel from '../../components/PostCreationPanel/PostCreationPanel'
import UserPost from '../../components/UserPost/UserPost'

import ai from '../../../../assets/images/ai.jpg'
import group from '../../../../assets/images/group.jpg'
import uoa from '../../../../assets/images/uoa.jpg'
import { useState, useEffect } from 'react'


export default function PostsSection(props) {

  const [userData, setUserData] = useState(props.user_data);

  useEffect(() => {
    setUserData(props.user_data);
  });

  return (
    <section className={`${styles.posts_section} ${section_styles.section}`}>
      <PostCreationPanel image_src={userData.profile_image_url}/>
      <div className={styles.posts_list_outer_container}>
        <UserPost image={ai}/>
        <UserPost image={group}/>
        <UserPost image={uoa}/>
      </div>
    </section>
  )

}
