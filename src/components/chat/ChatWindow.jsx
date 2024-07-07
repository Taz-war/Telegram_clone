import React, { useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Container, Avatar, InputAdornment } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';

const messages = [
    { sender: 'John Doe', text: 'Hello!', time: '10:45 AM' },
    { sender: 'You', text: 'Hi, how are you?', time: '10:46 AM' },
    // Add more message data here
];

const ChatWindow = ({ chat }) => {
    const [textMessage, setTextMessage] = useState('')
    return (
        <Box sx={{ backgroundColor: 'transparent', height: '100%', color: 'white', backgroundImage: "url('https://web.telegram.org/a/chat-bg-pattern-light.ee148af944f6580293ae.png')" }}>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #333', backgroundColor: '#2a2a2a' }}>
                <Avatar src={chat.avatar} sx={{ marginRight: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{chat.name}</Typography>
                    <Typography variant="body2" color="gray">last seen yesterday at 04:51 PM</Typography>
                </Box>
                <IconButton color="inherit">
                    <SearchIcon />
                </IconButton>
                <IconButton color="inherit">
                    <CallIcon />
                </IconButton>
                <IconButton color="inherit">
                    <MoreVertIcon />
                </IconButton>
            </Box>
            <Container sx={{ width: '60%', height: '90%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ flex: 1, overflowY: 'auto', padding: 2 }}>
                    {chat.messages.map((message, index) => (
                        <Box
                            key={index}
                            sx={{
                                marginBottom: 2,
                                display: 'flex',
                                justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start'
                            }}
                        >
                            <Box sx={{
                                bgcolor: message.sender === 'You' ? '#766AC8' : '#0F0F0F',
                                borderRadius: message.sender === 'You' ? '50px 20px 0px 50px' : "20px 50px 50px 0px",
                                maxWidth: '50%',
                                alignSelf: message.sender === 'You' ? 'flex-end' : 'flex-start',
                                px: 1,
                                py: 0.5
                            }}>
                                <Typography variant="body1" display={'inline-block'} >{message.text}</Typography>
                                <Typography variant="caption" display={'inline-block'} sx={{ color: message.sender === 'You', '#B9B3E3': '#4A4C4F', ml: 1 }}>{message.time}</Typography>
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', padding: 2, borderTop: '1px solid #333' }}>
                    <TextField
                        fullWidth
                        placeholder="message..."
                        variant="filled"
                        inputProps={{
                            disableUnderline: true, startAdornment: (
                                <InputAdornment position="start">
                                    <SentimentSatisfiedOutlinedIcon />
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            backgroundColor: '#2A2A2A', borderRadius: '10px 10px 0px 10px', input: { color: 'white' },
                            '& .MuiFilledInput-root': {
                                backgroundColor: '#2A2A2A',
                                borderRadius: '20px 20px 0px 20px',
                                border: 'none',
                                '&:hover': {
                                    backgroundColor: '#2A2A2A',
                                    '&:before': {
                                        borderBottom: 'none', // change the underline color when hovered
                                    },
                                },
                                '&.Mui-focused': {
                                    backgroundColor: '#2A2A2A',
                                    '&:before': {
                                        borderBottom: 'none', // change the underline color when focused
                                    },
                                },
                                '&:before': {
                                    borderBottom: 'none', // default underline color
                                },
                                '&:after': {
                                    borderBottom: 'none', // underline color when focused
                                },
                            },
                            '& .MuiFilledInput-input': {
                                padding: '10px 12px',
                                lineHeight: '1.5', // Adjust this value to vertically center the text
                                color: 'white'
                            }
                        }}
                        onChange={(e) => setTextMessage(e.target.value)}
                    />
                    <Button variant="contained" sx={{ marginLeft: 1, width: '50px', height: '50px', borderRadius: '50%', bgcolor: "#2A2A2A", '&:hover': { bgcolor: '#8774E1' } }}>
                        {
                            textMessage === '' ? <MicIcon /> : <SendIcon sx={{ color: '#8774E1' }} />
                        }
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ChatWindow;
