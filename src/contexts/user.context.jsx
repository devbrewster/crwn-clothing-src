import {createContext, useEffect, useState} from "react";
import {createUserDocumentFromAuth, onAuthStateChangedListener,} from "../utils/firebase.utils";

// as the actual value you want to access
export const UserContext = createContext({
        setCurrentUser: () => null,
        currentUser: null,
    }
);
// user provider
export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const value = {currentUser, setCurrentUser}

    //handles User Authentication and Storage of user snapshot
    useEffect(() => {
        return onAuthStateChangedListener(async (user) => {
            if(user) {
               await createUserDocumentFromAuth(user)            }
            setCurrentUser(user)
        })
    }, [])
    ///////////////////////////////////////////////////////////

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}