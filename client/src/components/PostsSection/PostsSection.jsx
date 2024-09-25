import styles from './PostsSection.module.css'
import section_styles from '../../styles/home_sections.module.css'

import PostCreationPanel from '../PostCreationPanel/PostCreationPanel'
import UserPost from '../UserPost/UserPost'

import ai from '../../assets/images/ai.jpg'
import group from '../../assets/images/group.jpg'
import uoa from '../../assets/images/uoa.jpg'



export default function PostsSection() {

  return (
    <div className={`${styles.posts_section} ${section_styles.section}`}>
      <PostCreationPanel/>
      <div className={styles.posts_list_outer_container}>
        <UserPost image={ai}/>
        <UserPost image={group}/>
        <UserPost image={uoa}/>
      </div>
    </div>
  )

}
