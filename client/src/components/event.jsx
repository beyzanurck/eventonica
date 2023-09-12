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
        <span class="material-icons" onClick={handleFavories}>{isFaved ? 'favorite' : 'favorite_border'}</span>
        <Title text = {props.event.title}/>
        <Location text = {props.event.location}/>
        <Time text = {props.event.eventtime}/>
        <span class="material-icons">edit</span>
        <span class="material-icons">delete</span>
    </div>
  )
}
