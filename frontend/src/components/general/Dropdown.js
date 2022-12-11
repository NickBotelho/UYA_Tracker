import React, { createRef, useState, useCallback } from "react";

function Dropdown({ title, values, handleClick }) {

    let [currentSelection, setSelection] = useState(null)
    const handleChange = (event) => {
        setSelection(event.target.value)
    }
    function mapValues(index){
        return (
            <option key = {index} className = "dropdown-text" value={index}>{index}</option>
        )
    }

    let options = []
    options = values.map(mapValues)

    return (
            <div className = "center" style={{
                }}>

                    <label className = "header">{title.toUpperCase()}</label>
                    <select className = "dropdown" onChange = {(event) => {handleClick(event.target.value)}}>
                        {options}
                    </select>

                
            </div>
    )
}

export { Dropdown }