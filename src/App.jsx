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
import AuthPage from './pages/AuthPage';
import SideNav from './components/SideNav/SideNav';
import CreatePost from './pages/CreatePost';
import LandingPage from './pages/LandingPage/LandingPage.jsx';

  function App() {


    return (
      <>
        {/* <dataContext.Provider value={data}> */}
        <NavBar/>
        <main className="displayContainer">
            <SideNav/>
            <div className='rightContainer'> 
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/friendrequest" element={<FriendRequest/>}/>
                    <Route path="/notifications" element={<Notifications/>} />
                    <Route path='/auth' element={<AuthPage/>}/>
                    <Route path='/create' element={<CreatePost/>}/>
                    <Route path='/posts' element={<Posts/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </div>
        </main>
        {/* </dataContext.Provider> */}
      </>
    )
  }
  export default App