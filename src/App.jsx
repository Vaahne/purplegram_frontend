import './App.css';
import { Routes,Route } from 'react-router-dom';
import Notifications from './components/Notifications/Notifications';
import FriendRequest from './components/FriendRequest/FriendRequest';
import Posts from './components/Posts/Posts';
import PageNotFound from './pages/PageNotFound';
import CreatePost from './pages/CreatePost/CreatePost';
import LandingPage from './pages/LandingPage/LandingPage';
import CreateUser from './pages/CreateUser/CreateUser';
import Settings from './pages/Settings/Settings';
import Modal from 'react-modal';
import ProtectedRoutes from './components/ProtectedRoutes';
import SingleUser from './pages/SingleUser/SingleUser';
import ErrorModal from './components/ErrorModal/ErrorModal';
import SinglePost from './pages/SinglePost/SinglePost';
import useSocket from './context/socketContext/socketContext';
import Friends from './pages/Friends/Friends';

  function App() {
    Modal.setAppElement('#root');
    useSocket();
    
    return (
      <>
      <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path='/createuser' element={<CreateUser/>}/>

            <Route path='' element={<ProtectedRoutes/>}>
              <Route path="/friendrequest" element={<FriendRequest/>}/>
              <Route path="/notifications" element={<Notifications/>} />
              <Route path='/settings' element={<Settings/>}/>
              <Route path='/createpost' element={<CreatePost/>}/>
              <Route path='/posts' element={<Posts/>}/>
              <Route path="/singleuser/:userId" element={<SingleUser/>}/>
              <Route path="/singlepost" element={<SinglePost/>} />
              <Route path='/friends' element={<Friends/>}/>
              <Route path="*" element={<PageNotFound/>}/>
            </Route>
        </Routes>    
        <ErrorModal/>    
      </>
    )
  }
  export default App