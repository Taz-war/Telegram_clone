import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, useMediaQuery } from '@mui/material';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const chats = [
    { id: 1, name: 'John Doe', message: 'Hey there!', avatar: '/path/to/avatar1.jpg', messages: [{ sender: 'John Doe', text: 'Hello!', time: '10:45 AM' }, { sender: 'You', text: 'Hi, how are you?', time: '10:46 AM' }] },
    { id: 2, name: 'Jane Smith', message: 'How are you?', avatar: '/path/to/avatar2.jpg', messages: [{ sender: 'Jane Smith', text: 'Hi!', time: '10:50 AM' }, { sender: 'You', text: 'I am good, thanks!', time: '10:51 AM' }] },
    // Add more chat data here
];

const Home = () => {
    const { id } = useParams();
    const [selectedChatId, setSelectedChatId] = useState(null);
    const selectedChat = chats.find(chat => chat.id === selectedChatId);
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', backgroundImage: "url('https://web.telegram.org/a/chat-bg-pattern-light.ee148af944f6580293ae.png')" }}>
            {isMobile ? (
                selectedChatId ? (
                    <ChatWindow chatId={id} chat={selectedChat} />
                ) : (
                    <ChatList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId} />
                )
            ) : (
                <Grid container sx={{ flex: 1 }} columns={12}>
                    <Grid item xl={3} lg={4} md={4} sm={6} xs={12} sx={{ height: '100%' }}>
                        <ChatList chats={chats} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId} />
                    </Grid>
                    <Grid item xl={9} lg={8} md={8} sm={6} xs={12} sx={{ height: '100%' }}>
                        {selectedChat ? (
                            <ChatWindow chatId={id} chat={selectedChat} />
                        ) : (
                            <Box sx={{ backgroundImage: "url('https://web.telegram.org/a/chat-bg-pattern-light.ee148af944f6580293ae.png')", height: '100vh' }}></Box>
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Home;
