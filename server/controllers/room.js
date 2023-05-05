import {db} from '../connect.js'; 

export const addRoom = (req, res) => {

    console.log(req.body)

    const q = "INSERT INTO rooms (`name`, `code`, `user_id`) VALUE (?)"

    const values = [req.body.name, req.body.code, req.body.user_id];  

    console.log(values)

    db.query(q, [values], (err, data)=>{
        if(err) return res.status(500).json(err); 
        return res.status(200).json("Room has been created")
    })
    
}

export const getUsersRooms = (req, res) => {
        const q = "SELECT * FROM entrances WHERE user_id = ?"

        db.query(q, req.query.user_id, (err, data)=>{
            if(err) return res.status(500).json(err); 
            return res.status(200).json(data)
        })

}


export const enterRoom = (req, res) => {
    
    const q = "SELECT * FROM rooms WHERE code = (?)"

    console.log(req.query)

    db.query(q, [req.query.code], (err, data) => {
        console.log(data)
        if(err) return res.status(500).json(err); 
        if(data.length === 0) return res.status(404).json("Room not found"); 

        else{  
            const q2 = "INSERT INTO entrances (`room_id`, `user_id`, `room_name`, `date`) VALUE (?)"
            const date = new Date()
            const room_name = data[0].name


            const values = [data[0].id, req.query.user_id, room_name, date];

            console.log(values)
            
            db.query(q2, [values], (err, data)=>{ 
                if(err) return res.status(500).json(err); 
                else return res.status(200).json(room_name)
            })
        }


    })

}



export const getRoom = (req, res) => {
    console.log(req.body)
    
    const q = "SELECT * FROM rooms WHERE name = ?"

    db.query(q, req.query.name, (err, data) => {
        if(err) return res.status(500).json(err); 
        if(data.length === 0) return res.status(404).json("Room not found"); 

        else return res.status(200).json(data)

    })

}
