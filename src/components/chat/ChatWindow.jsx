import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, IconButton, Container, Avatar, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import SearchIcon from '@mui/icons-material/Search';
import CallIcon from '@mui/icons-material/Call';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { fetchChatMessages } from '../../libs/getData';

const ChatWindow = ({ chatId, setSelectedChatId }) => {
    const [textMessage, setTextMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [mySelf, setMySelf] = useState();
    const isMobile = useMediaQuery('(max-width:600px)');
    const theme = useTheme();

    useEffect(() => {
        const getMessages = async () => {
            const messageData = await fetchChatMessages(chatId);
            if (messageData) {
                setMessages(messageData);
                const sampleData = messageData.find((message) => message.sender_id === 1);
                setMySelf(sampleData);
            }
        };

        getMessages();
    }, [chatId]);

    // Group messages by date
    const groupedMessages = messages.reduce((acc, message) => {
        const date = new Date(message.created_at).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(message);
        return acc;
    }, {});

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : theme.palette.background.paper,
                height: '100%',
                color: theme.palette.text.primary,
                width: '100%',
                backgroundImage: "url('https://web.telegram.org/a/chat-bg-pattern-light.ee148af944f6580293ae.png')"
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, borderBottom: '1px solid #333', backgroundColor: theme.palette.background.default }}>
                {isMobile && (
                    <IconButton onClick={() => setSelectedChatId(null)}>
                        <ArrowBackOutlinedIcon sx={{ color: theme.palette.text.primary }} />
                    </IconButton>
                )}
                <Avatar src={mySelf?.sender?.name} sx={{ marginRight: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{mySelf?.sender?.name}</Typography>
                    <Typography variant="body2" color="gray">last seen yesterday at {new Date(mySelf?.updated_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                    })}</Typography>
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
            <Container sx={{ width: { lg: '60%', md: '90%', sm: '100%' }, height: '90%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{
                    flex: 1, overflowY: 'auto', padding: 2, "&::-webkit-scrollbar": {
                        width: "5px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        background: "#A3A3A3",
                        borderRadius: "10px",
                    },
                }}>
                    {Object.keys(groupedMessages).map(date => (
                        <Box key={date} sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ color: theme.palette.text.secondary, textAlign: 'center', mb: 1, bgcolor: theme.palette.background.default }}>
                                {date}
                            </Typography>
                            {groupedMessages[date].map((message, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        marginBottom: 2,
                                        display: 'flex',
                                        justifyContent: message.sender_id === 1 ? 'flex-end' : 'flex-start'
                                    }}
                                >
                                    <Box sx={{
                                        bgcolor: message.sender_id === 1 ? '#766AC8' : '#0F0F0F',
                                        borderRadius: message.sender_id === 1 ? '50px 20px 0px 50px' : "20px 50px 50px 0px",
                                        maxWidth: '60%',
                                        alignSelf: message.sender_id === 1 ? 'flex-end' : 'flex-start',
                                        px: 1,
                                        py: 0.7,
                                        pl: 4,
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word'
                                    }}>
                                        <Typography variant="body1" display={'inline-block'}>{message.message}</Typography>
                                        <Typography variant="caption" display={'inline-block'} sx={{ color: message.sender_id === 1 ? '#B9B3E3' : '#4A4C4F', ml: 1 }}>
                                            {new Date(message.created_at).toLocaleTimeString('en-US', {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true
                                            })}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
                <Box sx={{ display: 'flex', padding: 2, borderTop: '1px solid #333' }}>
                    <TextField
                        fullWidth
                        placeholder="message..."
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SentimentSatisfiedOutlinedIcon sx={{ color: 'white', mb: 1.5 }} />
                                </InputAdornment>
                            ),
                            disableUnderline: true
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
                            textMessage === '' ? <MicIcon sx={{ color: 'white' }} /> : <SendIcon sx={{ color: '#8774E1', "&:hover": { color: 'white' } }} />
                        }
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};

export default ChatWindow;
