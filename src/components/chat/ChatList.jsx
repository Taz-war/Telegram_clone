import React, { useState } from 'react';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, TextField, IconButton, InputAdornment } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import SearchIcon from '@mui/icons-material/Search';

const ChatList = ({ chats, setSelectedChatId }) => {
    const [focus, setFocus] = useState(false);

    return (
        <Box sx={{ backgroundColor: '#2a2a2a', height: '100%', color: 'white', display: 'flex', flexDirection: 'column' }}>
            <Box display={'flex'} alignItems="center">
                <IconButton sx={{ ml: 1, transition: 'transform 0.3s', transform: focus ? 'rotate(360deg)' : 'rotate(0deg)' }}>
                    {focus ? <ArrowBackOutlinedIcon sx={{ color: 'white', fontWeight: '20px' }} /> : <MenuOutlinedIcon sx={{ color: 'white', fontWeight: '20px' }} />}
                </IconButton>
                <TextField
                    variant="filled"
                    placeholder="Search"
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" sx={{ justifyContent: 'center', mb: 2 }}>
                                <SearchIcon sx={{ color: 'white' }} />
                            </InputAdornment>
                        ),
                        disableUnderline: true,
                    }}
                    sx={{
                        margin: 2,
                        backgroundColor: '#1e1e1e',
                        borderRadius: 10,
                        outline: 'none',
                        width: '90%',
                        '& .MuiFilledInput-root': {
                            backgroundColor: '#1e1e1e',
                            borderRadius: 10,
                            border: 'none',
                            '&:hover': {
                                backgroundColor: '#1e1e1e',
                                '&:before': {
                                    borderBottom: 'none', // change the underline color when hovered
                                },
                            },
                            '&.Mui-focused': {
                                backgroundColor: '#1e1e1e',
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
                            color: 'white',
                        },
                        input: { color: 'white' },
                    }}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                />
            </Box>
            <List sx={{ flex: 1, overflowY: 'auto' }}>
                {chats.map((chat) => (
                    <ListItem button component={Link} to={`/chat/${chat.id}`} key={chat.id} onClick={() => setSelectedChatId(chat.id)}>
                        <ListItemAvatar>
                            <Avatar src={chat.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography style={{ color: 'white' }}>{chat.name}</Typography>}
                            secondary={<Typography variant="body2" color="gray">{chat.message}</Typography>}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default ChatList;
