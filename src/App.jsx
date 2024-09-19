import Header from "./components/Header/Header"
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar"
import PostsSection from "./components/PostsSection/PostsSection"
import SuggestionsSection from "./components/SuggestionsSection/SuggestionsSection"
import styles from './App.module.css'


export default function App() {

  return (
    <div className={styles.root_page}>
      <Header/>
      <div className={styles.sections_outer_container}>
        <div className={styles.sections_inner_container}>
          <ProfileSidebar/>
          <PostsSection/>
          <SuggestionsSection/>
        </div>
      </div>
    </div>
  )

}
