import { useContext, useState, useEffect, useRef } from 'react'
import { UserContext } from "../UserContext";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import { Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'Culture',
  'Festivals',
  'Fitness',
  'Going Out',
  'Hobbies',
  'Playing Sports',
  'Sporting Events',
  'Water Sports',
];


function EditProfile () {
    const { user, setUser, selectedImage, setSelectedImage } = useContext(UserContext)
    const imageUpload = useRef()

    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [interests, setInterests] = useState([]);
    const [userInterests, setUserInterests] = useState([]);
    const [searchInterest, setSearchInterest] = useState('');
    const [filterCategory, setFilterCategory] = useState([])

    const filteredUserInterests = userInterests?.filter((interest) => 
      interest.user?.id === user?.id)

    const handleSearchChange = (e) => {
        setSearchInterest(e.target.value);
    };

    function handleCategoryFilter(e){
        setFilterCategory(e.target.value)
      } 

      function handleReset(){
        setFilterCategory([])
        setSearchInterest("")
      }

    const searchList = interests.filter(interest => {
        const { name, category } = interest;
        const lowerCaseQuery = searchInterest.toLowerCase();
        return (
          name.toLowerCase().includes(lowerCaseQuery) ||
          category.toLowerCase().includes(lowerCaseQuery)
        );
      });
    
    const filteredByAllCriteria = searchList.filter(interest => {
      if (filterCategory.length === 0 || filterCategory.includes(interest.category)) {
        return true
        } else {
            return false
        }
        })

    useEffect(() => {
        if (user) {
            setUsername(user.username)
            setBio(user.bio)
            // setUserInterests(user.interests)
        }
      }, [user])

    useEffect(() => {
      fetch("/interests")
      .then(r => r.json())
      .then(interests => {
        setInterests(interests)
      })
      }, [setInterests])

    useEffect(() => {
      fetch("/user_interests")
      .then(r => r.json())
      .then(interests => {
        setUserInterests(interests)
      })
      }, [setUserInterests])

    const handleInterestClick = (interestId) => {
      fetch("/user_interests", {
        method: 'POST',
        body: JSON.stringify({
          user_id: user.id,
          interest_id: interestId
        }), 
          headers: {
          'Content-Type': 'application/json'
          }
      })
        .then(r => r.json())
        .then(data => {
          setUserInterests([...userInterests, data])
        })        
    }

    const handleInterestDelete = (interestId) => {
      fetch(`/user_interests/${interestId}`, {
        method: 'DELETE',
      })
      .then(response => {
        if (response.ok) {
          setUserInterests(userInterests.filter(interest => interest.id !== interestId));
        } else {
          throw new Error('Failed to delete interest');
        }
      })
      .catch(error => console.error(error));    
    }

    function handlePostUpdateSubmit(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('username', username)
        formData.append('bio', bio)

        if (selectedImage) {
          formData.append('image', selectedImage);
        }

        fetch(`/me`, {
          method: "PATCH",
          body: formData
        })
        .then((r) => {
          setIsLoading(false);
          if (!r.ok) {
            r.json().then((err) => setErrors(err.errors))
          } else {
            r.json().then((updatedProfile) => setUser(updatedProfile));
            setErrors([])
          }
        })
      }

    if (!user) {
        return <p>Profile loading...</p>
    }
    
    return ( 
        <>
        <div id="main-edit-profile-container">
          {/* MAIN GRID */}
        <Grid  border="2px solid red" width="88%" container spacing={0} justifyContent="center">

          {/* PAPER WITH PIC */}
          <Paper>
            <Stack>
              <h1>{user.username}</h1>
              <p>{user.bio}</p><br></br>
              <div >
                <img src={user.image} id="profile-picture" alt="pro-pic"/>
              </div><br></br><br></br>
                <form onSubmit={handlePostUpdateSubmit}>
                <TextField 
                      id="outlined-basic" 
                      label="username" 
                      variant="outlined"
                      value={username} 
                      onChange={(e) => setUsername(e.target.value)}
                      sx={{ width: '90%' }}
                    /><br></br><br></br>
                    <TextField 
                      id="outlined-basic" 
                      label="bio" 
                      variant="outlined"
                      value={bio ? bio : "Enter bio here"} 
                      onChange={(e) => setBio(e.target.value)}
                      sx={{ width: '90%' }}
                    /><br></br><br></br>
                <Input
                  type="file"
                  onChange={e => setSelectedImage(e.target.files[0])}
                  ref={imageUpload}
                  accept="image/png, image/jpeg"
                  sx={{ width: '90%' }}
                /><br></br><br></br>             
                <Button type="submit">{isLoading ? "Loading..." : "update profile"}</Button>
                <label>
                  {errors?.map((err) => (
                      <p key={err}>{err}</p>
                  ))}
                </label>
              </form>
            </Stack>
          </Paper>
          
          {/* PAPER WITH INTERESTS */}
            <Paper >
            <h4 id="add-interests-h4">ADD INTERESTS:</h4>
              <TextField 
                  label="Search" 
                  variant="outlined" 
                  sx={{ m: 1, width: '40%' }}
                  value={searchInterest}
                  onChange={handleSearchChange} 
              />
              <FormControl sx={{ m: 1, width: '40%' }}>
                <InputLabel id="demo-multiple-checkbox-label">Category</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={filterCategory}
                  onChange={handleCategoryFilter}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      <Checkbox checked={filterCategory.indexOf(category) > -1} />
                      <ListItemText primary={category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button onClick={handleReset}>reset</Button>
            <Stack>
                <div container id="scrollable-interests">
                  {filteredByAllCriteria.map((interest) => {
                    const isInterestSelected = filteredUserInterests.find((userInterest) => userInterest.interest_id === interest.id);
                    if (isInterestSelected) {
                      return null;
                    }
                    return (
                      <div id="individual-interest-buttons" key={interest.id}>
                        <Button onClick={() => handleInterestClick(interest.id)}
                          variant="outlined"
                          size="small"
                          startIcon={<AddIcon />}>
                            {interest.name}
                        </Button>
                      </div>
                    );
                  })}
                </div>

                {/* DELETE INTERESTS SPOT- ALREADY SELECTED INTERESTS */}
                <div id="your-interests-container">
                  <div id="heading-container">
                    <h4>Your interests:</h4>
                  </div>
                    <div>
                        {filteredUserInterests?.map((interest) => (
                        <div id="individual-interest-all" key={interest.id}>
                        <Button onClick={() => handleInterestDelete(interest.id)}
                          variant="outlined"
                          size="small"
                          startIcon={<DeleteIcon />}>
                            {interest.interest.name}
                        </Button>
                        </div>
                        ))}
                    </div>     
                </div>
              </Stack>
            </Paper>
        </Grid>
        </div>
        </>
    )
}

export default EditProfile;