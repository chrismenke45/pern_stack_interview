const AvailableJobsCountsTable = (props) => {
    const { availableJobsCountsArray } = props
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
                {availableJobsCountsArray.map(nurse => {
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

export default AvailableJobsCountsTable