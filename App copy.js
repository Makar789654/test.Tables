import { useEffect, useState } from "react";
import "./App.css";


  
function App() {
  const [data, setData] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Added selectedCharacter state
  const [selectedRow, setSelectedRow] = useState(null);
  
  const fetchData = () => {
    let url = `https://rickandmortyapi.com/api/character`;

    if (selectedRow !== null) {
      const selectedCharacterId = data[selectedRow].id;
      url = `https://rickandmortyapi.com/api/character/${selectedCharacterId}`;
    }
  
    fetch(url)
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        if (selectedRow !== null) {
          setSelectedCharacter(actualData);
        } else {
          setData(actualData.results);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  function handleRowClick(id) {
    fetchData();
    setSelectedRow(id);
  }
  useEffect(() => {
    fetchData();
  }, []);
 
  return (
    <div className="App">
       
      <tbody>
      <h2>Rick and Morty app</h2>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Status</th>
          <th>Species</th>
          <th>Gender</th>
        </tr>
        {data.map((item, id) => (
          <tr key={id}
          className={selectedRow === id ? "selected" : ""} // Apply "selected" class if the row is selected
          onClick={() => handleRowClick(id)} // Call handleRowClick function on row click
          >
             <td>
              <img src={item.image} alt="" height={48} />
            </td>
            <td>{item.name}</td>
            <td>{item.status}</td>
            <td>{item.species}</td>
            <td>{item.gender}</td>
          </tr>
        ))}
      </tbody>
      {selectedCharacter && (
      <div className="character-details">
        <h2>Character Details</h2>
        <img src={selectedCharacter.image} alt="picture" />
        <p>Name: {selectedCharacter.name}</p>
        <p>Status: {selectedCharacter.status}</p>
        <p>Species: {selectedCharacter.species}</p>
        <p>Gender: {selectedCharacter.gender}</p>
        {/* Render additional character details as needed */}
      </div>
    )}
    </div>
  );
}

export default App;