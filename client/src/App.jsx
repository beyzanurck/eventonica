import './App.css';
import Event from './components/event';
import React, {useState, useEffect} from 'react';

function App() {

  const [events, setEvents] = useState([]);

  const getRequest = () => {
    fetch("http://localhost:8080/api/events")
    .then((response) => response.json())
    .then(events => {
      setEvents(events); 
      console.log('Events fetched...', events);
      });
  }

  useEffect(() => {getRequest()}, []);

  return (
    <div className="App">
    <h1>Techtonica 2023 H2 events</h1>
    
    {
      events.length > 0 ? <Event events = {events} /> : ` `
    }
    
  </div>

  )
  
}

export default App
