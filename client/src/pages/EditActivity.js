import { useState, useEffect, useRef, useContext } from 'react'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { ActivitiesContext } from '../ActivitiesContext';
 

function EditActivity() {
    const { filteredByAllCriteria, setActivities } = useContext(ActivitiesContext)
    const imageUpload = useRef()
    const { id } = useParams();


    const [activity, setActivity] = useState(null)
    const [title, setTitle] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [cost, setCost] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [website, setWebsite] = useState('')
    const [activityImage, setActivityImage] = useState(null)
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch(`/activities/${id}`)
        .then(r => r.json())
        .then(activity => setActivity(activity))
    }, [id, setActivity])

    useEffect(() => {
        if (activity) {
            setTitle(activity.title);
            setNeighborhood(activity.neighborhood);
            setCost(activity.cost)
            setAddress(activity.address)
            setPhoneNumber(activity.phone_number)
            setWebsite(activity.website)
        }
      }, [activity]);

    function handleActivityUpdate(e, id) {
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


        fetch(`/activities/${id}`, {
          method: "PATCH",
          body: formData
        })
        
        .then((r) => {

          setIsLoading(false);
          if (!r.ok) {
            r.json().then((err) => setErrors(err.errors))

          } else {
            r.json().then((updatedActivity) => {
                setActivity(updatedActivity);
                setErrors([])
    
            const newActivities = filteredByAllCriteria.map(act => {
                if (activity.id === act.id) {
                    return updatedActivity
                } else {
                    return act
                }
            });
            setActivities(newActivities)

          })
        }
    })
        
    }


    if (activity === null) {
        return <h2>Loading</h2>
    }

    return (
        <>
            <>
            <div id="edit-activity-container">
            <Paper id="edit-activity-paper">
            <Stack>
            <h1>{activity?.title}</h1>
            <div>
                <img src={activity?.image} id="activity-picture" alt="activity-pic"/>
            </div><br></br>
                <form id="edit-activity-form" onSubmit={(e) => handleActivityUpdate(e, activity.id)}>
                <TextField 
                    id="outlined-basic" 
                    label="title" 
                    variant="outlined"
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{ width: '75%' }}
                    /><br></br><br></br>
                <TextField 
                    id="outlined-basic" 
                    label="neighborhood" 
                    variant="outlined"
                    value={neighborhood} 
                    onChange={(e) => setNeighborhood(e.target.value)}
                    sx={{ width: '75%' }}
                    /><br></br><br></br>
                <TextField 
                    id="outlined-basic" 
                    label="cost" 
                    variant="outlined"
                    value={cost} 
                    onChange={(e) => setCost(e.target.value)}
                    sx={{ width: '75%' }}
                    /><br></br><br></br>
                <TextField 
                    id="outlined-basic" 
                    label="address" 
                    variant="outlined"
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)}
                    sx={{ width: '75%' }}
                    /><br></br><br></br>
                <TextField 
                    id="outlined-basic" 
                    label="phone number" 
                    variant="outlined"
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    sx={{ width: '75%' }}
                    /><br></br><br></br>
                <TextField 
                    id="outlined-basic" 
                    label="website" 
                    variant="outlined"
                    value={website} 
                    onChange={(e) => setWebsite(e.target.value)}
                    sx={{ width: '75%' }}
                    /><br></br><br></br>
                <Input
                    type="file"
                    onChange={e => setActivityImage(e.target.files[0])}
                    ref={imageUpload}
                    accept="image/png, image/jpeg"
                    sx={{ width: '75%' }}
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
            </div>
            </>
        </>
    )
}

export default EditActivity;