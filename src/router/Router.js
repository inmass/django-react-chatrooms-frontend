import { myRoutes, defaultRoute, loginRoute } from '@router/routes'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Header } from '@components'
import useAuth from '@context/auth/useAuth'

const Router = () => {

    // get the user from the context
    let {user} = useAuth();

    // specify the final route for each route
    const finalRoute = (route) => {
        
        // check if the rout is private and the user is not logged in and redirect to login
        if (
            !route.publicRoute
            && !user
        ) {
            return <Navigate to={loginRoute.path} />
        }
        
        // check if the route is the login route and the user is logged in and redirect to default route
        else if (
            route.meta?.authRoute
            && user
        ) {
            return <Navigate to={defaultRoute.path} />
        }

        // else return the route component
        return route.component
    };
    
    // map the routes
    const routes = myRoutes.map((route, index) => {
        return (
            <Route key={index} path={route.path} element={finalRoute(route)} />
        )
    });
    
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    {routes}
                </Routes>
            </BrowserRouter>
        </div>
    )

}

export { Router }


