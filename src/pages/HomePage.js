import React, { useState, useEffect } from 'react'
import useAuth from '@context/auth/useAuth'
import { apiUrls } from '@services/ApiUrls'
import { get } from '@services/Request'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { RoomContainer } from '@components';
import { Link } from 'react-router-dom'

let HomePage = () => {

  const { authTokens, logoutUser } = useAuth()
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [roomContainer, setRoomContainer] = useState(
    <Typography
      variant="h4"
      component="div"
      sx={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Select a room to start chatting!
    </Typography>
  )

  const chatRoomContainer = (room, rooms) => {
    let messagesObject = {}
    rooms.forEach((room, index) => {
      messagesObject[room.slug] = []
    })
    setRoomContainer(
      <RoomContainer room={room} messagesObject={messagesObject} />
    )
    setSelectedRoom(room)
  }  

  useEffect(() => {

    const getRooms = async () => {
      const response = await get(apiUrls.getRooms, authTokens, logoutUser)
      
      if (response) {
        setRooms(response)
        setLoading(false)
      }
    }

    getRooms()

  }, [authTokens, logoutUser])

  return (
    <Container component="main">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '100%',
          bgcolor: 'background.paper',
          marginTop: '50px',
        }}
      >
        <Box
          sx = {{
            width: '30%',
            bgcolor: 'background.paper',
            paddingRight: '15px',
            height: 'inherit',
            borderRight: '1px solid #e0e0e0',
          }}
        > 
          <List>
            {
              !loading ?

              rooms.map((item, index) => (
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{
                      borderBottom: '1px solid #e0e0e0',
                      '&:hover': {
                        // nice blue color
                        backgroundColor: '#e3f2fd',
                        cursor: 'pointer'
                      }
                    }}
                    {...(selectedRoom && selectedRoom.slug === item.slug ?
                      {
                        sx: {
                          backgroundColor: '#e3f2fd',
                        }
                      } : {})
                    }
                  >
                    <ListItemButton
                      onClick={() => chatRoomContainer(item, rooms)}
                    >
                        <ListItemText
                          primary={item.name}
                        />
                    </ListItemButton>
                  </ListItem>
              )) :

              <ListItem
                key={1}
                disablePadding
                sx={{
                  borderBottom: '1px solid #e0e0e0',
                  backgroundColor: '#fafafa'
                }}
              >
                  <ListItemButton>
                      <ListItemText
                        primary="Loading..."
                      />
                  </ListItemButton>
              </ListItem>
            }
            {/* create new room button */}
            <ListItem
              key={2}
              disablePadding
              sx={{
                borderBottom: '1px solid #e0e0e0',
                backgroundColor: '#e8f5e9',
              }}
            >
                <ListItemButton
                  component={Link}
                  to="/create-room"
                >
                    <ListItemText
                      primary="Or create your own room!"
                    />
                </ListItemButton>
            </ListItem>

          </List>
        </Box>  
        <Box
          sx={{
            width: '80%'
          }}
        >
          {roomContainer}
        </Box>
      </Box>
        
    </Container>
  )
}

export default HomePage