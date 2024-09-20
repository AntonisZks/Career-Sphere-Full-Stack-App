import styles from './UserPost.module.css'

import user from '../../assets/images/user.jpg'


export default function UserPost() {

  return (
    <div className={styles.post_container}>
      <div className={styles.post_header}>
        <img src={user} alt="profile_picture" width='100px' />
        <h1>James Elijah</h1>
        <p>2 days ago</p>
      </div>
      <div className={styles.post_main_content}>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia aut suscipit eos distinctio qui laudantium consequatur, a temporibus reprehenderit consequuntur delectus nesciunt ullam impedit totam quam dolor quis deleniti voluptatum. Eaque iste nesciunt quas fugit a. Assumenda soluta a deleniti iusto ex, voluptatibus laborum ut vel exercitationem delectus. Adipisci voluptates dicta necessitatibus ipsa excepturi porro accusamus eligendi neque quidem eum. Libero necessitatibus officia earum laborum excepturi quidem, aliquam illum nisi. Quam vero et culpa unde ipsa, omnis saepe sequi! Dolorum quas quia natus doloribus et? Explicabo illum ipsum ullam, quia unde odit laborum possimus, officiis dignissimos doloremque exercitationem atque nobis!</p>
      </div>
      <div className={styles.post_footer}>

        {/* TODO: Add reactions and comments... */}
      
      </div>
    </div>
  )

}
