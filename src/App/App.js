import React, {useState, useEffect} from 'react';
import './App.css';
import {AircraftList} from '../Components/AircraftList/AircraftList';
import {FlightsList}  from '../Components/FlightsList/FlightsList';

function App() {
  const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const month = tomorrow.getMonth() + 1;

  const [aircraftList, setAircraftList] = useState([]);
  const [pickedFlights, setPickedFlights] = useState([]);
  const [pickedAircraft, setPickedAircraft] = useState([]);
  const [flights, setFlights] = useState([]);

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
    fetch('https://infinite-dawn-93085.herokuapp.com/flights')
    .then(response => { return response.json()} )
    .then(jsonResponse => {
      if(!jsonResponse.data){
          return 
        };
      setFlights(jsonResponse.data);
    })}

  useEffect( () => {
    getFlights(); 
    getAircrafts();
    }, [] )

  return (
    <div className="App App-background">
      <header>
        <p>{'<  ' +  tomorrow.getDate() + '/' + month + '/' +  tomorrow.getFullYear() + '  >'}</p>
        <p>Rotation {pickedAircraft.ident}</p>
      </header>
      <h2 className='AircraftTitle'>Aircrafts</h2>
      <div className="App-flex">
        <AircraftList aircrafts={aircraftList} pickedFlights={pickedFlights} />
        <FlightsList isPicked={true} pickedFlights={[]} flights={pickedFlights} setPickedFlights={setPickedFlights}/>
        <h2 className='FlightsTitle'>Flights</h2>
        <FlightsList isPicked={false} pickedFlights={pickedFlights} flights={flights} setPickedFlights={setPickedFlights} />
      </div>
    </div>
  );
}

export default App;
