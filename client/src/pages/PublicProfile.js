import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Interested from '../photos/Not-interested.png'
import Visited from '../photos/Not-visited.png'
import Likes from '../photos/Not-liked.png'
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


function PublicProfile(){
    const { id } = useParams();
    const [publicProfile, setPublicProfile] = useState(null);

    const publicVisited = publicProfile?.user_activities?.filter(activity => activity.visited)
    const publicInterested = publicProfile?.user_activities?.filter(activity => activity.interested)

    const name = publicProfile?.username

    useEffect(() => {
        fetch(`/users/${id}`)
        .then(r => r.json())
        .then(data => {
            // console.log("data: ", data);
            setPublicProfile(data)
            })
    }, [id]);

    return (
        <>
            <div id="display-profile-container">
            <Grid 
                width="88%" 
                container spacing={0} 
                justifyContent="center"
                >
                    <Paper id="profile-picture-bio-div">
                        <img id="profile-picture-public" src={publicProfile?.image} alt="profile-pic"></img>
                        <h1 id="public-profile-name">{name}</h1>
                        <p>{publicProfile?.bio}</p>
                    </Paper>

                    <Paper id="profile-likes">
                        <img src={Likes} id="public-profile-likes"></img>
                        {publicProfile?.user_interests?.map(userInterest => {
                            const interest = publicProfile?.interests.find(interest => interest.id === userInterest.interest_id);
                            if (!interest) return <p>no interests have been chosen yet</p> // ignore invalid user interests
                            return <p key={interest.id}>{interest.name}</p>;
                        })}
                    </Paper> 

                    <Paper id="profile-interested">
                        <img src={Interested} id="public-profile-interested"></img>
                        {publicInterested?.length === 0 ? (
                            <p>no activities on the wishlist right now</p>
                        ) : (
                            publicInterested?.map(activity => {
                                const interestedList = publicProfile.activities.find(a => a.id === activity.activity_id);
                                return (
                                    <p key={interestedList.id}>{interestedList.title}</p>
                                );
                            })
                        )}
                    </Paper>

                    <Paper id="profile-visited">
                    <img src={Visited} id="public-profile-visited"></img>
                        {publicVisited?.length === 0 ? (
                            <p>{name} hasn't been anywhere in Cincinnati... yet!</p>
                        ) : (
                        publicVisited?.map(activity => {
                                const visitedList = publicProfile.activities.find(a => a.id === activity.activity_id);
                                return (
                                    <p key={visitedList.id}>{visitedList.title}</p>
                                );
                            })
                        )} 
                    </Paper>    
                  
            </Grid>
        </div>
    </>
        
    )
}

export default PublicProfile;