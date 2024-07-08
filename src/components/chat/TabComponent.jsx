import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Avatar, List, ListItem, ListItemText } from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

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

const TabComponent = ({ tabsData }) => {
    const [value, setValue] = useState(0);
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', bgcolor: theme.palette.background.default, color: theme.palette.text.primary }}>
            <Tabs
        
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                TabIndicatorProps={{ style: { backgroundColor: '#766AC8' } }}
                sx={{
                    '& .MuiTab-root': {
                        color: theme.palette.text.primary,
                    },
                    '& .Mui-selected': {
                        color: '#766AC8 !important',
                    },
                    fontFamily: 'sans-serif'
                }}
            >
                {tabsData.map((tab, index) => (
                    <Tab
                    
                        key={index}
                        label={tab.label}
                        {...a11yProps(index)}
                        sx={{
                            color: theme.palette.text.primary,
                            '&:hover': {
                                bgcolor: '#494848',
                                opacity: 1,
                                borderRadius: '15px 15px 0px 0px'
                            }
                        }}
                    />
                ))}
            </Tabs>
            {tabsData.map((tab, index) => (
                <TabPanel key={index} value={value} index={index}>
                    {tab.content}
                </TabPanel>
            ))}
        </Box>
    );
};

TabComponent.propTypes = {
    tabsData: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            content: PropTypes.node.isRequired,
        })
    ).isRequired,
};

export default TabComponent;
