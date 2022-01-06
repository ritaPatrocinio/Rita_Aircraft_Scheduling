import React from "react";
import arrow from './outline_east_white_24dp.png'
import './Flight.css';

export function Flight({setPickedFlights, flight, isPicked }) {

    const ChooseFlight = (clickedFlight) => {
        setPickedFlights((prev) => {
            const lastFlight = prev.length ===0 ? 0 : prev[prev.length -1];
            const firstFlight = prev[0];
          // check if clicked Flight is already selected and if it is in the beggining or end of the list
           if (prev.includes(clickedFlight) && (clickedFlight === lastFlight || clickedFlight === firstFlight)) {
             // filter the clicked Flight out of state
             return prev.filter(f => f !== clickedFlight);
           }
            else if (lastFlight === 0 || (clickedFlight.arrivaltime < 24*60*60 && 
                clickedFlight.departuretime - lastFlight.arrivaltime >= 20*60 &&
                clickedFlight.origin === lastFlight.destination)) {
             // add the clicked Flight to the state
             return [...prev, clickedFlight];
           } else {
               return [...prev]}
        });
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
            </div>) 
        } else { 
            return <h2 className="Origin">{flight.id}</h2>}
        }
    
    return (
        <div className="FlightD" onClick={AddFlight}>
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
            </div>
        </div>
    )
}
