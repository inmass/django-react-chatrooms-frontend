import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '@context/auth/useAuth'

const Header = () => {

  let {user, logoutUser} = useAuth()

  return (
    <header>
        <Link to="/home">Home</Link>
        <span> | </span>
        {user ? 
          <Link  onClick={() => {logoutUser()}}>Logout</Link> :
          <Link to="/login">Login</Link>
        }
        {user ? <p>Welcome {user.name}</p> : null}
    </header>
  )
}

export default Header