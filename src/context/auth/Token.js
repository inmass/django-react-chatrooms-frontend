import {loginEndpoint, registerEndpoint, refreshEndpoint} from "@context/auth/DefaultConfig";
import jwt_decode from "jwt-decode";

// handleLogin function to login the user
const handleLogin = async (username, password, setUser, setAuthTokens, setMessage) => {
    
    // send a POST request to the login endpoint
    const response = await fetch( loginEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    // convert the response to json
    const data = await response.json();

    // if the response is 200, set the user and authTokens in the context
    if (response.status === 200) {

        setUser(jwt_decode(data.access))
        setAuthTokens(data);
        // save the authTokens in the localStorage
        localStorage.setItem('authTokens', JSON.stringify(data));
        setMessage('Successfully logged in!')

        return "success";

    } else {

        setMessage(data.detail);
        return data.detail;

    }

}

// handleRegister function to register the user
const handleRegister = async (username, password, password_confirmation, setUser, setAuthTokens, setMessage) => {

    // send a POST request to the register endpoint
    const response = await fetch( registerEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, password_confirmation }),
    });

    // convert the response to json
    const data = await response.json();

    // if the response is 201, set the user and authTokens in the context
    if (response.status === 201) {
        // login the user
        setMessage('Successfully registered! logging in...');
        // wait 5 seconds before logging in
        setTimeout(() => {
            handleLogin(username, password, setUser, setAuthTokens, setMessage);
        }, 5000);

        return "success";
    } else {
        if (data.username) {

            setMessage(data.username[0]);
            return data.username[0];

        } else if (data.password) {

            setMessage(data.password[0]);
            return data.password[0];

        } else {

            setMessage('Something went wrong. Please try again.');
            return 'Something went wrong. Please try again.';

        }
    }
}

// handleRefreshTokens function to refresh the tokens
const handleRefreshTokens = async (authTokens, setAuthTokens, setUser, setMessage) => {

    // send a POST request to the refresh endpoint
    const response = await fetch( refreshEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: authTokens?.refresh }),
    })
    // catch the error if the refresh token is invalid and logout the user
    .catch(() => {
        setMessage('Your session has expired. Please login again.');
        handleLogout(setUser, setAuthTokens)
    });

    // stop the function if the response is false
    if (!response) return false;

    // convert the response to json
    const data = await response.json();

    // if the response is 200, set the user and authTokens in the context
    if (response.status === 200) {

        setUser(jwt_decode(data.access));
        setAuthTokens(data);
        localStorage.setItem('authTokens', JSON.stringify(data));

    }
    // if the response is 401, meaning the refresh token is invalid, logout the user
    else if(response.status === 401){

        setMessage('Your session has expired. Please login again.');
        handleLogout(setUser, setAuthTokens)
        return false;

    }

}

// handleLogout function to logout the user
const handleLogout = (setUser, setAuthTokens, setMessage) => {

    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem('authTokens');
    setMessage('You have been logged out.');

    return true;

}

export { handleLogin, handleRegister, handleLogout, handleRefreshTokens }