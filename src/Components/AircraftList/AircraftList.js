import React from "react";

import './AircraftList.css';
import {Aircraft} from '../Aircraft/Aircraft';

export function AircraftList(props) {
    
        return (
            <div className="Aircrafts">
            <div className="Border">
            {props.aircrafts.map((aircraft, i) => { return <Aircraft key={i} name={aircraft.ident} pickedFlights={props.pickedFlights} /> }
                )}
            </div>
            </div>
        )
    
}