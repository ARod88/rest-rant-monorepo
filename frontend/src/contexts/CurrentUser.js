import { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    window.setCurrentUser = setCurrentUser;

    useEffect(() => {
        const getLoggedInUser = async () => {
            let response = await fetch(
                "http://localhost:5000/authentication/profile",
                {
                    credentials: "include",
                }
            );
            let user = await response.json();
            if (response.ok) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        };
        getLoggedInUser();
    }, []);

    return (
        <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUser.Provider>
    );
}

export default CurrentUserProvider;