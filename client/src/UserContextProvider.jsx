import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
    userData: null,
    setUserData: null
});


const UserContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    return <UserContext.Provider value={{ userData, setUserData }}>
        {children}
    </UserContext.Provider>
};


export const useUserContext = () => useContext(UserContext)

export default UserContextProvider