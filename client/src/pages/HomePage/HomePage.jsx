import React, { useEffect, useState } from "react"
import Header from "../../common/templates/Header/Header"
import LeftSection from "./templates/LeftSection/LeftSection.jsx"
import PostsSection from "../../pages/HomePage/templates/PostsSection/PostsSection"
import RightSection from "../../pages/HomePage/templates/RightSection/RightSection"
import styles from './HomePage.module.css'


export default function HomePage({ userID }) {

  const [activeNavigationTab, setActiveNavigationTab] = useState('homeTab');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  return (
    
    <div className={styles.root_page}>
      <Header activeNavigationTab={activeNavigationTab} userID={userID}/>
      <div className={styles.sections_outer_container}>
        <div className={styles.sections_inner_container}>
          <LeftSection userID={userID}/>
          <PostsSection userID={userID}/>
          <RightSection userID={userID}/>
        </div>
      </div>
    </div>
  )

}
