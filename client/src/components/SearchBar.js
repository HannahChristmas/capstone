import React, { useContext } from 'react';
import { ActivitiesContext } from '../ActivitiesContext';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { makeStyles } from '@mui/styles';


function SearchBar() {
    const { handleSearchChange, searchQuery, setSearchQuery, filterNeighborhood, setFilterNeighborhood, filterCost, setFilterCost, sortByName, sortByCost } = useContext(ActivitiesContext)

    const useStyles = makeStyles(() => ({
      menuItem: {
        fontFamily: 'Quicksand',
        color: '#125B50',
      },
    }));

    const classes = useStyles();


    function handleNeighborhoodFilter(e){
      setFilterNeighborhood(e.target.value)
    } 

    function handleCostFilter(e){
        setFilterCost(e.target.value)
    }

    function handleReset(){
      setFilterNeighborhood([])
      setFilterCost([])
      setSearchQuery("")
    }

    const neighborhoods = [
      'Covington',
      'Downtown',
      'Golf Manor',
      'OTR',
      'The Banks',
    ];

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
                <MenuItem key={neighborhood} value={neighborhood} classes={{ root: classes.menuItem }}>
                  <Checkbox checked={filterNeighborhood.indexOf(neighborhood) > -1} />
                  <ListItemText primary={neighborhood} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ m: 1, width: '80%' }}>
            <InputLabel id="input-label-top-color">Cost</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={filterCost}
                onChange={handleCostFilter}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {costs.map((cost) => (
                  <MenuItem key={cost} value={cost}>
                    <Checkbox checked={filterCost.indexOf(cost) > -1} />
                    <ListItemText primary={cost} />
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
          <Button onClick={handleReset}>reset</Button>
    </Paper>  
    </>
    );
};

export default SearchBar;