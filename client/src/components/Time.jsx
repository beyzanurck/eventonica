import React from 'react'

export default function Time(props) {
  return (
    <div>
        {/* props.text */}
        <p>{new Date(props.text).toLocaleDateString()}</p>
    </div>
  )
}
