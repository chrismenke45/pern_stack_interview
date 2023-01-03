import { useEffect } from "react";

function App() {
  useEffect(() => {
    let url = "http://localhost:5000";
        const options = {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
            }
        };
        fetch(url, options)
            .then((response) => response.json())
            .then(nurses => {
                console.log(nurses)
            })
            .catch(error => {
                console.error('Error:', error)
            })
  })
  return (
    <div>
      <h1>Pern</h1>
    </div>
  );
}

export default App;
