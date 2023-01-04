import ShiftListItem from "./ShiftListItem";

function ShiftList(props) {
    const { shifts, selectedShiftIDs, setSelectedShiftIDs } = props

    return (
        <ul id="shiftList">
            {shifts.map(shift => {
                return (
                    <ShiftListItem
                        key={shift.shift_id}
                        shift={shift}
                        selectedShiftIDs={selectedShiftIDs}
                        setSelectedShiftIDs={setSelectedShiftIDs}
                    />)
            })
            }
        </ul>
    );
}

export default ShiftList;