import { useState, useEffect } from "react";
import fetchData from "../functions/fetchData";

import FacilitysNeedsTable from './queryTables/FacilitysNeedsTable'
import CoworkersNamesTable from './queryTables/CoworkersNamesTable'
import AvailableJobsCountsTable from './queryTables/AvailableJobsCountsTable'

function VariousQueries(props) {
    const [nurses, setNurses] = useState([])
    const [selectedNurseID, setSelectedNurseID] = useState(null)
    const [dataToDisplay, setDataToDisplay] = useState(null)

    useEffect(() => {
        fetchData('nurses')
            .then(data => {
                setNurses(data.nurses)
            })
    }, [])

    const querySend = (e, queryID, nurse_id) => {
        if (queryID === "Q6") {
            if (nurse_id) {
                queryID += "?id=" + nurse_id
            } else {
                return
            }
        }
        fetchData(`specificQuery/${queryID}`)
            .then(data => {
                setDataToDisplay(data)
            })
    }

    const selectNurse = (e) => {
        setSelectedNurseID(e.target.value)
        querySend(null, "Q6", e.target.value)
    }
    const clearNurse = (e) => {
        setSelectedNurseID(null)
        setDataToDisplay(null)
    }

    return (
        <div id="variousQueries">
            <form onSubmit={(e) => e.preventDefault()}>
                <button onClick={(e) => querySend(e, "Q4")}>Exexute Query 4</button>
                <button onClick={(e) => querySend(e, "Q5")}>Execute Query 5</button>
                <select onChange={selectNurse} onFocus={clearNurse} defaultValue={'DEFAULT'}>
                    <option value={"DEFAULT"} disabled>Exexute Query 6</option>
                    {nurses && nurses.map(nurse => {
                        return <option key={nurse.nurse_id} value={nurse.nurse_id}>{nurse.nurse_name}</option>
                    })}
                </select>
            </form>
            {dataToDisplay?.spotsRemaining && <FacilitysNeedsTable facilityArray={dataToDisplay.spotsRemaining} />}
            {dataToDisplay?.availableJobsCounts && <AvailableJobsCountsTable availableJobsCountsArray={dataToDisplay.availableJobsCounts} />}
            {dataToDisplay?.coworkersNames && <CoworkersNamesTable coworkersNamesArray={dataToDisplay.coworkersNames} nurses={nurses} selectedNurseID={selectedNurseID} />}
        </div>
    );
}

export default VariousQueries;