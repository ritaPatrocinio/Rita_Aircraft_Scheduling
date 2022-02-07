import React from "react";
import './FlightsList.css';
import {Flight} from '../Flight/Flight';

export function FlightsList({flights, setPickedFlights, isPicked, pickedFlights}) {
    const pickedIDs = pickedFlights.map(pf => pf.id);
    const filteredFlights = flights.filter((f) => !pickedIDs.includes(f.id));
    
        return (
            <div className="FlightsList">
                <div className="Border">
                    {filteredFlights.map((flight, i) => {
                        return ( 
                            <div key={flight.id} className="box"> 
                                <div className="height"></div> 
                                <Flight remove={i===0 || i===filteredFlights.length-1} pickedFlights={pickedFlights} flight={flight} setPickedFlights={setPickedFlights} isPicked={isPicked}/> 
                            </div> 
                              )}
                    )}
                </div>
            </div>
        )
}
