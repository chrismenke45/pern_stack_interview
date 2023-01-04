import { useState } from "react"
import to12HourFormat from "../functions/to12HourFormat"
function ShiftListItem(props) {
    const { shift, selectedShiftIDs, setSelectedShiftIDs } = props
    const addShiftToSelected = (e, shiftID) => {
        e.preventDefault()
        setSelectedShiftIDs(prev => {
            if (prev.includes(shiftID)) {
                prev.splice(prev.indexOf(shiftID), 1);
            } else { 
                prev.push(shiftID) 
            }
            if (prev.length > 2) { prev.shift() }
            return [...prev]
        })
    }
    return (
        <li className="shiftListItem">
            <button onClick={(e) => addShiftToSelected(e, shift.shift_id)} className={selectedShiftIDs.includes(shift.shift_id) ? "selected" : null}>
                <h3>{shift.facility_name}</h3>
                <span>{shift.shift_date.split("T")[0]}</span>
                <span>{to12HourFormat(shift.start_time)} - {to12HourFormat(shift.end_time)}</span>
            </button>
        </li>
    );
}

export default ShiftListItem;