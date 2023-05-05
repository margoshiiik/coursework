import './Room.scss'
import photo from './logo192.png'
import React, {useState,  useContext, useEffect} from "react";
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import { NavLink as Link, useNavigate } from "react-router-dom";

function Room({room_name}) {

    const {currentUser} = useContext(AuthContext); 
    const navigate = useNavigate();

    const handleClick = async e => {
        e.preventDefault(); 
        let name = e.target.name;

        navigate(`/profile/${currentUser.id}/room/${name}`)
    }

    console.log(room_name)


    return(
        <div className='roomContainer'>
            <h4 className='roomName text-center'><u>{room_name}</u></h4>
            <img src={photo}/>
            <button className='roomButton' name={room_name} onClick={handleClick}>Enter</button>
            <div className="info d-flex justify-content-between">
                {/* <p>{participants} participants</p>
                <p>Last updated: {updated}</p> */}
            </div>
        </div>
    )
}

export default Room;