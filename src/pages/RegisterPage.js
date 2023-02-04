import React, { useState, useEffect } from 'react'
import useAuth from '@context/auth/useAuth'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

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
        if (message) setCollapseOpen(true)
    }, [message])

    return (
        <div>
            <h1>RegisterPage</h1>
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
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" onChange={e => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={e => setPassword(e.target.value)} />
                <label htmlFor="password_confirmation">Password Confirmation</label>
                <input type="password" name="password_confirmation" id="password_confirmation" onChange={e => setPasswordConfirmation(e.target.value)} />
                {
                    loading ?
                    <p>Loading...</p> :
                    <button type="submit">Register</button>
                }
            </form>
        </div>
    )
}

export default RegisterPage