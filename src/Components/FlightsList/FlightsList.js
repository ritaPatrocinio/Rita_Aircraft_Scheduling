import React from "react";

import './FlightsList.css';
import {Flight} from '../Flight/Flight';

export function FlightsList(props) {
        return (
            <div className="FlightsList">
            <div className="Border">
            {props.flights.map((flight, ind) => {return (  <div className="box"> <div className="height"></div> <Flight key={ind} flight={flight} 
                         setPickedFlights={props.setPickedFlights} isPicked={props.isPicked}/> </div>)  }
                )}
            </div>
            </div>
        )
    
}