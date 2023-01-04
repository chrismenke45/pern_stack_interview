const fetchData = (path) => {
  let url = `http://localhost:5000/${path}`;
  const options = {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
    }
  };
  return fetch(url, options)
    .then(response => response.json())
    .then(shifts => shifts)
    .catch(error => {
      console.error('Error:', error)
    })
}
export default fetchData