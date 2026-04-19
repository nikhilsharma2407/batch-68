import { useContext } from 'react';
import { UserContext } from '../UserContextProvider';

const useIsLoggedIn = () => {
    const { userData } = useContext(UserContext);
    return userData || false;
};

export default useIsLoggedIn;
