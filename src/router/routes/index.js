import * as Pages from "@pages";

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
        path: '/home',
        component: <Pages.HomePage/>,
        defaultRoute: true,
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