import React from "react";
import './AircraftList.css';
import {Aircraft} from '../Aircraft/Aircraft';

export function AircraftList({aircrafts, pickedFlights}) {
        return (
            <div className="Aircrafts">
                <div className="Border">
                    {aircrafts.map((aircraft, i) => { return <Aircraft 
                    key={i} name={aircraft.ident} pickedFlights={pickedFlights} /> }
                        )}
                </div>
            </div>
        )
}
