import React, { useState } from 'react'
import Title from './Title'
import Time from './Time'
import Location from './Location'
import UpdateEvent from './UpdateEvent'


export default function Event(props) {
    const [isFaved, setIsFaved] = useState(false)

    const [show, setShow] = useState(false);


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
            window.location = "/";
        } 
        } catch (err) {
        console.error(err.message);
        }
    };


  return (
    <div className='event-row'>

        <span className="material-icons" onClick={handleFavories}>{isFaved ? 'favorite' : 'favorite_border'}</span>

        <Title text = {props.event.title}/>
        <Location text = {props.event.location}/>
        <Time text = {props.event.eventtime}/>

        <span className="material-icons" onClick={handleShow}>edit</span>
        <span className="material-icons" onClick={() => {props.onClicked(props.event.id)}}>delete</span>


        <UpdateEvent
            show={show}
            event={props.event}
            onClose={handleClose}
            onUpdate={updateEvent}
        />

    </div>


  )
}
