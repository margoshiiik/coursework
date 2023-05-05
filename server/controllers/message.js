import {db} from '../connect.js'; 

export const addMessage = (req, res) => {

    console.log(req.body)

    const q = "INSERT INTO messages (`text`, `date`, `user_id`, `username`, `room_id`, `isAnonymys`) VALUE (?)"

    const values = [req.body.text, req.body.date, req.body.user_id, req.body.username, req.body.room_id, req.body.isAnonymys];  

    db.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err); 
        return res.status(200).json("message has been added")
    })
    
}

export const deleteMessage = (req, res) => {

    console.log(req.body)

    const q = "DELETE FROM messages WHERE id=(?)"

    db.query(q, [req.body.id], (err, data)=>{
        if(err) return res.status(500).json(err); 
        return res.status(200).json("message was deleted")
    }) 
}

export const editMessage = (req, res) => {

    console.log(req.body)

    const q = "UPDATE messages SET `text` = ? WHERE `id` = ?"

    const values = [req.body.text, req.body.id];

    db.query(q, values, (err, data)=>{
        if(err) return res.status(500).json(err); 
        return res.status(200).json("message has been updated")
    })
}

export const getMessages = (req, res) => {
    const q = "SELECT * FROM messages WHERE room_id = (?)"
    console.log(req.query)

    db.query(q, req.query.room, (err, data)=>{
        if(err) return res.status(500).json(err); 
        return res.status(200).json(data)
    })

}
