// ** Auth Endpoints
const loginEndpoint = process.env.REACT_APP_API_URL + 'api/jwt/token/';
const refreshEndpoint = process.env.REACT_APP_API_URL + 'api/jwt/token/refresh/';
const registerEndpoint = process.env.REACT_APP_API_URL + 'api/register/';
const tokenType = 'Bearer';


export { loginEndpoint, registerEndpoint, refreshEndpoint, tokenType };