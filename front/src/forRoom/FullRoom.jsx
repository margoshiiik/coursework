import React, {useState,  useContext, useEffect} from "react";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import Navbar from "../navbar/Navbar";
import './FullRoom.scss'
import Message from '../message/Message'
import Pool from "../pool/Pool"
import PersonInQueue from "../personInQueue/PersonInQueue";

let personsinqueue = [
  {
    id: 1, 
    name: "hello world", 
    sender: 3, 
    time: '20-03-2023', 
    isMarked: true
  },
  {
    id: 2, 
    name: "i dnt know anything", 
    sender: 3, 
    time: '20-03-2023', 
    isMarked: true
  },
  {
    id: 3, 
    name: "margo", 
    sender: 3, 
    time: '20-03-2023', 
    isMarked: true
  }
]



function FullRoom() {
    const {currentUser}= useContext(AuthContext); 
    const url = window.location.href
    let roomName = url.replace(`http://localhost:3000/profile/${currentUser.id}/room/`, '')
    const [room, setRoom] = useState(null)
    const [message, setMessage] = useState('')
    const [queuename, setQueueName] = useState('')
    const [queue, setQueue] = useState(personsinqueue)
    const [chat, setChat] = useState(null)
    const [isVisible, setIsVisible] = useState(false)
    const [isVisibleQueue, setIsVisibleQueue] = useState(false)


    console.log(roomName);
    roomName = roomName.replaceAll('%20', ' ')
    console.log(roomName)


    useEffect(() => {
        axios.get(`http://localhost:8800/api/rooms/getRoom`, { params: { name: roomName} })
          .then(response => {
            console.log(response.data)
            setRoom(response.data[0]) 
            axios.get(`http://localhost:8800/api/messages/getMessages`, { params: { room: response.data[0].id} })
            .then(response => {
                console.log(response.data)
                setChat(response.data)
            })
      })}, [message])

      const sendMessage = (e) => {
        e.preventDefault(); 
        const isAnonymys = document.getElementById('flexRadioDefault1').checked
        const date = new Date();
        const values = {text: message, date: date.toUTCString(), user_id: currentUser.id, username: currentUser.username,  room_id: room.id, isAnonymys: isAnonymys}

        try {
            axios.post("http://localhost:8800/api/messages/addMessage", values)
            console.log('super!')
            setMessage('')
            document.getElementById('messageInput').value = ''
        } catch(err){
            console.log(err.response.data)
        }
      }


      //todo: перевірка на юзера 
      const deleteMessage = (e) => {
        e.preventDefault();
        const messageId = e.target.id;
        console.log();
        const values = {id: messageId}

        try {
          axios.delete("http://localhost:8800/api/messages/deleteMessage", { data: values })
          console.log('super!')
          let chat2 =  chat.filter(object => {
            return object.id != messageId;
          });
          setChat(chat2)
      } catch(err){
          console.log(err.response.data)
      }
      }



      const addToQueue = (e) => {
        e.preventDefault();
        const date = new Date();
        const values = {text: queuename, date: date.toUTCString(), sender: currentUser.id,  room_id: room.id, isMarked: false}

        try {
            axios.post("http://localhost:8800/api/queue/addPersonInQueue", values)
            console.log('super!')
        } catch(err){
            console.log(err.response.data)
        }
      }

      if (room && chat) {
        
        return (
            <div>
                <h1 className="text-center mt-2">This is a room {room.name}</h1>
                <p className="text-center">Use this code for other to join: <b>{room.code}</b></p>
              

              <div className='chatPart container'>
                    <div className="row chatPart">
                      <div className="col-8">
                          <div className="chat chatDiv" data-spy="scroll" data-offset="0">
                          
                                  {
                                  
                                  chat.map(item => 
                                      <Message key={item.id} id={item.id} text={item.text} date={item.date} user_id={item.user_id} username={item.username} isAnonymys={item.isAnonymys} deleteMessage={deleteMessage}/>
                                  )
                                  }
                          </div>
                          
                          
                          <div className="input-group d-flex p-2 bd-highlight">
                                  <input type="text" id="messageInput" className="form-control" placeholder="Type here..." onChange={(e) => setMessage(e.target.value)}/>
                                  <button className="btn btn-outline-secondary" type="button" onClick={sendMessage}>Send</button>
                                  
                          </div> 

                          <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                                    <label class="form-check-label" for="flexRadioDefault1">
                                      send anonymously
                                    </label>
                          </div>
                          <div class="form-check">
                                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                    <label class="form-check-label" for="flexRadioDefault2">
                                      send showing name
                                    </label>
                          </div>
                    </div>

                    <div className="col-4">
                          <div className="queue" data-spy="scroll" data-offset="0">
                                
                                  {
                                    queue.map(item => 
                                      <PersonInQueue key={item.id} name={item.name} isMarked={item.isMarked} />
                                    )
                                  }
                          </div>

                          <div className="input-group d-flex p-2 bd-highlight">
                                  <input type="text" id="messageInput" className="form-control" placeholder="Your name here" onChange={(e) => setQueueName(e.target.value)}/>
                                  <button className="btn btn-outline-secondary" type="button" onClick={addToQueue}>Send</button>
                                  
                        
                          </div> 

                        


                    </div>

                    </div>
                </div>

                <ul className="nav mt-5 justify-content-center">
                    <li className="nav-item">
                      <button type="button" className="btn btn-light me-5" onClick={(e) => setIsVisible(!isVisible)}>Create a pool</button>
                    </li>
                    <li className="nav-item">
                      <button type="button" className="btn btn-light">Show a queue</button>
                    </li>
                </ul>


                <Pool isVisible={isVisible}/>
            </div>

            
        )
      } else return (
        <h1>Fetching the data</h1>
      )
}

export default FullRoom;