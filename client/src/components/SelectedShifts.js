import { useState, useEffect } from "react";
import fetchData from "../functions/fetchData";

function SelectedShifts(props) {
    const { selectedShiftIDs } = props
    const [comparison, setComparison] = useState({ noComparison: "Please select two shifts below to compare" })

    const comparisonSearch = (e) => {
        e.preventDefault()
        if (selectedShiftIDs[0] && selectedShiftIDs[1]) {
            fetchData(`shifts/compare?id1=${selectedShiftIDs[0]}&id2=${selectedShiftIDs[1]}`)
                .then(data => {
                    setComparison(data)
                })
        } else {
            setComparison({ noComparison: "You MUST select two shifts below to compare" })
        }
    }

    useEffect(() => {
        setComparison({ noComparison: "Please select two shifts below to compare" })
    }, [selectedShiftIDs])

    return (
        <section id="comparisonBox">
            {comparison.noComparison ?
                <div className="comparisonExplantion">
                    {comparison.noComparison}
                </div> :
                <div className="comparisonExplantion">
                    <span>Minutes of Overlap: {comparison.overlapMinutes}</span>
                    <span>Max Overlap Threshold: {comparison.maxOverlapMinutes}</span>
                    <span>Exceeds Overlap Threshold: {comparison.exceedsOverlapThreshold.toString()}</span>
                </div>}
            <form onSubmit={comparisonSearch}>
                <button type="submit">Submit</button>
            </form>
        </section>
    );
}

export default SelectedShifts;