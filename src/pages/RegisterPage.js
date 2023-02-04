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

const RegisterPage = () => {
    // get the loginUser function from the context
    const { registerUser, message } = useAuth()
    // set the username, password, passwordConfirmation, loading and collapseOpen states
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [loading, setLoading] = useState(false)
    const [collapseOpen, setCollapseOpen] = useState(true);

    const handleSubmit = async (e) => {

        e.preventDefault()
    
        setLoading(true)
    
        await registerUser(username, password, passwordConfirmation)
    
        setLoading(false)
    
    }

    useEffect(() => {
        if (message) {
            setCollapseOpen(true)
            if (message.detail === 'Successfully registered! logging in...') {
                setLoading(true)
            }
        }
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
                    Register
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
                    <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password_confirmation"
                    label="Password Confirmation"
                    type="password"
                    id="password_confirmation"
                    onChange={e => setPasswordConfirmation(e.target.value)}
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
                        Register
                        </LoadingButton> :

                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Register
                        </Button>
                    }
                    <Grid container>
                        <Grid item>
                            <Link to="/login" variant="body2">
                            Have an account? Login
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterPage