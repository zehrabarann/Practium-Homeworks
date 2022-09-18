import { Button } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext"
import { useNavigate } from 'react-router-dom';



const Profile = () => {
    const {user, logout} = useAuth();
    const history = useNavigate();
    

    const handleLogout = async() => {
        
        logout(() => {
            history('/');

        });
    }

     
    return(
        <div>
            <h2>Profile</h2>
            <code>{JSON.stringify(user)}</code>

            <div>
                <Button colorScheme="teal" onClick={handleLogout}>Logout</Button>
            </div>
        </div>
    )
}

export default Profile