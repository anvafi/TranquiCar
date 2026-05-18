// import { createContext, useState } from 'react';
// const Context = createContext();
// export const Provider = ({ children }) => {
//     const [counter, setCounter] = useState(0);
//     return (
//         <Context.Provider value={{ counter, setCounter }}>
//             {children}
//         </Context.Provider>
//     );
// };
// export default Context;
import { createContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
    //El user de la sesión, pasa a ser el contexto
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