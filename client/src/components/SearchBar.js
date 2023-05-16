import React, { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';


function SearchBar() {
    const { activities, filteredByAllCriteria, handleSearchChange, searchQuery, setSearchQuery, filterNeighborhood, setFilterNeighborhood, filterCategory, setFilterCategory, sortByName, sortByCost } = useContext(ActivitiesContext)
    const resetButton = document.getElementById('reset-button');

    function handleNeighborhoodFilter(e){
      setFilterNeighborhood(e.target.value)
    } 

    function handleCategoryFilter(e){
      setFilterCategory(e.target.value)
    }

    function handleReset(){
      setFilterNeighborhood([])
      setFilterCategory([])
      setSearchQuery("")
      resetButton.blur();
      resetButton.style.transform = 'scale(1)';
    }

    // const neighborhoods = [
    //   'Covington',
    //   'Downtown',
    //   'Golf Manor',
    //   'OTR',
    //   'The Banks',
    // ];

    const categories = [...new Set(activities.flatMap((activity) => activity.category))];
    console.log(categories);

    const neighborhoods = [... new Set(activities.flatMap((activity) => activity.neighborhood))];
    console.log(neighborhoods);

    const costs = [
      2,
      8,
      9,
      15,
      95,
    ];

    return (
    <>
    <Paper className="activity-search-container">
          <br></br>
          <div id="sort-buttons-container">
          <button id='sort-alphabetically-button' className='custom-button' onClick={sortByName}>abc</button>
          <button id='sort-by-cost-button' className='custom-button' onClick={sortByCost}>$ - $$$</button><br></br>
          </div>
          <TextField id="input-label-top-color"
            label="Name or neighborhood" 
            variant="outlined" 
            sx={{ m: 1, width: '80%' }}
            value={searchQuery}
            onChange={handleSearchChange} 
          /><br></br>

          <FormControl sx={{ m: 1, width: '80%' }}>
            <InputLabel 
              id="input-label-top-color"
              >Neighborhood</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={filterNeighborhood}
              onChange={handleNeighborhoodFilter}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {neighborhoods.map((neighborhood) => (
                <MenuItem key={neighborhood} value={neighborhood} >
                  <Checkbox checked={filterNeighborhood.indexOf(neighborhood) > -1} />
                  <ListItemText primary={neighborhood} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ m: 1, width: '80%' }}>
            <InputLabel id="input-label-top-color">Category</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={filterCategory}
                onChange={handleCategoryFilter}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    <Checkbox checked={filterCategory.indexOf(category) > -1} />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <button id='reset-button' onClick={handleReset}>reset</button>
    </Paper>  
    </>
    );
};

export default SearchBar;