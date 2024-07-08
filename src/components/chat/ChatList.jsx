import React, { useEffect, useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Drawer,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SearchIcon from "@mui/icons-material/Search";
import TabComponent from "./TabComponent";
import { fetchData } from "../../libs/getData";
import DrawerComponent from "../DrawerComponents/DrawerComponent";
import { useThemeContext } from "../../context/ThemeProviderComponent "; 

const tabsData = [
  {
    label: 'Chats',
    content: 'Chats content here'
  },
  { label: 'Media', content: 'Media content here' },
  { label: 'Links', content: 'Links content here' },
  { label: 'Files', content: 'Files content here' },
  { label: 'Music', content: 'Music content here' },
  { label: 'Voice', content: 'Voice content here' }
];

const ChatList = ({ chats, setSelectedChatId, selectedChatId }) => {
  const [focus, setFocus] = useState(false);
  const [page, setPage] = useState(1);
  const [newChats, setNewChats] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  // const { theme, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const getChats = async () => {
      const chatData = await fetchData(page);
      console.log(chatData);
      if (chatData) {
        setNewChats([...newChats, ...chatData]);
      }
    };

    getChats();
  }, [page]);

  console.log({ newChats });

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100%",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        width: '100%'
      }}
    >
      <Box display={"flex"} alignItems="center">
        <IconButton
          sx={{
            ml: 1,
            transition: "transform 0.3s",
            transform: focus ? "rotate(360deg)" : "rotate(0deg)",
          }}
        >
          {focus ? (
            <ArrowBackOutlinedIcon
              sx={{ color: "text.primary", fontWeight: "20px" }}
              onClick={() => setFocus(!focus)}
            />
          ) : (
            <MenuOutlinedIcon
              sx={{ color: "text.primary", fontWeight: "20px" }}
              onClick={() => setOpenDrawer(!openDrawer)}
            />
          )}
        </IconButton>
        <TextField
          variant="filled"
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ justifyContent: "center", mb: 2 }}
              >
                <SearchIcon sx={{ color: "text.primary" }} />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            margin: 2,
            backgroundColor: "background.paper", // Set the background for TextField
            borderRadius: 10,
            outline: "none",
            width: "90%",
            position: 'sticky',
            top: 0,
            "& .MuiFilledInput-root": {
              backgroundColor: "background.paper", // Set the background for TextField
              borderRadius: 10,
              border: "none",
              "&:hover": {
                backgroundColor: "background.paper",
                "&:before": {
                  borderBottom: "none", // change the underline color when hovered
                },
              },
              "&.Mui-focused": {
                backgroundColor: "background.paper",
                "&:before": {
                  borderBottom: "none", // change the underline color when focused
                },
              },
              "&:before": {
                borderBottom: "none", // default underline color
              },
              "&:after": {
                borderBottom: "none", // underline color when focused
              },
            },
            "& .MuiFilledInput-input": {
              padding: "10px 12px",
              lineHeight: "1.5", // Adjust this value to vertically center the text
              color: "text.primary",
            },
            input: { color: "text.primary" },
          }}
          onFocus={() => setFocus(true)}
        />
        
      </Box>
      {focus ? (
        <TabComponent tabsData={tabsData} />
      ) : (
        <Box p={1} sx={{
          flex: 1,
          position: "relative",
          overflowY: "auto",
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#A3A3A3",
            borderRadius: "10px",
          },
        }}>
          <List sx={{ flex: 1, overflowY: "auto" }}>
            {newChats.map((chat) => (
              <ListItem
                button
                component={Link}
                to={`/chat/${chat.id}`}
                key={chat.id}
                onClick={() => setSelectedChatId(chat.id)}
                sx={{
                  p: 1,
                  bgcolor: selectedChatId === chat.id ? "#766AC8" : "background.default",
                  borderRadius: 3,
                  "&:hover": {
                    bgcolor: theme.palette.background.paper, // Set the hover color
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar src={chat.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography style={{ color: "text.primary" }}>
                      {chat.creator.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {chat.status}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>

          <Button
            size="small"
            sx={{ bgcolor: "#766AC8", color: "white", display: "block", m: "auto" }}
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            Load More
          </Button>

          <IconButton
            size="large"
            sx={{
              position: 'sticky',
              top: 500,
              bottom: 10,
              left: 410,
              mt: 10,
              bgcolor: "#766AC8",
              color: "white",
              "&:hover": {
                bgcolor: "#6d60c7",
              },
            }}
          >
            <EditRoundedIcon />
          </IconButton>
        </Box>
      )}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(!openDrawer)}>
        <DrawerComponent />
      </Drawer>
    </Box>
  );
};

export default ChatList;
