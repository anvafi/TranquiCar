import { createContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {

    const [user, setUser] = useState(null);

    function login(userData) {
        setUser(userData);
    }

    function logout() {
        setUser(null);
    }

    return (
        <Context.Provider
            value={{
                user,
                login,
                logout
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default Context;