import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PublicProfile(){
    const { id } = useParams();
    const [publicProfile, setPublicProfile] = useState(null);

    const publicVisited = publicProfile?.user_activities.filter(activity => activity.visited)
    const publicInterested = publicProfile?.user_activities.filter(activity => activity.interested)

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
                {publicInterested?.length === 0 ? (
                    <p>no</p>
                ) : (
                    publicInterested?.map(activity => {
                        const interestedList = publicProfile.activities.find(a => a.id === activity.activity_id);
                        return (
                            <p key={interestedList.id}>{interestedList.title}</p>
                        );
                    })
                )}

            <h4>Activities user has visited:</h4>
                {publicVisited?.length === 0 ? (
                    <p>no</p>
                ) : (
                publicVisited?.map(activity => {
                        const visitedList = publicProfile.activities.find(a => a.id === activity.activity_id);
                        return (
                            <p key={visitedList.id}>{visitedList.title}</p>
                        );
                    })
                )}
                
            <div>
                <h1>User Interests:</h1>
                {publicProfile?.user_interests.map(userInterest => {
                    const interest = publicProfile?.interests.find(interest => interest.id === userInterest.interest_id);
                    if (!interest) return null; // ignore invalid user interests
                    return <p key={interest.id}>{interest.name}</p>;
                })}
            </div>   
    </>
        
    )
}

export default PublicProfile;