import { useState } from "react";
import axios from "axios";
import {useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import { NavLink as Link, useNavigate } from "react-router-dom";


function AddRoomBar() {
    const {currentUser} = useContext(AuthContext); 

    const [roomName, setRoomName] = useState('')
 
    const [err, setErr] = useState(null)

    const navigate = useNavigate();

    function generateCode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }


    const handleClick = async e => {
        e.preventDefault(); 
        const code = generateCode(30); 
        const values = {name: roomName, code: code , user_id: currentUser.id}

        try {
            await axios.post("http://localhost:8800/api/rooms/addRoom", values)
            navigate(`/profile/${currentUser.id}/room/${roomName}`)
        } catch(err){
            setErr(err.response.data)
        }
    }

    return(
        <div className="input-group mb-3 mt-3">
            <input type="text" className="form-control" placeholder="Enter room name" onChange={(e) => setRoomName(e.target.value)}/>
            <div className="input-group-append">
             <button className="btn btn-outline-secondary" type="button" onClick={handleClick}>Create Room</button>
            </div>
        </div>
    )
}

export default AddRoomBar; 