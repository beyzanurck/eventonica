import React, { useState } from 'react'

export default function Event(props) {
    const [isFaved, setIsFaved] = useState("favorite_border")

    function handleFavories () {
        setIsFaved("favorite")
    }


  return (
    <div className='event-row'>
        <span class="material-icons" onClick={handleFavories}>{isFaved}</span>
        <p>{props.events[0].title}</p>
        <p>{props.events[0].location}</p>
        <p>{props.events[0].eventtime}</p>
        <span class="material-icons">edit</span>
        <span class="material-icons">delete</span>
    </div>
  )
}
