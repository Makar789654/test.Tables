import { useEffect, useState } from "react";
import "./App.css";


  
function App() {
  const [data, setData] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null); // Added selectedCharacter state
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Added currentPage state
  const [showDetails, setShowDetails] = useState(false);

  const fetchData = () => {
    let url = `https://rickandmortyapi.com/api/character?page=${currentPage}`;

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
    setSelectedRow(id);
  }
  function handleRowClick(id) {
    if (selectedRow === id) {
      setShowDetails(!showDetails); // Toggle the showDetails state when the same row is clicked
    } else {
      setSelectedRow(id);
      setShowDetails(true); // Show the details component when a different row is clicked
    }
  }
  function goToNextPage() {
    setCurrentPage(currentPage + 1);
    setSelectedRow(null); // Reset selected row when navigating to the next page
  }

  function goToPreviousPage() {
    setCurrentPage(currentPage - 1);
    setSelectedRow(null); // Reset selected row when navigating to the previous page
  }
  useEffect(() => {
    fetchData();
  }, [selectedRow, currentPage]);
 
  return (
    <div className="App">
       
      <tbody>
      <h2>Rick and Morty  dynamic table app</h2>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <p>{currentPage}</p>
        <button onClick={goToNextPage}>Next Page</button>
      </div>
        <tr>
          <th>Picture</th>
          <th>Name</th>
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
            <td>{item.species}</td>
            <td>{item.gender}</td>
          </tr>
        ))}
      </tbody>
      {selectedCharacter && showDetails &&(
      <div className="character-details">
        <h2>Character Details</h2>
        <img src={selectedCharacter.image} alt="picture" />
        <p>Name: {selectedCharacter.name}</p>
        <p>Status: {selectedCharacter.status}</p>
        <p>Species: {selectedCharacter.species}</p>
        <p>Gender: {selectedCharacter.gender}</p>
        <p>From: {selectedCharacter.origin.name}</p>
        {/* Render additional character details as needed */}
      </div>
    )}
    </div>
  );
}

export default App;