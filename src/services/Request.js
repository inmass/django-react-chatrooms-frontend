// get request function
const get = async (url, tokens, logout) => {

    // fetch the data from the api
    const response = await fetch( process.env.REACT_APP_API_URL + url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`
        }
    })

    // convert the response to json
    const data = await response.json()
    
    // if the response is 200, return the data
    if (response.status === 200) {
        return data;
    }
    // if the response is not 200, meaning the token is invalid, logout the user
    else {
        logout();
        return false;
    }

}

// post request function
const post = async (url, payload, tokens, logout) => {
    // post the data to the api
    const response = await fetch( process.env.REACT_APP_API_URL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokens.access}`
        },
        body: JSON.stringify(payload)
    });

    // convert the response to json
    const data = await response.json();

    // if the response is 200, return the data
    if (response.status === 200) {
        return data;
    }
    // if the response is not 200, meaning the token is invalid, logout the user
    else {
        logout();
        return false;
    }
}

export { get, post };