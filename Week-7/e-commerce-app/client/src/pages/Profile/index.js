import { useAuth } from "../../contexts/AuthContext"

const Profile = () => {

    const {user} = useAuth();
    return(
        <div>
            <h2>Profile</h2>
            <code>{JSON.stringify(user)}</code>
        </div>
    )
}

export default Profile