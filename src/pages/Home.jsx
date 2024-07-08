import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import ChatList from '../components/chat/ChatList';
import ChatWindow from '../components/chat/ChatWindow';

const Home = () => {
    const theme = useTheme();
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [changeOrder, setChangeOrder] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', backgroundImage: "url('https://web.telegram.org/a/chat-bg-pattern-light.ee148af944f6580293ae.png')" }}>
            {isMobile ? (
                selectedChatId ? (
                    <ChatWindow chatId={selectedChatId} setSelectedChatId={setSelectedChatId} setChangeOrder={setChangeOrder} changeOrder={changeOrder} />
                ) : (
                    <ChatList changeOrder={changeOrder} setChangeOrder={setChangeOrder} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId} />
                )
            ) : (
                <Grid container sx={{ flex: 1 }} columns={12}>
                    <Grid item xl={3} lg={4} md={4} sm={6} xs={12} sx={{ height: '100%',width:'100%' }} order={selectedChatId && isMobile || changeOrder ? 2 : 1}>
                        <ChatList changeOrder={changeOrder} setChangeOrder={setChangeOrder} setSelectedChatId={setSelectedChatId} selectedChatId={selectedChatId} />
                    </Grid>
                    <Grid item xl={9} lg={8} md={8} sm={6} xs={12} sx={{ height: '100%' }} order={selectedChatId && isMobile || changeOrder ? 1 : 2}>
                        {selectedChatId ? (
                            <ChatWindow chatId={selectedChatId} setSelectedChatId={setSelectedChatId} setChangeOrder={setChangeOrder} changeOrder={changeOrder} />
                        ) : (
                            <Box sx={{ backgroundImage: "url('https://web.telegram.org/a/chat-bg-pattern-light.ee148af944f6580293ae.png')", height: '100vh',bgcolor:theme.palette.background.paper }}></Box>
                        )}
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Home;
