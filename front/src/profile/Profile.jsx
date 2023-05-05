import React, {useState,  useContext, useEffect} from "react";
import "./profile.scss"
import axios from "axios";
import { AuthContext } from '../context/AuthContext';
import AddEnterBar from "../addEnterBar/AddEnterBar";
import Rooms from '../forRoom/Rooms'
import AddRoomBar from "../addRoom/AddRoomBar";

function Profile(){

  const {currentUser} = useContext(AuthContext); 

  const [roomName, setRoomName] = useState('');

  let [userRooms, setUserRooms] = useState([]); 



useEffect(() => {
  axios.get(`http://localhost:8800/api/rooms/getUsersRooms`, { params: { user_id: currentUser.id} })
    .then(response => {
      console.log(response.data)
      setUserRooms([...new Map(response.data.map(item =>
        [item['room_name'], item])).values()]);
    })
}, [])


console.log(userRooms)


  return (
          <div className="UserPage mt-5">
            <AddEnterBar question="enter" />
            <AddRoomBar />
            {userRooms ?  <Rooms rooms={userRooms} />  : <div>no rooms yet</div>}
            
          </div>
  )

  }

export default Profile; 


