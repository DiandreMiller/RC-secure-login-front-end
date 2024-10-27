import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [canRegisterPasskey, setCanRegisterPasskey] = useState(false);

    const login = (token) => {
        setIsAuthenticated(true);
        setToken(token);
        setCanRegisterPasskey(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        setCanRegisterPasskey(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, login, logout, canRegisterPasskey }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export { AuthProvider };
