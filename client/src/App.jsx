import React, { useEffect, useState } from "react"
import Header from "./components/Header/Header"
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar"
import PostsSection from "./components/PostsSection/PostsSection"
import SuggestionsSection from "./components/SuggestionsSection/SuggestionsSection"
import styles from './App.module.css'


export default function App() {

  const [activeNavigationTab, setActiveNavigationTab] = useState('homeTab');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/home/24', {method: 'GET'});
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } 
      catch (err) {
        setError(err);
      } 
      finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    
    <div className={styles.root_page}>
      <Header activeNavigationTab={activeNavigationTab} user_data={data}/>
      <div className={styles.sections_outer_container}>
        <div className={styles.sections_inner_container}>
          <ProfileSidebar user_data={data}/>
          <PostsSection/>
          <SuggestionsSection/>
        </div>
      </div>
    </div>
  )

}
