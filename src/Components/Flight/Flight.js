import React from "react";
import arrow from './outline_east_white_24dp.png'
import './Flight.css';

export function Flight(props) {

    const ChooseFlight = (clickedFlight) => {
        
        // const clickedFlight = e.target.value;
        props.setPickedFlights((prev) => {
            const lastFlight = prev.length ===0? 0 : prev[prev.length -1];

          // check if clicked Flight is already selected
           if (prev.includes(clickedFlight)) {

             // filter the clicked Flight out of state
             return prev.filter(t => t !== clickedFlight);
           }
            else if (lastFlight === 0 || (clickedFlight.arrivaltime < 86400 && 
                clickedFlight.departuretime - lastFlight.arrivaltime >= 20*60 &&
                clickedFlight.origin === lastFlight.destination)) {

             // add the clicked Flight to the state
             return [...prev, clickedFlight];
           } else {
               return [...prev]}
         });
    }

    const AddFlight = () => {
          ChooseFlight(props.flight)
      }
    

      const render = () => {
          if(props.isPicked) {
              return ( <div>
              <h2 className="Left2 Origin">Flight: {props.flight.id}</h2>
              <img className="Arrow" src={arrow} alt="arrow"/> 
              
              </div>) 
          } else { return <h2 className="Origin">{props.flight.id}</h2>}
      }
    
        return (
            <div className="FlightD" onClick={AddFlight}>
            {render()}
            <div className="Top">
            <p className="Left ">{props.flight.origin}</p>    
            <p className="Left">{props.flight.readable_departure}</p> 
            </div>
            <div className="Down">
            <p className="Right">{props.flight.destination}</p>
            <p className="Right">{props.flight.readable_arrival}</p>
            </div>
            <div className="Border">
            </div>
            </div>
        )
    
}