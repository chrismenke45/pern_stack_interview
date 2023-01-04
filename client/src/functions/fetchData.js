const fetchData = (path) => {
  let url = `${process.env.REACT_APP_API_URL}/${path}`;
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