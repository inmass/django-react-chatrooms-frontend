import React, { useState, useEffect } from 'react'
import useAuth from '@context/auth/useAuth'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom'

const LoginPage = () => {

  // get the loginUser function from the context
  const { loginUser, message } = useAuth()
  // set the username, password, error, loading and collapseOpen states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [collapseOpen, setCollapseOpen] = useState(true);

  // handle the form submit
  const handleSubmit = async (e) => {

    e.preventDefault()

    setLoading(true)

    await loginUser(username, password)

    setLoading(false)

  }

  useEffect( () => {
    if (message) setCollapseOpen(true)
  }, [message])

  return (
    <Container component="main" maxWidth="xs">
      <Box
      sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
      }}
      >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
              Log yourself in!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                  severity={message.type}
                  >
                  {message.detail}
                  </Alert>
              </Collapse> :
              null
          }
              <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={e => setUsername(e.target.value)}
              />
              <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              />
              {
                  loading ?

                  <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  loading
                  >
                  Log In
                  </LoadingButton> :

                  <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  {...(username && password ? {} : {disabled: true})}
                  >
                  Log In
                  </Button>
              }
              <Grid container>
                  <Grid item>
                      <Link
                      component={RouterLink}
                      to="/register"
                      variant="body2"
                      >
                        Don't have an account? Register
                      </Link>
                  </Grid>
              </Grid>
          </Box>
      </Box>
    </Container>
  )
}

export default LoginPage