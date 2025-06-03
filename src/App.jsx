import './App.css';
import NavBar from './components/NavBar/NavBar';
import { Routes,Route } from 'react-router-dom';
import Notifications from './components/Notifications';
import FriendRequest from './pages/FriendRequests';
// import dataContext from './context/dataContext.jsx';
// import Home from './pages/HomePage';
// import data from './utilities/data.mjs';
import Posts from './components/Posts/Posts';
import PageNotFound from './pages/PageNotFound';
// import AuthPage from './pages/AuthPage';
// import SideNav from './components/SideNav/SideNav';
import CreatePost from './pages/CreatePost/CreatePost.jsx';
import LandingPage from './pages/LandingPage/LandingPage.jsx';
import CreateUser from './pages/CreateUser/CreateUser.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Modal from 'react-modal';
import ProtectedRoutes from './components/ProtectedRoutes.jsx';

  function App() {
    Modal.setAppElement('#root');

    return (
      <>
        {/* <dataContext.Provider value={data}> */}
      <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path='/createuser' element={<CreateUser/>}/>

            <Route path='' element={<ProtectedRoutes/>}>
                {/* <NavBar/>
                <main className="displayContainer">
                    <SideNav/>
                    <div className='rightContainer'>  */}
                        {/* <Routes> */}
                            <Route path="/friendrequest" element={<FriendRequest/>}/>
                            <Route path="/notifications" element={<Notifications/>} />
                            <Route path='/settings' element={<Settings/>}/>
                            <Route path='/createpost' element={<CreatePost/>}/>
                            <Route path='/posts' element={<Posts/>}/>
                            <Route path="*" element={<PageNotFound/>}/>
                        {/* </Routes> */}
                    {/* </div>
                </main> */}
            </Route>
            {/* </dataContext.Provider> */}
        </Routes>        
      </>
    )
  }
  export default App