import React, {useState, useEffect} from "react";
import './Aircraft.css';

export function Aircraft({pickedFlights, name}) {
    const [usability, setUsability] = useState(0);
    const [bar, setBar] = useState([]);

    useEffect(() => {
        let s = -20*60;
        pickedFlights.forEach(flight => s += (flight.arrivaltime - flight.departuretime + 20*60 ));
        return (setUsability(s === -20*60 ? 0 : s/(24*60*60)))
    }, [pickedFlights])

    useEffect(() => {
        let secOfDay = 24*60*60;
        setBar([]);
        pickedFlights.forEach((flight, i) => { 
            if(pickedFlights.length === 1){ //in case the list has only one flight
                setBar( (prev) => {return [...prev, ['a', (flight.departuretime-20*60)/(secOfDay)]] // a is idle time
            }) 
                setBar( (prev) => {return [...prev, ['b', (flight.arrivaltime - flight.departuretime)/(secOfDay)]] // b is time flying
            });
                setBar( (prev) => {return [...prev, ['a',  (secOfDay - flight.arrivaltime)/(secOfDay)]] 
            }); 
            } 
            else if(i===0){ //first flight of the list
                setBar( (prev) => {return [...prev, ['a', (flight.departuretime-20*60)/(secOfDay)]] 
            }) 
                setBar( (prev) => {return [...prev, ['b', (flight.arrivaltime - flight.departuretime)/(secOfDay)]] 
            });
            } 
            else if(i===pickedFlights.length-1){ //last flight of the list
                setBar( (prev) => { return [...prev, ['c', (20*60 )/(secOfDay)]]  // c is turnaround time
                })
                setBar( (prev) => { return [...prev, ['a', (flight.departuretime - pickedFlights[i-1].arrivaltime -20*60)/(secOfDay)]]
                })
                setBar( (prev) => {return [...prev, ['b', (flight.arrivaltime - flight.departuretime)/(secOfDay)]]
                })
                setBar( (prev) => {return [...prev, ['a',  (secOfDay - flight.arrivaltime)/(secOfDay)]] 
            });
            }
            else { 
                setBar( (prev) => { return [...prev, ['c', (20*60 )/(secOfDay)]]
                })
                setBar( (prev) => { return [...prev, ['a', (flight.departuretime - pickedFlights[i-1].arrivaltime -20*60)/(secOfDay)]]
                })
                setBar( (prev) => {return [...prev, ['b', (flight.arrivaltime - flight.departuretime)/(secOfDay)]]
                })
            } 
        })  
        }, [pickedFlights])
          
        // resizing utility for usability bar
        function useWindowSize() {
          const [windowSize, setWindowSize] = useState({
            width: undefined,
            height: undefined,
          });
          useEffect(() => {
            // Handler to call on window resize
            function handleResize() {
              // Set window width/height to state
              setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
              });
            }
            window.addEventListener("resize", handleResize);
            // Call handler right away so state gets updated with initial window size
            handleResize();
            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
          }, []); 
          return windowSize;
        }

        const size = (useWindowSize().width/3) -32;
    
        return (
            <div className="Aircraft">
                <div className="Border">
                    <h2>{name}</h2>
                    <p>({Math.round(usability*100)}%)</p>
                    <div className="BarChar">
                        {(pickedFlights.length ===0 ? '' :
                        (<div>
                            <p className="LeftA">00:00</p>
                            <p className="RightA">24:00</p>
                            <div className="bar"></div> 
                        </div>)
                        )}
                        {bar.map( (b , ind) => {
                        return (
                            b[0]=== 'a'? 
                                <div // a is idle time
                                    key={ind} style={{width: b[1]*size, height: 40 , backgroundColor: "grey", display: "inline-block"}}> 
                                </div> : 
                            (b[0]=== 'b'? // b is time flying
                                <div 
                                    key={ind} style={{width: b[1]*size, height: 40 , backgroundColor: "green", display: "inline-block"}}> 
                                </div> : // c is turnaround time
                                <div 
                                    key={ind} style={{width: b[1]*size, height: 40 , backgroundColor: "purple", display: "inline-block"}}> 
                                </div> )
                                )
                        })
                        } 
                    </div>
                </div>
            </div>
            )
}
