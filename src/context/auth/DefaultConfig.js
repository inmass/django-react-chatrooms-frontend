// ** Auth Endpoints
const loginEndpoint = process.env.REACT_APP_API_URL + 'api/jwt/token/';
const refreshEndpoint = process.env.REACT_APP_API_URL + 'api/jwt/token/refresh/';
const tokenType = 'Bearer';


export { loginEndpoint, refreshEndpoint, tokenType };