import './App.css';
import Event from './components/event';
import React, {useState, useEffect} from 'react';



function App() {

  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    eventtime: ""
  });

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


  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { title, location, eventtime } = newEvent;
      const body = { title, location, eventtime };
      const response = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  function handleChange(event){
    const { value, name } = event.target;
    setNewEvent((preValue) => ({ ...preValue, [name]: value }));
  }

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

    <form onSubmit={handleSubmit}>
        <input name="title" onChange={handleChange} placeholder="Title" />
        <input name="location" onChange={handleChange} placeholder="Location" />
        <input name="eventtime" onChange={handleChange} placeholder="MM/DD/YY" />

        <button type="submit">Add Event</button>
    </form>
    
  </div>

  )
}

export default App
