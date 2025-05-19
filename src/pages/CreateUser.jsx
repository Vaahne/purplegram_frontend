import { useState } from "react"

export default function CreateUser(){
    const[formData,setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age:1,
        photo: ''
    });
    function handleChange(e){
        setFormData({...formData,[e.type.name]:e.type.value});
    }
    function handleSubmit(e){
        e.preventDefault();
    }
    return <>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange}/>
            <input type="email" name="email" placeholder="Email" onChange={handleChange}/>
            <input type="password" name="password" placeholder="Password" onChange={handleChange}/>
            <input type="number" name="age" min='1' max='100' placeholder="Age" onChange={handleChange}/>
            <input type="file" name="photo" placeholder="Profile photo" onChange={handleChange}/>
            <button >Create User</button>
        </form>
    </>
}