import React, { useState, useEffect, useRef } from 'react'
import useAuth from '@context/auth/useAuth'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

const RoomContainer = ({ room, messagesObject }) => {

    const { user } = useAuth()
    // open socket connection
    const socketRef = useRef(null);
    const [chatMessages, setChatMessages] = useState(messagesObject);
    const [chatMessage, setChatMessage] = useState('');
    
    const sendMessage = () => {
        if ( chatMessage ) {
            // check if socket is open
            if (socketRef.current.readyState === WebSocket.OPEN) {

              socketRef.current.send(
                  JSON.stringify({
                      message: chatMessage,
                      username: user.username,
                  })
              );
              setChatMessage('');
            
            } else {
              alert('There was an error sending the message, please refresh the page and try again.')
            }
        }
    };

    // listen for messages
    useEffect(() => {

        console.log('useEffect')
        setChatMessage('')

        socketRef.current = new WebSocket(
            process.env.REACT_APP_API_SOCKET + 'room/' + room.slug + '/'
        );

        socketRef.current.onmessage = (e) => {
            const data = JSON.parse(e.data);
            // update chat messages for the room
            setChatMessages((chatMessages) => {
                return {
                    ...chatMessages,
                    [room.slug]: [...chatMessages[room.slug], {username: data.username, text: data.message}]
                }
            });
        };

        // Clean up function to avoid repeating the listener
        return () => {
            socketRef.current.onmessage = null;
        };
    
    }, [room.slug]);

    return (
        <Box>
          <Typography
            component="h6"
            variant="h6"
            align="center"
          >
            {room.name}
          </Typography>
          {
            room.description ?
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Divider
                sx={{
                  width: '50px',
                }}
              />
              <Typography
                component="p"
                variant="p"
                align="center"
                marginTop="5px"
              >
                {room.description}
              </Typography> 
            </Box>: null
          }
          {/* send and receive messages */}
          <Box sx={{ width: '100%' }}>
            <Box
              sx={{
                height: '350px',
                overflowY: 'scroll',
                borderRadius: '10px',
                padding: '15px',
                '&::-webkit-scrollbar': {
                  width: '0.4em',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0,0,0,.1)',
                },
              }}
            >
              {
                chatMessages[room.slug].length > 0 ?
                <List>
                  {chatMessages[room.slug].map((message, index) => (
                    <ListItem key={index}>
                        {
                          message.username === user.username ?
                          <ListItemText
                            primary={message.text}
                            sx={{
                              textAlign: 'right',
                              bgcolor: 'primary.main',
                              color: 'white',
                              borderRadius: '10px',
                              padding: '10px',
                              marginLeft: '40%',
                            }}
                          /> :
                          <ListItemText
                            secondary={message.username}
                            primary={message.text}
                            sx={{
                              textAlign: 'left',
                              bgcolor: 'grey.300',
                              borderRadius: '10px',
                              padding: '10px',
                              marginRight: '40%',
                            }}
                          />
                        }
                    </ListItem>
                  ))}
                </List> :
                <Typography
                  component="h1"
                  variant="h5"
                  align="center"
                  paddingTop="20px"
                >
                  No messages yet :(
                </Typography>
              }
              
            </Box>

            {/* message input */}
            <Box sx={{ mt: 5, width: '100%' }}>
              <TextField
                id="chat_text"
                label="Message"
                variant="outlined"
                type={'text'}
                fullWidth
                value={chatMessage}
                onChange={e => {setChatMessage(e.target.value);}}
                onKeyPress={e => {if (e.key === 'Enter') sendMessage()}}
              />
            </Box>

          </Box>
        </Box>
    )
}

export default RoomContainer