import React, { useState } from 'react'
import Title from './Title'
import Time from './Time'
import Location from './Location'

export default function Event(props) {
    const [isFaved, setIsFaved] = useState(false)

    function handleFavories () {
        setIsFaved(!isFaved)
    }


  return (
    <div className='event-row'>

        <span className="material-icons" onClick={handleFavories}>{isFaved ? 'favorite' : 'favorite_border'}</span>
        
        <Title text = {props.event.title}/>
        <Location text = {props.event.location}/>
        <Time text = {props.event.eventtime}/>

        <span className="material-icons">edit</span>
        <span className="material-icons" onClick={() => {props.onClicked(props.event.id)}}>delete</span>

    </div>
  )
}
