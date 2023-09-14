import './App.css';
import Event from './components/event';
import React, {useState, useEffect} from 'react';

function App() {

  const [events, setEvents] = useState([]);

  const getAllEvents = () => {
    fetch("http://localhost:8080/api/events")
    .then((response) => response.json())
    .then(events => {
      setEvents(events); 
      console.log('Events fetched...', events);
      });
  }

  const deleteEvent = async (id) => {
    try {
      const deleteEvent = await fetch(`http://localhost:8080/api/events/${id}`, {
        method: "DELETE"
      });

      //setEvents(events.filter(event => event.id !== id))
      getAllEvents();

    } catch (error) {
      console.error(error.message)
    }
  }

  useEffect(() => {getAllEvents()}, []);

  return (
    <div className="App">
    <h1>Techtonica 2023 H2 events</h1>

    {
      events.length > 0 ? 
      events.map((item, index) => (
        <Event event = {item} key={index} onClicked = {deleteEvent}/>
      ))
       : 
      ` `
    }
    
  </div>

  )
  
}

export default App
