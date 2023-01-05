const FacilitysNeedsTable = (props) => {
    const { facilityArray } = props
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

export default FacilitysNeedsTable