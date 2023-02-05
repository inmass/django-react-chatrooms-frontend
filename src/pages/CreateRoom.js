import React, { useState } from 'react'
import useAuth from '@context/auth/useAuth'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { post } from '@services/Request'
import { apiUrls } from '@services/ApiUrls'

const CreateRoom = () => {

    const { authTokens, logoutUser } = useAuth()
    const [roomName, setRoomName] = useState('')
    const [roomDescription, setRoomDescription] = useState('')
    const [message, setMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [collapseOpen, setCollapseOpen] = useState(true);

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)
        if ( roomName && roomDescription ) {
            const response = await post(
                apiUrls.createRoom,
                {
                    name: roomName,
                    description: roomDescription
                },
                authTokens,
                logoutUser
            )
            if (response) {
                setMessage({ type: 'success', detail: response.detail })
                // redirect to the home page
                window.location.href = '/home'
            } else {
                setMessage({ type: 'error', detail: 'Something went wrong, Please try again later!' })
            }
        } else {
            setMessage({ type: 'error', detail: 'Please fill all the fields!' })
        }
        setLoading(false)
    }

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
                    <AddCircleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create a new chatroom
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
                        id="roomName"
                        label="Room Name"
                        name="roomName"
                        autoFocus
                        onChange={e => setRoomName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="roomDescription"
                        label="Room Description"
                        name="roomDescription"
                        autoFocus
                        onChange={e => setRoomDescription(e.target.value)}
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
                            Create Room
                        </LoadingButton> :

                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        {...(roomName && roomDescription ? {} : {disabled: true})}
                        >
                            Create Room
                        </Button>
                    }
                </Box>
            </Box>
        </Container>
    )
}

export default CreateRoom