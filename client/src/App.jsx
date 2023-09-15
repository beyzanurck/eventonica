import './App.css';
import Event from './components/event';
import React, {useState, useEffect} from 'react';
import NewEvent from './components/NewEvent';


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
  useEffect(() => {getAllEvents()}, []);


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


  const addNewEvent = async (newEvent) => {
    
    try {
      const { title, location, eventtime } = newEvent;
      const body = { title, location, eventtime };
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      //window.location = "/";
      if (response.ok) {
        getAllEvents();
      } 
    } catch (err) {
      console.error(err.message);
    }
  };

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

    <NewEvent addEvent={addNewEvent}/>

  </div>
  )
}

export default App

