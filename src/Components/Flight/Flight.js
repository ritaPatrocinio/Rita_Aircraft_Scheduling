import React from "react";
import arrow from './outline_east_white_24dp.png'
import './Flight.css';

export function Flight({setPickedFlights, flight, isPicked, pickedFlights, remove}) {

    const ChooseFlight = (clickedFlight) => {
        setPickedFlights((prev) => {
          // check if clicked Flight is already selected and if it is in the beggining or end of the list
           if (prev.includes(clickedFlight) && (remove)) {
             // filter the clicked Flight out of state
             return prev.filter(f => f !== clickedFlight);
           }
            else if (meetCriteria(clickedFlight)) {
             // add the clicked Flight to the state
             return [...prev, clickedFlight];
           } else {
               return [...prev]}
        });
    }

    // const notCenter = (flight) => {
    //     const lastFlight = pickedFlights.length ===0 ? 0 : pickedFlights[pickedFlights.length -1];
    //     const firstFlight = pickedFlights[0];
    //     if(pickedFlights.length ===0){
    //         return true
    //     } 
    //     else if(flight.id === lastFlight.id || flight.id === firstFlight.id){
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    const meetCriteria = (flight) => {
        const lastFlight = pickedFlights.length ===0 ? 0 : pickedFlights[pickedFlights.length -1];
        
        if (lastFlight === 0 || (flight.arrivaltime < 24*60*60 && 
            flight.departuretime - lastFlight.arrivaltime >= 20*60 &&
            flight.origin === lastFlight.destination)){
                return true
            } else {
                return false
            }
    }

    const AddFlight = () => {
        ChooseFlight(flight)
    }
    
    const render = () => {
        if(isPicked) {
            return ( 
            <div>
                <h2 className="Left2 Origin">Flight: {flight.id}</h2>
                <img className="Arrow" src={arrow} alt="arrow"/> 
                {remove ? <button className="Remove" onClick={AddFlight}>Remove</button> : ''}
                
            </div>) 
        } else { 
            return <h2 className="Origin">{flight.id}</h2>}
        }
    
    return (
        <div className="FlightD" >
            <div className="Border">
                {render()}
                <div className="Top">
                    <p className="Left ">{flight.origin}</p>    
                    <p className="Left">{flight.readable_departure}</p> 
                </div>
                <div className="Down">
                    <p className="Right">{flight.destination}</p>
                    <p className="Right">{flight.readable_arrival}</p>
                </div>
                <div>
                    {isPicked=== false && meetCriteria(flight) ? <button className="Add" onClick={AddFlight}>Add</button> : ''}
                    <p style={{color: "green", fontWeight:600}}>{Math.round(((flight.arrivaltime-flight.departuretime)*100)/(24*60*60))}%</p>
                </div>
            </div>
        </div>
    )
}
