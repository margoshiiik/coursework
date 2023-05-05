import React, {useState, useContext} from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext'

import './login.scss'


export default function Login(){

    const {login, currentUser} = useContext(AuthContext); 

    const [inputs, setInputs] = useState({
        username: "",
        password: ""
    })

    const [err, setErr] = useState(null)

   
    const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate(`/profile/${currentUser.id}`);
    } catch (err) {
      setErr(err.response.data);
    }
  };

    const handleChange = e => {
        e.preventDefault(); 
        setInputs((prev)=>({...prev, [e.target.name]:e.target.value}))
    }


    return (
        <div className="login">
            <div className="containerLogin">
              <h2>Login</h2>
                <form className="form">
                    
                    <div>
                        <input type="text" id="usernameSign" name="username" className="form-control mt-3" placeholder="Your Username" onChange={handleChange} required/>
                    </div>
                    <div className="mt-3">
                        <input type="password" id="passwordSignIn" name="password" className="form-control mt-3" placeholder="Password" onChange={handleChange} required/>
                    </div>
                    <button type="submit" className="btn button--tertiary mt-4" onClick={handleLogin}>Login</button>
                </form>

            {err && err}
            
            <div className="reg">
                <p>Don't have an account?</p>
                <Link to="/register"> 
                    Register
                </Link>
            </div>
            </div>
        </div>
    )

}