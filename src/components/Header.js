import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '@context/auth/useAuth'
import { AppBar, Toolbar, Typography, Button } from '@mui/material'

const Header = () => {

  let {user, logoutUser} = useAuth()

  return (
    // <header>
    //     <Link to="/home">Home</Link>
    //     <span> | </span>
    //     {user ? 
    //       <Link  onClick={() => {logoutUser()}}>Logout</Link> :
    //       <><Link to="/login">Login</Link>
    //       <span> | </span>
    //       <Link to="/register">Register</Link></>
    //     }
    //     {user ? <p>Welcome {user.username}</p> : null}
    // </header>
    // using material ui header components
    <AppBar position="static">
      <Toolbar
        sx={{
          bgcolor: '#fff',
          color: '#000'
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1
          }}
        >
          Welcome to Django React chatrooms{user ? " " + user.username : null}!
        </Typography>
        <Button
          color="inherit"
          component={Link}
          to="/home"
        >
          Home
        </Button>
        {user ?
          <Button
            color="inherit"
            onClick={() => {logoutUser()}}
          >
            Logout
          </Button> :
          <>
            <Button
              color="inherit"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              color="inherit"
              component={Link}
              to="/register"
            >
              Register
            </Button>
          </>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header