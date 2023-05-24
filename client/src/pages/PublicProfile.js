import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

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
            <h1>{name}'s profile</h1>
            <img id="profile-picture" src={publicProfile?.image} alt="profile-pic"></img>
            <p>{publicProfile?.bio}</p>
            <h4>activities {name} wants to check out:</h4>
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

            <h4>activities {publicProfile?.username} has visited:</h4>
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
                
            <div>
                <h1>{publicProfile?.username} likes:</h1>
                {publicProfile?.user_interests?.map(userInterest => {
                    const interest = publicProfile?.interests.find(interest => interest.id === userInterest.interest_id);
                    if (!interest) return <p>no interests have been chosen yet</p> // ignore invalid user interests
                    return <p key={interest.id}>{interest.name}</p>;
                })}
            </div>   
    </>
        
    )
}

export default PublicProfile;