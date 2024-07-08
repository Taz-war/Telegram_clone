import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';

// TabPanel component to display content of each tab
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

// Function to generate props for each tab
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabComponent = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const chats = [
        { id: 1, name: 'Fahim', avatar: '', initials: 'FI' },
        { id: 2, name: 'Sakib', avatar: '/path/to/avatar2.jpg', initials: '' },
        { id: 3, name: 'Rakib', avatar: '', initials: 'RI' },
    ];

    return (
        <Box sx={{ width: '100%', bgcolor: '#2a2a2a', color: 'white' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { backgroundColor: '#766AC8' } }}
                sx={{
                    '& .MuiTab-root': {
                        color: 'white',
                    },
                    '& .Mui-selected': {
                        color: '#766AC8 !important',
                    },
                    fontFamily:'sans-serif'
                }}
            >
                <Tab label="Chats" {...a11yProps(0)} sx={{ color: 'white','&:hover': {
                        bgcolor: '#494848',
                        opacity: 1,
                        borderRadius:'15px 15px 0px 0px'
                      } }} />
                <Tab label="Media" {...a11yProps(1)} sx={{ color: 'white','&:hover': {
                        bgcolor: '#494848',
                        opacity: 1,
                        borderRadius:'15px 15px 0px 0px'
                      } }} />
                <Tab label="Links" {...a11yProps(2)} sx={{ color: 'white','&:hover': {
                        bgcolor: '#494848',
                        opacity: 1,
                        borderRadius:'15px 15px 0px 0px'
                      } }} />
                <Tab label="Files" {...a11yProps(3)} sx={{ color: 'white','&:hover': {
                        bgcolor: '#494848',
                        opacity: 1,
                        borderRadius:'15px 15px 0px 0px'
                      } }} />
                <Tab label="Music" {...a11yProps(4)} sx={{ color: 'white','&:hover': {
                        bgcolor: '#494848',
                        opacity: 1,
                        borderRadius:'15px 15px 0px 0px'
                      } }} />
                <Tab label="Voice" {...a11yProps(5)} sx={{ color: 'white','&:hover': {
                        bgcolor: '#494848',
                        opacity: 1,
                        borderRadius:'15px 15px 0px 0px'
                      } }} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <List sx={{ display: 'flex', justifyContent: 'center', bgcolor: '#1e1e1e', borderRadius: 1, p: 1 }}>
                    {chats.map((chat) => (
                        <ListItem key={chat.id} sx={{ flexDirection: 'column', width: 'auto', textAlign: 'center', m: 1 }}>
                            <Avatar src={chat.avatar} sx={{ width: 56, height: 56, bgcolor: chat.avatar ? 'transparent' : '#ff5722' }}>
                                {chat.initials}
                            </Avatar>
                            <ListItemText primary={chat.name} sx={{ color: 'white' }} />
                        </ListItem>
                    ))}
                </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Media content here
            </TabPanel>
            <TabPanel value={value} index={2}>
                Links content here
            </TabPanel>
            <TabPanel value={value} index={3}>
                Files content here
            </TabPanel>
            <TabPanel value={value} index={4}>
                Music content here
            </TabPanel>
            <TabPanel value={value} index={5}>
                Voice content here
            </TabPanel>
        </Box>
    );
};

export default TabComponent;
