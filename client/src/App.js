import { useEffect, useState } from "react";
import ShiftList from "./components/ShiftList";
import fetchData from "./functions/fetchData";
import SelectedShifts from "./components/SelectedShifts";
import VariousQueries from "./components/VariousQueries";

function App() {
  const [shifts, setShifts] = useState([])
  const [selectedShiftIDs, setSelectedShiftIDs] = useState([])

  useEffect(() => {
    fetchData("shifts").then(data => {
      setShifts(data.shifts)
    })
  }, [])

  return (
    <main>
      <h1>PERN Stack Interview</h1>
      <SelectedShifts selectedShiftIDs={selectedShiftIDs} />
      {shifts.length !== 0 && <ShiftList shifts={shifts} selectedShiftIDs={selectedShiftIDs} setSelectedShiftIDs={setSelectedShiftIDs} />}
      <VariousQueries />
    </main>
  );
}

export default App;
