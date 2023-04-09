import React from 'react'
import Axios from 'axios'
import { useState } from 'react'
import './profile.css'

function Profile(props) {
    console.log(props.userData);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const updateUsername = (e) => {
        e.preventDefault();
        // make axios put request to update this user from the database
        Axios.put("http://localhost:4000/api/put/updateUsername", JSON.stringify({ user:  props.userData, usernameVal: username }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => { 
            console.log(response);
        });
    }

    const updatePassword = (e) => {
        e.preventDefault();
        // make axios put request to update this user from the database
        Axios.put("http://localhost:4000/api/put/updateUserPassword", JSON.stringify({ user: props.userData, passwordVal: password }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => { 
            console.log(response);
        });
    }

    const updateEmail = (e) => {
        e.preventDefault();
        // make axios put request to update this user from the database
        Axios.put("http://localhost:4000/api/put/updateUserEmail", JSON.stringify({ user: props.userData, emailVal: email }), {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => { 
            console.log(response);
        });
    }

    const deleteUser = (e) => {
        props.userDeleted(false);
        // make axios delete request to delete this user from the database
        Axios.delete(`http://localhost:4000/api/delete/deleteUser/${ props.userData.data[0].userId }`, {
            headers: {
              'Content-Type': 'application/json'
            }
        }).then((response) => { 
            console.log(response);
        })
    }

    return (
        <div className='profile'>
            <div className='profile-container'>
                <div className='profile-inner-container'>
                    <form onSubmit={ updateUsername }>
                        <input className='profileInput' type='text' placeholder="enter username" onChange={(e) => {setUsername(e.target.value)}}></input>
                        <button className='profileButton'>Update Username</button>
                    </form>
                    <form onSubmit={ updatePassword }>
                        <input className='profileInput' type='password' placeholder="enter password" onChange={(e) => {setPassword(e.target.value)}}></input>
                        <button className='profileButton'>Update Password</button>
                    </form>
                    <form onSubmit={ updateEmail }>
                        <input className='profileInput' type='email' placeholder="enter email" onChange={(e) => {setEmail(e.target.value)}}></input>
                        <button className='profileButton'>Update Email</button>
                    </form>
                    <button className='deleteProfile' onClick={ deleteUser }>Delete Account</button>
                </div>
            </div>
        </div>
    )
}

export default Profile