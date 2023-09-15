import React, { useState } from 'react'
import Title from './Title'
import Time from './Time'
import Location from './Location'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'



export default function Event(props) {
    const [isFaved, setIsFaved] = useState(false)

    const [show, setShow] = useState(false);

    const [editedEvent, setEditedEvent] = useState({
        title: props.event.title,
        location: props.event.location,
        eventtime: new Date()
    });


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleFavories () {
        setIsFaved(!isFaved)
    }

    const updateEvent = async (editedEvent) => {
    
        try {
        const { title, location, eventtime } = editedEvent;
        console.log(editedEvent)
        const body = { title, location, eventtime };
        const response = await fetch(
            `http://localhost:8080/api/events/${props.event.id}`,
            {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
            }
        );

        if (response.ok) {
            handleClose()
            // getAllEvents();
            window.location = "/";
        } 
        } catch (err) {
        console.error(err.message);
        }
    };


    const handleSubmit = async e => {
        e.preventDefault();
    
        updateEvent(editedEvent)
    };

    function handleChange(event){
        const { value, name } = event.target;
        console.log(value, name)
        setEditedEvent((preValue) => ({ ...preValue, [name]: value }));
        console.log(editedEvent)
    }


  return (
    <div className='event-row'>

        <span className="material-icons" onClick={handleFavories}>{isFaved ? 'favorite' : 'favorite_border'}</span>
       

        <Title text = {props.event.title}/>
        <Location text = {props.event.location}/>
        <Time text = {props.event.eventtime}/>

        <span className="material-icons" onClick={handleShow}>edit</span>
        <span className="material-icons" onClick={() => {props.onClicked(props.event.id)}}>delete</span>

        <Modal show={show} >

            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            
                <form className='form-newEvent' onSubmit={handleSubmit}>
                    <input className = "input-newEvent" name="title" onChange={handleChange} value={editedEvent.title} placeholder="Title" />
                    <input className = "input-newEvent" name="location" onChange={handleChange} value={editedEvent.location} placeholder="Location" />
                    <DatePicker className='date'
                    name="eventtime"
                    selected={editedEvent.eventtime}
                    onChange={(date) => setEditedEvent({ ...editedEvent, eventtime: date })}
                    placeholderText="Select Date"
                    showTimeSelect
                    dateFormat="MMMM d, yyyy"
                    />
                </form>

            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" type= "submit" onClick={handleSubmit}> 
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>

    </div>


  )
}
