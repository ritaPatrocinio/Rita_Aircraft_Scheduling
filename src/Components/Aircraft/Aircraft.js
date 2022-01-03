
import React, {useState, useEffect} from "react";

import './Aircraft.css';


export function Aircraft(props) {

    const [usability, setUsability] = useState();
    const [bar, setBar] = useState([]);

    useEffect(() => {
        let s = -20*60;
        props.pickedFlights.forEach(flight => s += (flight.arrivaltime - flight.departuretime + 20*60 ));
        return (setUsability(s=== -20*60 ? 0 : s/(24*60*60)))
    }, [props.pickedFlights])

    useEffect(() => {
        setBar([]);
        props.pickedFlights.map( (flight, i) => { 
            if(props.pickedFlights.length ===1){
                setBar( (prev) => {return [...prev, ['a', (flight.departuretime-20*60)/(24*60*60)]] } )
                
                setBar( (prev) => {return [...prev, ['b', (flight.arrivaltime - flight.departuretime)/(24*60*60)]
            ] } );
            setBar( (prev) => {return [...prev, ['a',  (24*60*60 - flight.arrivaltime)/(24*60*60)]] } );
            
            } 

            else if(i===0){
                setBar( (prev) => {return [...prev, ['a', (flight.departuretime-20*60)/(24*60*60)]] } )
                
                setBar( (prev) => {return [...prev, ['b', (flight.arrivaltime - flight.departuretime)/(24*60*60)]
            ] } );
            
            
        } else if(i===props.pickedFlights.length-1){
            
            setBar( (prev) => { return [...prev, ['c', (20*60 )/(24*60*60)]
             ] } )
             setBar( (prev) => { return [...prev, ['a', (flight.departuretime - props.pickedFlights[i-1].arrivaltime -20*60)/(24*60*60)]
             ] } )
            setBar( (prev) => {return [...prev, ['b', (flight.arrivaltime - flight.departuretime)/(24*60*60)]
            ] } )
            setBar( (prev) => {return [...prev, ['a',  (24*60*60 - flight.arrivaltime)/(24*60*60)]] } );
        }
        else { 
            
            setBar( (prev) => { return [...prev, ['c', (20*60 )/(24*60*60)]
             ] } )
             setBar( (prev) => { return [...prev, ['a', (flight.departuretime - props.pickedFlights[i-1].arrivaltime -20*60)/(24*60*60)]
             ] } )
            setBar( (prev) => {return [...prev, ['b', (flight.arrivaltime - flight.departuretime)/(24*60*60)]
            ] } )
           
        } })
            
    }, [props.pickedFlights])

    

    
        return (
            <div className="Aircraft">
            <div className="Border">
                <h2>{props.name}</h2>
                <p>{Math.round(usability*100)}%</p>
                <div className="BarChar">
                { (props.pickedFlights.length ===0 ? '' :
                (
                    <div>
                       <p className="LeftA">0</p>
                    <p className="RightA">24</p>
                <div className="bar"></div> 
                    </div>)
                )
                    }
                
               {bar.map( (b , ind) => {
            return (
                b[0]=== 'a'? <div key={ind} style={{width: b[1]*480, height: 40 , backgroundColor: "grey", display: "inline-block"  }}> 
                </div> : (b[0]=== 'b'?
                <div key={ind} style={{width: b[1]*480, height: 40 , backgroundColor: "green", display: "inline-block"  }}> 
                </div> : <div key={ind} style={{width: b[1]*480, height: 40 , backgroundColor: "purple", display: "inline-block"  }}> 
                </div> )
                )
        })} 
        </div>
            </div>
            </div>
        )
    
}