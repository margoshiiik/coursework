import './navbar.scss';
import React, {useState,  useContext} from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LogoutIcon from '@mui/icons-material/Logout';
import FaceIcon from '@mui/icons-material/Face';
import AddIcon from '@mui/icons-material/Add';
import ChatIcon from '@mui/icons-material/Chat';
import { AuthContext } from '../context/AuthContext';
import { DarkModeContext } from '../context/DarkModeContext';
import axios from "axios";

const Navbar = () => {
    const {currentUser} = useContext(AuthContext)
    const {toggle} = useContext(DarkModeContext);
    const [err, setErr] = useState(null)

    const navigate = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        try{ 
            await axios.post("http://localhost:8800/api/auth/logout");
            navigate("/login");
        } catch(err) {
            setErr(err.response.data)
        }

        
        localStorage.setItem("user", JSON.stringify(null));
          
    }


    return (
        <div className='navbar'>
            <div className="left">
                <Link to="/" className= "link" style={{textDecoration: 'none'}}>
                    <HomeIcon />
                </Link>
                <DarkModeIcon onClick={toggle}/>
            </div>

            <h4>Hello, {currentUser.username}</h4>
            <div className="right">
                <AddIcon />
                <ChatIcon />
                <LogoutIcon onClick={handleLogout}/>
                <FaceIcon />
            </div>
        </div>
    )
}

export default Navbar;