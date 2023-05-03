import React, { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';

function SearchBar() {
    const { handleSearchChange, searchQuery, setSearchQuery, setFilterNeighborhood, setFilterCost } = useContext(ActivitiesContext)

    function handleNeighborhoodFilter(e){
      setFilterNeighborhood(e.target.value)
    } 

    function handleCostFilter(e){
      const selectedValue = e.target.value;
      if (selectedValue === "Cost") {
        setFilterCost("Cost");
      } else {
        setFilterCost(parseInt(selectedValue))
      }
    }

    function handleReset(){
      setFilterNeighborhood("Neighborhood")
      setFilterCost("Cost")
      setSearchQuery("")
    }

    return (
    <>
    <div className="activity-search-container">
        <h4>This is the search bar component</h4>
        <div>
          <input type="text" value={searchQuery} onChange={handleSearchChange} />
        <br></br>
        <strong className="strong"> Filter By: </strong><br></br>
        <select className={"dropdown-filter"} onChange={handleNeighborhoodFilter}>
            <option value="Neighborhood">Neighborhood</option>
            <option value="Covington">Covington</option>
            <option value="Downtown">Downtown</option>
            <option value="Golf Manor">Golf Manor</option>
            <option value="OTR">OTR</option>
            <option value="The Banks">The Banks</option>
        </select><br></br>
        
        <select className={"dropdown-filter"} onChange={handleCostFilter}>
            <option value="Cost">Cost</option>
            <option value="2">2</option>
            <option value="8">8</option>
            <option value="9">9</option>        
            <option value="15">15</option>
            <option value="95">95</option>
        </select><br></br>
        <button onClick={handleReset}>Reset</button>
        </div>
          
    </div>
    
    </>
    );
};

export default SearchBar;