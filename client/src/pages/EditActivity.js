import { useContext, useState, useEffect, useRef } from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { ActivitiesContext } from '../ActivitiesContext';

function EditActivity() {
    const imageUpload = useRef()
    const { selectedActivity, setSelectedActivity } = useContext(ActivitiesContext)
    console.log("from EditAct.js: ",selectedActivity)
    const [title, setTitle] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [cost, setCost] = useState([]);
    const [address, setAddress] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState([])
    const [activityImage, setActivityImage] = useState([])
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    function handleActivityUpdate(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append('title', title)
        formData.append('neighborhood', neighborhood)
        formData.append('cost', cost)
        formData.append('address', address)
        formData.append('phone_number', phoneNumber)
        formData.append('website', website)

        if (activityImage) {
          formData.append('image', activityImage);
        }

        fetch(`/activities/${selectedActivity.id}`, {
          method: "PATCH",
          body: formData
        })
        .then((r) => {
          setIsLoading(false);
          if (!r.ok) {
            r.json().then((err) => setErrors(err.errors))
          } else {
            r.json().then((updatedActivity) => setSelectedActivity(updatedActivity));
            setErrors([])
          }
        })
      }

    return (
        <>
        {selectedActivity ? (
            <>
            <h1>edit activity</h1>
            <Paper id="edit-activity-paper">
            <Stack>
            <h1>{selectedActivity.title}</h1>
            <p>{selectedActivity.neighborhood}</p>
            <div>
                <img src={selectedActivity.image} id="activity-picture" alt="activity-pic"/>
            </div><br></br>
                <form id="edit-activity-form" onSubmit={handleActivityUpdate}>
                <TextField 
                    id="outlined-basic" 
                    label="title" 
                    variant="outlined"
                    value={selectedActivity.title} 
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ width: '90%' }}
                    /><br></br><br></br>
                    <TextField 
                    id="outlined-basic" 
                    label="neighborhood" 
                    variant="outlined"
                    value={selectedActivity.neighborhood ? selectedActivity.neighborhood : "Neighborhood"} 
                    onChange={(e) => setNeighborhood(e.target.value)}
                    sx={{ width: '90%' }}
                    /><br></br><br></br>
                <Input
                type="file"
                onChange={e => setActivityImage(e.target.files[0])}
                ref={imageUpload}
                accept="image/png, image/jpeg"
                sx={{ width: '90%' }}
                /><br></br><br></br>             
                <Button type="submit">{isLoading ? "Loading..." : "update activity"}</Button>
                <label>
                {errors?.map((err) => (
                    <p key={err}>{err}</p>
                ))}
                </label>
            </form>
            </Stack>
            </Paper>
            </>
        ) : (
            <h1>nobody's here</h1>
        )}
           
        </>
    )
}

export default EditActivity;