import React, {useState} from 'react'
import CustomDatePicker from './CustomDatePicker.jsx'

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

                <CustomDatePicker 
                    selected={newEvent.eventtime}
                    onChange={(date) => setNewEvent({ ...newEvent, eventtime: date })}
                />

                <button className = "btn-add-event" type="submit">Add Event</button>
            </form>
        
        </div>
    )
}
