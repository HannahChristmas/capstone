import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PublicProfile(){
    const { id } = useParams();
    const [publicProfile, setPublicProfile] = useState(null);

    useEffect(() => {
        fetch(`/users/${id}`)
        .then(r => r.json())
        .then(data => {
            console.log("data: ", data);
            setPublicProfile(data)
            })
    }, [id]);

    return (
        <>
            <h1>Great</h1>
            <p>user's picture</p>
            <h3>{publicProfile?.username}</h3>
            <p>bio</p>
            <h4>Activities user is interested in:</h4>
                {publicProfile?.user_activities.filter(activity => activity.interested)
                .map(activity => {
                    const interestedList = publicProfile.activities.find(a => a.id === activity.activity_id)
                    return (
                        <p key={interestedList.id}>{interestedList.title}</p>
                    )
                })}

            <h4>Activities user has visited:</h4>
                {publicProfile?.user_activities.filter(activity => activity.visited)
                    .map(activity => {
                        const visitedList = publicProfile.activities.find(a => a.id === activity.activity_id)   
                        return (
                            <p key={visitedList.id}>{visitedList.title}</p>
                        )
                })}        
        </>
        
    )
}

export default PublicProfile;