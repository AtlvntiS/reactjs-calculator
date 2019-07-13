import React from 'react'
import './style.css'

export default props =>
    <button className="button"
    onClick={e => props.click(props.label)}
    style={{
        gridColumn: 'span ' + props.size,
        backgroundColor: (props.op ? "#fa8231" : "#f0f0f0"),
        color: (props.op ? "#fff" : "#000")
     }}>{props.label}</button>