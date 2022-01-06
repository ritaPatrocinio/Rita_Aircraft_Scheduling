import React, {useState, useEffect} from 'react';
import './App.css';
import {AircraftList} from '../Components/AircraftList/AircraftList';
import {FlightsList}  from '../Components/FlightsList/FlightsList';

function App() {
  // date for tomorrow
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const month = tomorrow.toLocaleDateString("en-US", {month: 'long'});

  // day formatting
  const nth = function(d) {
    if (d > 3 && d < 21) {return 'th';}
    switch (d % 10) {
      case 1:  return "st";
      case 2:  return "nd";
      case 3:  return "rd";
      default: return "th";
    }
  }

  const [aircraftList, setAircraftList] = useState([]);
  const [pickedFlights, setPickedFlights] = useState([]);
  const [pickedAircraft, setPickedAircraft] = useState([]);
  const [flights, setFlights] = useState([]);
  const [offset, setOffset] = useState(0);
  const [totalFlights, setTotalFlights] = useState(0)

  const getAircrafts = () => {
    fetch('https://infinite-dawn-93085.herokuapp.com/aircrafts')
    .then(response => {return response.json()} )
    .then(jsonResponse => {
      if(!jsonResponse.data){
          return
      };
      setAircraftList(jsonResponse.data);
      setPickedAircraft(jsonResponse.data[0]);
      })}

  const getFlights = () => {
    fetch(`https://infinite-dawn-93085.herokuapp.com/flights?offset=${offset}&limit=10`)
    .then(response => { return response.json()} )
    .then(jsonResponse => {
      if(!jsonResponse.data){
          return 
        };
      setFlights(jsonResponse.data);
      setTotalFlights(jsonResponse.pagination.total)
    })}

  useEffect( () => {
    getAircrafts();
    }, [] )

  useEffect( () => {
    getFlights(); 
    }, [offset] )

  const next = () => {
    setOffset(offset + 10)
  }

  const previous = () => {
    setOffset(offset - 10)
  }

  const buttons = () => {
    return( 
      <div>
        {offset > 0 ? <button className='Previous' onClick={previous}>Previous</button> : ''}
        {offset <= totalFlights ? <button className='Next' onClick={next}>Next</button> : ''}  
      </div>
    )
  }

  return (
    <div className="App App-background">
      <header>
        <p>{'<  ' +  tomorrow.getDate() + nth(tomorrow.getDate()) + ' ' + month + ' ' +  tomorrow.getFullYear() + '  >'}</p>
        <p>Rotation {pickedAircraft.ident}</p>
      </header>
      <h2 className='AircraftTitle'>Aircrafts</h2>
      <div className="App-flex">
        <AircraftList aircrafts={aircraftList} pickedFlights={pickedFlights} />
        <FlightsList isPicked={true} pickedFlights={[]} flights={pickedFlights} setPickedFlights={setPickedFlights}/>
        <h2 className='FlightsTitle'>Flights</h2>
        <FlightsList isPicked={false} pickedFlights={pickedFlights} flights={flights} setPickedFlights={setPickedFlights} />
        {buttons()}
      </div>
    </div>
  );
}

export default App;
