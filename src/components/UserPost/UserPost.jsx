import styles from './UserPost.module.css'

import user from '../../assets/images/user.jpg'
import ai from '../../assets/images/ai.jpg'


export default function UserPost() {

  const post_description = "I’m excited to officially share that I have joined TechCorp as a Project Manager. This opportunity marks a significant milestone in my professional journey, and I’m looking forward to diving into the new challenges and opportunities that lie ahead.<br/><br/>At TechCorp, I will be working alongside an incredibly talented team, contributing to projects that focus on innovation and delivering meaningful solutions. I’m particularly excited about the company’s mission to leverage technology to solve real-world problems, which resonates deeply with my passion for driving impactful change through strategic project management.<br/><br/>Reflecting on my career path, I feel immense gratitude for all the experiences and lessons I’ve gained over the years. Each step—whether it was managing complex projects, building cross-functional teams, or navigating the ever-changing landscape of technology—has prepared me for this moment. I’m eager to bring my skills in leadership, communication, and problem-solving to TechCorp and collaborate with my new colleagues to drive success.<br/><br/>I would like to extend a heartfelt thank you to my mentors, colleagues, and friends who have supported and encouraged me throughout my career. Your guidance has been invaluable, and I’m excited to continue growing and learning in this next chapter.<br/><br/>I am looking forward to contributing to TechCorp’s continued success and working on projects that will not only challenge me but also allow me to make a meaningful impact. Here's to new beginnings, new challenges, and endless possibilities!";

  const fillPostDescription = () => {
    const description = document.getElementById('postDescription');
    description.innerHTML = post_description;
  }

  return (
    <div className={styles.post_container}>
      <div className={styles.post_header}>
        <img src={user} alt="profile_picture" width='100px' />
        <h1>James Elijah</h1>
        <p>2 days ago</p>
        <button className={styles.follow_button}>
          <i className="fa-solid fa-plus"></i>
          <p>Follow</p>
        </button>
        <button className={styles.more_button}>
          <i className="fa-solid fa-ellipsis"></i>
        </button>
      </div>
      <div className={styles.post_main_content}>
        <h1>Excited to Announce My New Role at TechCorp!</h1>
        <p id='postDescription'>{post_description.split(" ").splice(0, 20).join(" ")} <button onClick={fillPostDescription}>...read more</button></p>
        <img src={ai} alt="post image"/>
      </div>
      <div className={styles.post_footer}>

        {/* TODO: Add reactions and comments... */}
      
      </div>
    </div>
  )

}
