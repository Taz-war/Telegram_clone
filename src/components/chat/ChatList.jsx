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
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TabComponent from "./TabComponent";
import { fetchData } from "../../libs/getData";

const ChatList = ({ chats, setSelectedChatId, selectedChatId }) => {
  const [focus, setFocus] = useState(false);
  const [page, setPage] = useState(1);
  const [newChats, setNewChats] = useState([]);
  const [openDrawer,setOpenDrawer] = useState(false)

  useEffect(() => {
    
    const getChats = async () => {
      const chatData = await fetchData(page);
      console.log(chatData)
      if (chatData) {
        setNewChats([...newChats,...chatData]);
      }
    };

    getChats();
  }, [page]);

  console.log({newChats})

  return (
    <Box
      sx={{
        backgroundColor: "#2a2a2a",
        height: "100%",
        color: "white",
        display: "flex",
        flexDirection: "column",
        overflowY:'auto',
        "&::-webkit-scrollbar": {
            width: "5px",
            
          },
        '&::-webkit-scrollbar-thumb': {
            background: "#A3A3A3", 
            borderRadius: "10px"
          }
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
              sx={{ color: "#AAAAAA", fontWeight: "20px" }}
              onClick={() => setFocus(!focus)}
            />
          ) : (
            <MenuOutlinedIcon sx={{ color: "#AAAAAA", fontWeight: "20px" }} onClick={()=>setOpenDrawer(!openDrawer)}/>
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
                <SearchIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            margin: 2,
            backgroundColor: "#1e1e1e",
            borderRadius: 10,
            outline: "none",
            width: "90%",
            "& .MuiFilledInput-root": {
              backgroundColor: "#1e1e1e",
              borderRadius: 10,
              border: "none",
              "&:hover": {
                backgroundColor: "#1e1e1e",
                "&:before": {
                  borderBottom: "none", // change the underline color when hovered
                },
              },
              "&.Mui-focused": {
                backgroundColor: "#1e1e1e",
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
              color: "white",
            },
            input: { color: "white" },
          }}
          onFocus={() => setFocus(true)}
          // onBlur={() => setFocus(false)}
        />
      </Box>
      {focus ? (
        <TabComponent />
      ) : (
        <Box p={1}>
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
                  bgcolor: selectedChatId === chat.id ? "#766AC8" : "#2a2a2a",
                  borderRadius: 3,
                  "&:hover":{bgcolor: selectedChatId === chat.id ? "#766AC8" : "#2a2a2a"}
                }}
              >
                <ListItemAvatar>
                  <Avatar src={chat.avatar} />
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography style={{ color: "white" }}>{chat.creator.name}</Typography>}
                  secondary={<Typography variant="body2" color="gray">{chat.status}</Typography>}
                />
              </ListItem>
            ))}
          </List>

          <Button size="small" sx={{bgcolor:"#766AC8",color:'white',display:'block',m:"auto"}} onClick={() => setPage(prevPage => prevPage + 1)}>Load More</Button>
        </Box>
      )}
      <Drawer open={openDrawer} onClose={()=>setOpenDrawer(!openDrawer)} >
        <Box sx={{bgcolor:"#2a2a2a",height:'100%'}}>hello</Box>
      </Drawer>
    </Box>
  );
};

export default ChatList;
