import React, { useState, useEffect } from 'react'
import useAuth from '@context/auth/useAuth'
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';

const LoginPage = () => {

  // get the loginUser function from the context
  const { loginUser, message } = useAuth()
  // set the email, password, error and loading states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [collapseOpen, setCollapseOpen] = useState(true);

  // handle the form submit
  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    await loginUser(email, password)

    setLoading(false)

  }

  useEffect( () => {
    if (message) setCollapseOpen(true)
  }, [message])

  return (
    <div>
        <h1>Login Page</h1>
        {
          message ?
          <Collapse in={collapseOpen}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setCollapseOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
              severity='error'
            >
              {message}
            </Alert>
          </Collapse> :
          null
        }
        <form action="" method="post" onSubmit={handleSubmit}>
            <input type="email" name="email" id="email" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="password" id="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} />
            {
              loading ?
              <LoadingButton type="submit" variant="contained" loading>Login</LoadingButton> :
              <Button type="submit" variant="contained">Login</Button>
            }
        </form>
    </div>
  )
}

export default LoginPage