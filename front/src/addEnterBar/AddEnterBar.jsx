import './addEnterBar.scss'
import React, {useState,  useContext} from "react";
import { NavLink as Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";

function AddEnterBar({question, action}) {


    const [code, setCode] = useState('')
    const {currentUser} = useContext(AuthContext); 
    
    const [err, setErr] = useState(null)
    
    const navigate = useNavigate();
    
    const handleEnterRoom = async (e) => {
        e.preventDefault();
        axios.get(`http://localhost:8800/api/rooms/enterRoom`, { params: { code: code, user_id: currentUser.id} })
          .then(response => {
            console.log(response.data)
            navigate(`/profile/${currentUser.id}/room/${response.data}`)
        })
    }


    return (
        <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter the room code" onChange={(e) => setCode(e.target.value)}/>
            <div className="input-group-append">
             <button className="btn btn-outline-secondary" type="button" onClick={handleEnterRoom}>Enter</button>
            </div>
        </div>
    )
}

export default AddEnterBar; 