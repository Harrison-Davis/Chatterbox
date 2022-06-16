import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Flex, Spacer  } from '@chakra-ui/react';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from './miscellaneous/SideDrawer';
import MyChats from './miscellaneous/MyChats';
import Chatbox from './miscellaneous/Chatbox';

const Chatpage = () => {

    const { user} = ChatState();

    const [ fetchAgain, setFetchAgain] = useState();
    



    return (
        <div style={{width: "100%"}}>
            {user && <SideDrawer/>}
            <Box
            display="flex"
            justifyContent="space-between"
            w="100%"
            h="91.5vh"
            p="10px"
            >
                {user && <MyChats fetchAgain={fetchAgain} />}
                {user && (<Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>)}
                
            </Box>
        </div>
    )
}

export default Chatpage;