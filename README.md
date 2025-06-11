## Purplegram Front End
A social media web application built using the MERN stack. This is the frontend repository.
👉 Backend Repository
[Back End](https://github.com/Vaahne/purplegram_backend)
    installed react, react-icons, dotenv ,react-router-dom , react-modal

# 🚀 Tech Stack
+ React
+ React Router DOM
+ React Icons
+ React Modal
+ .env configuration
+ Socket.io-client

# 🔑 Features
🔐 Authentication
User Login (/)
User Registration (/createuser)

 # Posts
+ View all posts (/posts)
+ View a single post (/post/:id)
+ Create a new post (/create)
+ Edit and delete posts
+ Like and comment on posts

# 🔔 Notifications
+ View friend requests and activity updates

## Capability
- authentication
    - login - userLogin
    - signup - userRegister
- Show Posts
    - show all  routes
- Show one Post
    - show one route
- Add Post
- Edit Post
- delete Post
- show Notifications 


## Data modle for Posts
{
}

## pages
- Landing page/homepage - show all route - path:'/'
- Auth - path:'/auth'
    - login form 
    - register form (/createuser)
- User dashboard/posts/ notifications page - path:'/dashboard'
- show one post            - path:'/post/:id'
- create Post     - path:'/create'

- About page - later time
- checkout - later time

## steps to start building a FrontEnd
+ Wireframe
+ Containerzation
+ crate your vite
+ folder structure
    - components
    - utilities
    - pages
+ setup react-router-dom main.jsx
+ create very basic react page components for each page want to create
+ create routing for pages in app.jsx
+ create a super simple nav to navigate