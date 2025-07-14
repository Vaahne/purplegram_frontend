import { useParams } from 'react-router-dom';
import styles from './SingleUser.module.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext/auth';
import PostHeader from '../../components/postHeader/PostHeader';
import PostBody from '../../components/PostBody/PostBody';
import Comments from '../../components/Comments/Comments';
import { useError } from '../../context/errorHandlingContext/ErrorContext';
import apiRequest from '../../apiService/apiServiceCall';
import socket from '../../socket';
import { friendRequestInfo } from '../../context/friendRequestContext/FriendRequestContext';
import { userInfo } from '../../context/userContext/UserContext';
import EditPost from '../CreatePost/EditPost';
import ModalComponent from '../../components/ModalComponent/ModalComponent';


export default function SingleUser(){
    // const {fetchUser,searchedUser} = userInfo();
    const[searchedUser,setSearchedUser] = useState();
    const {setFriendRequests} = friendRequestInfo();
    const [editPost,setEditPost] = useState(null);
    const[isOpen,setIsOpen] = useState(false);

    const {user} = userInfo();

    const {cookies} = useAuth();
    const {showError} = useError();

    const {userId} = useParams();

    useEffect(()=>{

         async function fetchUser(){
            try {
                const userData = await apiRequest(`users/${userId}`,"GET",{},cookies.token,showError);
                setSearchedUser(userData);
                
            } catch (err) {
                console.error(err.message);
            }
        }

        fetchUser();
    },[userId]);
 
    async function handleClick(e){
        try {
            const resData = await apiRequest(`friendreq/${userId}`,"POST",{},cookies.token,showError);
            // console.log(`user:${user._id} and receiver: ${userId}`);
            socket.emit("sendFriendRequest",{
                senderId: user._id,
                receiverId: userId
            });
           
            e.target.innerHTML = "Pending";
            // console.log(resData);
        } catch (err) {
            console.error(err.message);
        }
    }

    async function deletePost(postId) {
        try {
            await apiRequest(`posts/${postId}`,
                "DELETE" , {},cookies.token,showError
            );

            alert("Successfully deleted the post");
        } catch (err) {
            console.error(err.message);
        }
    }

    function handleEditPost(post){
        if(user._id == post.userId){
            setIsOpen(true);
            setEditPost(post);
        }
    }

    async function handleRemove(p){
        try {
            if(p.userId == user._id){
                const deleteOrNot = confirm("Are you sure to delete the post?");
                if(deleteOrNot)
                    await deletePost(p._id);
                socket.emit("deletePost",p._id);
            }
            setSearchedUser(prev => ({
                ...prev,
                posts: prev.posts.filter(post=>post._id !== p._id)
            }));    
        } catch (err) {
            console.error(err.message);
        }
        
    }
    // console.log(searchedUser);
    return <div className={styles.parent}>
        {searchedUser &&  <div>
                <div className={styles.profile}>
                    <h3>{searchedUser.name}</h3>
                    <img className={styles.img} src={searchedUser.photo} alt={searchedUser.name}/>
                    {!searchedUser.isFriend && <button onClick={handleClick}>Connect</button>}
                </div>
                {/* Displaying the posts of particular user */}
                {
                searchedUser.posts.length == 0 ? (<h2 className={styles.noPosts}>No posts yet</h2>) :
                
                searchedUser.posts.map(post => {
                    return (
                    <>
                        <div key={post._id} className={styles.postContainer}>
                        <PostHeader  name={searchedUser.name} photo={searchedUser.photo} date={post.timestamp} onClose={()=>handleRemove(post)}/>
                         <div className={styles.postContent} onClick={() => handleEditPost(post)}>
                            <PostBody postType={post.postType} text={post.post_text} photo={post.post_photo}  />
                        </div>
                        <div className={styles.commentSection}>
                            <p>{post.likes.length>0 ? post.likes.length + 'likes' : ''}  </p>
                            <p>{post.comments.length>0 ? post.comments.length+ 'comments' : ''}  </p>
                        </div>
                        <hr/>
                        <Comments post={post}/>
                        {/* <Comments post={{...post,userId:{_id:searchedUser._id,name:searchedUser.name, photo:searchedUser.photo}}}/> */}
                        {/* {console.log('post in singel user',post)} */}
                        </div>
                    </>
                    )
                    }
                )}
                
            </div> }
            {editPost && <ModalComponent isOpen={isOpen} onClose={()=>setIsOpen(false)}>
                           <EditPost post={editPost} onClose={() => setEditPost(null)}  />
            </ModalComponent> }
    </div>
}