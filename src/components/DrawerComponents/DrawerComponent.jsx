import { Avatar, Box, Divider, Typography, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import ContactsIcon from '@mui/icons-material/Contacts';
import CallIcon from '@mui/icons-material/Call';
import PeopleIcon from '@mui/icons-material/People';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HelpIcon from '@mui/icons-material/Help';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react';
import { useThemeContext } from '../../context/ThemeProviderComponent '; 

const DrawerComponent = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <Box sx={{ bgcolor: "background.paper", height: "100%", width: 320, color: 'text.primary', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, bgcolor: 'background.default' }}>
                <Avatar src="/path/to/avatar.jpg" sx={{ width: 60, height: 60, mb: 2 }} />
                <Typography variant="h6">Fahim Tazwer</Typography>
                <Typography variant="body2">+880 1836774231</Typography>
                <IconButton onClick={toggleTheme} sx={{ mt: 2 }}>
                    {theme === 'dark' ? <Brightness7Icon sx={{ color: 'white' }} /> : <Brightness4Icon />}
                </IconButton>
            </Box>
            <Divider />
            <List>
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <PersonIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                </ListItem>
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <GroupIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="New Group" />
                </ListItem>
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <ContactsIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="Contacts" />
                </ListItem>
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <CallIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="Calls" />
                </ListItem>
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <PeopleIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="People Nearby" />
                </ListItem>
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <BookmarkIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="Saved Messages" />
                </ListItem>
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <SettingsIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="Settings" />
                </ListItem>
                <Divider />
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <PersonAddIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="Invite Friends" />
                </ListItem>
                <ListItem sx={{ "&:hover": { bgcolor: 'background.default' } }} button>
                    <ListItemIcon>
                        <HelpIcon sx={{ color: 'text.primary' }} />
                    </ListItemIcon>
                    <ListItemText primary="Telegram Features" />
                </ListItem>
            </List>
        </Box>
    );
};

export default DrawerComponent;
