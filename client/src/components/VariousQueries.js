import { useState, useEffect } from "react";
import fetchData from "../functions/fetchData";

function VariousQueries(props) {
    const [nurses, setNurses] = useState([])
    const [selectedNurseID, setSelectedNurseID] = useState(null)
    const [dataToDisplay, setDataToDisplay] = useState(null)

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

    const facilitysNeedsTable = (facilityArray) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Facilty ID</th>
                        <th>Nurse Type</th>
                        <th>Nurses Needed</th>
                    </tr>
                </thead>
                <tbody>
                    {facilityArray.map(facility => {
                        return (
                            <tr key={`${facility.facility_id}${facility.nurse_type_needed}`}>
                                <td>{facility.facility_id}</td>
                                <td>{facility.nurse_type_needed}</td>
                                <td>{facility.remaining_spots}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        )
    }
    const availableJobCountsTable = (availableJobCountsArray) => {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Id</th>
                        <th>Nurse Type</th>
                        <th>Jobs Available</th>
                    </tr>
                </thead>
                <tbody>
                    {availableJobCountsArray.map(nurse => {
                        return (
                            <tr key={nurse.nurse_id}>
                                <td>{nurse.nurse_name}</td>
                                <td>{nurse.nurse_id}</td>
                                <td>{nurse.nurse_type}</td>
                                <td>{nurse.jobs_available_to_nurse}</td>
                            </tr>
                        )
                    })
                    }
                </tbody>
            </table>
        )
    }

    const coworkersNamesTable = (coworkersNamesArray) => {
        let nurseName = nurses.filter(nurse => nurse.nurse_id.toString() === selectedNurseID)[0]
        return (
            <table>
                <thead>
                    <tr>
                        <th>{nurseName.nurse_name}'s coworkers</th>
                    </tr>
                </thead>
                <tbody>
                    {coworkersNamesArray.length > 0 ?
                        coworkersNamesArray.map(coworker => {
                            return (
                                <tr key={coworker.nurse_name}>
                                    <td>{coworker.nurse_name}</td>
                                </tr>
                            )
                        }) :
                        <tr>
                            <td>No coworkers</td>
                        </tr>
                    }
                </tbody>
            </table>
        )
    }

    useEffect(() => {
        fetchData('nurses')
            .then(data => {
                setNurses(data.nurses)
            })
    }, [])


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
            {dataToDisplay?.spotsRemaining && facilitysNeedsTable(dataToDisplay.spotsRemaining)}
            {dataToDisplay?.availableJobsCounts && availableJobCountsTable(dataToDisplay.availableJobsCounts)}
            {dataToDisplay?.coworkersNames && coworkersNamesTable(dataToDisplay.coworkersNames)}
        </div>
    );
}

export default VariousQueries;