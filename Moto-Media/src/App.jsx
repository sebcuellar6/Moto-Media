import Home from './components/Home'
import './App.css'
import LoginButton from './components/LoginButton'
import LogoutButton from './components/LogoutButton'
import Profile from './components/Profile'
import { Route, Routes } from 'react-router-dom'
import MainNavBar from './components/MainNavBar'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Forums from './components/Forums.jsx'
import MeetUps from './components/MeetUps.jsx'
import Messages from './components/Messages.jsx'
import Carousel from 'react-bootstrap/Carousel';
import ForumDetails from './components/ForumDetails.jsx'
import PostForum from './components/PostForum.jsx'
import Login from './components/LoginJWT.jsx'
import PostMeetUps from './components/PostMeetUps.jsx'
import MeetUpDetails from './components/MeetUpDetails.jsx'

function App() {

  return (
    <>
    <MainNavBar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='#profile' element={<Profile/>} />
      <Route path='/forums' element={<Forums/>} />
      <Route path='/forum-details/:id' element={<ForumDetails/>} />
      <Route path='/forum-post' element={<PostForum />} />
      <Route path='/meetups' element={<MeetUps/>} />
      <Route path='/meetups/:id' element={<MeetUpDetails/>} />
      <Route path='/meetups-post' element={<PostMeetUps/>} />
      <Route path='/messages' element={<Messages/>} />
    </Routes>
    </>
  )
}

export default App
