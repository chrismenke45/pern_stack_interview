const CoworkersNamesTable = (props) => {
    const { coworkersNamesArray, nurses, selectedNurseID } = props
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

export default CoworkersNamesTable