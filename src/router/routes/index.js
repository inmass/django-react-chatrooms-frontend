import * as Pages from "@pages";
import { Navigate } from "react-router-dom";

// Routes array
const myRoutes = [

    {
        path: '/login',
        component: <Pages.LoginPage/>,
        LoginRoute: true,
        publicRoute: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: '/register',
        component: <Pages.RegisterPage/>,
        publicRoute: true,
        meta: {
            authRoute: true
        }
    },
    {
        path: '/home',
        component: <Pages.HomePage/>,
        defaultRoute: true,
    },
    {
        path: '/create-room',
        component: <Pages.CreateRoom/>,
    },
    {
        path: '/',
        component: <Navigate to="/home" />,
    },
    {
        path: '*',
        component: <Pages.NotFound/>,
        publicRoute: true,
    }

]

// Find the login route
const loginRoute = myRoutes.find(route => route.LoginRoute);

// Find the default route
const defaultRoute = myRoutes.find(route => route.defaultRoute);

export { myRoutes, loginRoute, defaultRoute }