import "./message.scss"
import heart1 from '../pics/heart1.png'
import heart2 from '../pics/heart2.png'
import axios from "axios";
import React, {useState,  useContext, useEffect} from "react";
import { AuthContext } from '../context/AuthContext';

function Message({text, date, deleteMessage, id, isAnonymys, user_id, username}) {

    const [isUpdateClicked, setisUpdateClicked] = useState(true)
    const [message, setMessage] = useState('')
    const [text2, settext2] = useState(text)
    const [heart, setHeart] = useState(true)
    const {currentUser}= useContext(AuthContext); 


    //todo: отримувати кількість реакцій


    //todo: перевірка на юзера 
    const updateMessage = (e) => {
        e.preventDefault();
        
        const id = e.target.id;

        const values = {text: message, id: id} 

        try {
            axios.put("http://localhost:8800/api/messages/editMessage", values)
            console.log('super!')
            setisUpdateClicked(!isUpdateClicked)
            settext2(message)
            setMessage('')

        } catch(err){
            console.log(err.response)
        }

      }

      //todo: finish 
      const sendReaction = (e) => {
        e.preventDefault();
        setHeart(!heart)
        const values = [id, currentUser.id];

        if(heart) {
            try {
                axios.post("http://localhost:8800/api/reactions/addReaction", values)
                console.log('super!')
                setHeart(!heart)
            } catch(err){
                console.log(err.response)
            }
        }
      }

    return (
        <div className="message container">
            <div className="row">
                <div className="col-9">
                    {(isUpdateClicked) ? <div><p className="text" id={`messagetext${id}`}>{text2}</p> <p className="date">{date}</p>
                    {(!isAnonymys) ? <p className="date">sent by user {username}</p>: <p className="date">user is anonymous</p>}    </div> : (<div className="input-group d-flex p-2 bd-highlight">
                                  <input type="text" id="messageInput" className="form-control" placeholder={text2} onChange={(e) => setMessage(e.target.value)}/>
                                  <button className="btn btn-outline-secondary" id={id} type="button" onClick={updateMessage}>Send</button>
                                  
                          </div>)}
                    
                </div>
                <div className="col-3">
                    {(heart) ? <img src={heart1} id={id} onClick={sendReaction} className="pic"/> : <img src={heart2} id={id} onClick={sendReaction} className="pic"/>}
                    <button id={id} className="messageDeleteButton" onClick={deleteMessage}>delete</button>
                    <button id={id} className="messageDeleteButton" onClick={(e) => setisUpdateClicked(!isUpdateClicked)}>update</button>
                </div>
            </div>
        </div>
    )
}

export default Message;