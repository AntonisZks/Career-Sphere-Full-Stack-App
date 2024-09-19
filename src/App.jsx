import Header from "./components/Header/Header"
import ProfileSidebar from "./components/ProfileSidebar/ProfileSidebar"
import PostsSection from "./components/PostsSection/PostsSection"

const styles = {
  backgroundColor: '#fff',
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gridTemplateRows: 'auto 1fr',
  gridTemplateAreas: "'header header' 'profileSidebar postsSection'"
}

export default function App() {

  return (
    <div className="root-page" style={styles}>
      <Header/>
    </div>
  )

}
