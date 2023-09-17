import React, {useState} from 'react'

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function NewEvent( { addEvent } ) {

    const [newEvent, setNewEvent] = useState({
        title: "",
        location: "",
        eventtime: new Date()
    });

  
    const handleSubmit = async e => {
        e.preventDefault();
    
        addEvent(newEvent)
        setNewEvent({ title: '', location: '', eventtime: new Date() }); 
    };

    function handleChange(event){
        const { value, name } = event.target;
        setNewEvent((preValue) => ({ ...preValue, [name]: value }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='form-newEvent'>
                <input className = "input-newEvent" name="title" onChange={handleChange} value={newEvent.title} placeholder="Title" />
                <input className = "input-newEvent" name="location" onChange={handleChange} value={newEvent.location} placeholder="Location" />
                <DatePicker className='date'
                name="eventtime"
                selected={newEvent.eventtime}
                onChange={(date) => setNewEvent({ ...newEvent, eventtime: date })}
                placeholderText="Select Date"
                showTimeSelect
                // dateFormat="MMMM d, yyyy h:mm aa"
                dateFormat="MMMM d, yyyy"
                />
                <button className = "btn-add-event" type="submit">Add Event</button>
            </form>
        
        </div>
    )
}
