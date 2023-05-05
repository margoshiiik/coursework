import './personInQueue.scss'

function PersonInQueue({name, isMarked}){ 

    console.log(name, isMarked)
    return(
            <div className="queuePerson container">
            <div className="row">
                <div className="col-10">
                    <p className="text">{name}</p>
                </div>
                <div className="col-2">
                    {(!isMarked) ? <input className="form-check-input" type="checkbox" checked /> : <input className="form-check-input" type="checkbox" value="" />}   
                </div>
            </div>
        </div>
    )

}

export default PersonInQueue;