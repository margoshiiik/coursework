import React, {useState, useEffect, useContext} from "react";
import { NavLink as Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from '../context/AuthContext'

import './register.scss'


export default function RegistrationForm( ){

    const {setCurrentUser} = useContext(AuthContext); 

    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [err, setErr] = useState(null)

    const handleChange = e => {
        e.preventDefault(); 
        setInputs((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    console.log(inputs)

    const navigate = useNavigate();


    const handleClick = async e => {
        e.preventDefault(); 

        try {
            await axios.post("http://localhost:8800/api/auth/register", inputs)
            navigate("/login")
        } catch(err){
            setErr(err.response.data)
        }
    }



    const expression = /ukma.edu.ua$/;
    const regex = new RegExp(expression);
    

    // useEffect(() => {
    //     Axios.get('http://localhost:3001/api/get').then((response) => {
    //         setUsers(response.data)
    //         console.log(response.data)
    //     })        
    // }, [])


    // const submit = () => {
    //     console.log(users)
    //     let isUsernameTaken = users.find((elem) => elem.username === newUsername); 
    //     if(document.getElementById('flexRadioDefault1').value == 'on') setRole(1); 
    //     console.log(newUsername, newUseremail, newUserPassword, newUserPasswordAgain, role)
    //     if(newUserPassword !== newUserPasswordAgain) {
    //         alert('Password are not the same')
    //     } else if(isUsernameTaken) {
    //         alert('This username is taken')
    //     }
    //     else if (!newUseremail.match(expression)) {
    //         alert ('you are not from mohyla')
    //     }
    //     else {
    //         Axios.post('http://localhost:3001/api/register', {username: newUsername, email: newUseremail, password: newUserPassword, role: role})
    //         .then(()=> {
    //             alert('successful insert')
    //         }).then(() => {
    //             alert('you sucessfully registered')
    //         })
    //     }
    // }

    return (
        <div className="register">
            <div className="containerRegister">
                <h2>Registration</h2>
                <form>
                    <div>
                            <input type="text" id="usernameRegister" name="username" className="form-control mt-3" placeholder="Your Username" onChange={handleChange} required/>
                    </div>
                    <div>
                            <input type="email" id="emailRegister" name="email" className="form-control mt-3" placeholder="Your Email" onChange={handleChange} required/>
                    </div>
                    <div>
                            <input type="password" id="passwordRegister" name="password1" className="form-control mt-3" placeholder="Password" onChange={handleChange} required/>
                    </div>
                     <div>
                            <input type="password" id="form3Example1c" name="password2" className="form-control mt-3" placeholder="Repeat your Password" onChange={handleChange} required/>
                    </div> 

                    {err && err}
                    <button type="submit" className="btn btn-primary mt-3" onClick={handleClick}>Registration</button>
                </form>
                <div className="reg">
                    <p>Already have an account?</p>
                    <Link to="/login"> 
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}