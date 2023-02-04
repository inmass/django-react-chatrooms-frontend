import jwt_decode from "jwt-decode";
import { createContext, useState, useEffect, useCallback } from "react";
import { handleLogin, handleLogout, handleRefreshTokens } from "@context/auth/Token";

const AuthContext = createContext();

export default AuthContext; 

export const AuthProvider = ({ children }) => {

    // set the authTokens, user and loading states
    const [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null);
    const [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState(null);

    // login function
    const loginUser = async (email, password) => {
        setMessage(null);
        return handleLogin(email, password, setUser, setAuthTokens, setMessage);
    }

    // logout function
    const logoutUser = () => {
        setMessage(null);
        return handleLogout( setUser, setAuthTokens, setMessage );
    };

    // refresh tokens function
    const refreshTokens = useCallback(async () => {
        setMessage(null);
        handleRefreshTokens(authTokens, setAuthTokens, setUser, setMessage);
        setLoading(false);
    }, [authTokens, setAuthTokens, setUser, setMessage]);

    // updating the tokens every 4 minutes
    useEffect(() => {

        // if the user is logged in, refresh the tokens
        if (user) {

            // refresh the tokens on page load
            if (loading) {
                refreshTokens();
            }

            // refresh the tokens every 89 minutes
            let interval = setInterval(() => {
                if (authTokens) {
                    refreshTokens();
                }
            }, 89 * 60 * 1000);
            return () => clearInterval(interval);

        }
        // if the user is not logged in, stop the loading state
        else {
            setLoading(false);
        }

    }, [authTokens, user, loading, refreshTokens]);


    const contextData = {
        loginUser,
        logoutUser,
        user,
        authTokens,
        loading,
        message
    };

    return (
        <AuthContext.Provider value={contextData}>
            { loading ? <div>Loading...</div> : children }
        </AuthContext.Provider>
    )
}