import './App.css';
import Event from './components/event';
import React, {useState, useEffect} from 'react';


import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

function App() {

  const [events, setEvents] = useState([]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    location: "",
    eventtime: new Date()
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

      //window.location = "/";
      if (response.ok) {
        getAllEvents();
        setNewEvent({ title: '', location: '', eventtime: new Date() }); 
      } 
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
        <input name="title" onChange={handleChange} value={newEvent.title} placeholder="Title" />
        <input name="location" onChange={handleChange} value={newEvent.location} placeholder="Location" />
        <DatePicker
          name="eventtime"
          selected={newEvent.eventtime}
          onChange={(date) => setNewEvent({ ...newEvent, eventtime: date })}
          placeholderText="Select Date"
          showTimeSelect
          // dateFormat="MMMM d, yyyy h:mm aa"
          dateFormat="MMMM d, yyyy"
        />
        <button type="submit">Add Event</button>
    </form>
    
  </div>

  )
}

export default App
