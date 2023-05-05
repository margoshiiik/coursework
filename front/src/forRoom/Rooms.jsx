import Room from "./Room"

function Rooms({rooms}) {
   
    console.log(rooms)

    return (
        <div className="container "> 
        <h1 className="text-center">This is your rooms</h1>
            <div className="RoomsClass mt-3 d-flex align-content-around flex-wrap">
                {rooms.map(item => 
                        <div key={item.id} className="col-4" >
                            
                        <Room room_name={item.room_name}/> 
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Rooms;

