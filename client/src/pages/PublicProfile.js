import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function PublicProfile(){
    const { id } = useParams();
    const [publicProfile, setPublicProfile] = useState(null);



    useEffect(() => {
        fetch(`/users/${id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data);
            setPublicProfile(data)
        })
    }, [id]);

    return (
        <>
        <h1>Great</h1>
        <h3>{publicProfile?.username}</h3>
        {/* <h2>{publicProfile.username}</h2> */}
        </>
        
    )
}

export default PublicProfile;