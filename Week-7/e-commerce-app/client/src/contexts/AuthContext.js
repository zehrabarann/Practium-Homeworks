import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import { useState, createContext, useContext} from "react"
import { fetchMe } from "../api";

const AuthContext = createContext()


const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try{
                const me = await fetchMe();
                setLoggedIn(true)
                setUser(me)
                console.log("me",me)
                setLoading(false)
            }catch(err){ 
                setLoading(false)
            }
        })()
    },[])

    const login = (data) => {
        setLoggedIn(true)
        setUser(data.user)

        localStorage.setItem('acces token', data.accessToken)
        localStorage.setItem('refresh token', data.refreshToken)

    }

    const values = {
        loggedIn,
        user,
        login
    }

    if(loading) {
        return(
            <Flex justifyContent="center" alignItems="center" h="100vh">
                <Spinner 
                thickness="4px" 
                speed="0.65s" 
                emptyColor="gray.200" 
                size="xl" 
                color="red.500"/>
            </Flex>
        )
    }
    return(
        <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {AuthProvider, useAuth}