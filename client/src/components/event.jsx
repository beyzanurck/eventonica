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


  return (
    
    <tr>

        <td>
            <span className="material-icons" onClick={handleFavories}>{isFaved ? 'favorite' : 'favorite_border'}</span>
        </td>

        <td>
            <Title text = {props.event.title}/>
        </td>

        <td>
            <Location text = {props.event.location}/>
        </td>

        <td>
            <Time text = {props.event.eventtime}/>
        </td>

        <td>
            <span className="material-icons" onClick={handleShow}>edit</span>
        </td>

        <td>
            <span className="material-icons" onClick={() => {props.onClicked(props.event.id)}}>delete</span>
        </td>


        <UpdateEvent
            show={show}
            event={props.event}
            onClose={handleClose}
            onUpdate={props.onUpdated}
        />

    </tr>
  )
}
