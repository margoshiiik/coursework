import {db} from '../connect.js'; 

export const addReaction= (req, res) => {

    console.log(req.body)

    const q = "INSERT INTO reactions (`message_id`, `user_id`) VALUE (?)"

    const values = [req.body.message_id, req.body.user_id];  

    db.query(q, values, (err, data)=>{
        if(err) return res.status(500).json(err); 
        return res.status(200).json("reaction has been added")
    })
    
}