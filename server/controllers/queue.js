import {db} from '../connect.js'; 

export const addPersonInQueue = (req, res) => {

    console.log(req)

    const q = "INSERT INTO queue (`text`, `date`, `sender`, `room_id`, `isMarked`) VALUE (?)"

    const values = [req.body.text, req.body.date, req.body.sender, req.body.room_id, req.body.isMarked];  

    db.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err); 
        return res.status(200).json("person in queue has been added")
    })
    
}