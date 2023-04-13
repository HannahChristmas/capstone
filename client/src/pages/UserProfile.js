import { useContext } from 'react'
import { UserContext } from "../UserContext";

function UserProfile () {
    const { user } = useContext(UserContext)

    if (!user) {
        return <p>Profile loading...</p>
    }
    return (
        <>
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
            <h1>{user.username}</h1>
            <p>{user.bio}</p>
            <p>{user.id}</p>
            <form>
                <label>username</label>
            </form>
        </>
    )
}

export default UserProfile;