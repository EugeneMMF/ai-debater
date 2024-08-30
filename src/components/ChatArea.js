import { Box, VStack } from "@chakra-ui/react";
import { useChatContext } from "../context/chatContext";
import ChatItem from './ChatItem';
import { useEffect, useRef, useState } from "react";

const ChatArea = () => {
    const { chats, setChats, lastIndex } = useChatContext();
    let [height, setHeight] = useState(window.innerHeight*0.7);
    const myRef = useRef(null);

    const manageResize = (e) => {
        setHeight(window.innerHeight*0.7);
    }

    useEffect(() => {
        window.addEventListener("resize", manageResize);
        return () => window.removeEventListener("resize", manageResize);
    }, [])

    const deleteItem = (index) => {
        let items = [...chats];
        items = items.filter((value, ind) => index!==ind )
        setChats(items)
    }

    useEffect(() => {
        console.log(myRef);
        myRef.current?.scrollIntoView({bahavior: "smooth"});
    }, [chats])

    return (
        <VStack className="chatArea" style={{height: height, width: "100%"}}>
            {chats.map((chat, ind) => {
                // console.log("item", chat);
                if (ind == (chats.length-1)) {
                    return <ChatItem ref={myRef} chat={chat} key={ind} cancellable={ind>lastIndex} deleteFromChat={() => deleteItem(ind)} w="100%"/>
                } else {
                    return <ChatItem chat={chat} key={ind} cancellable={ind>lastIndex} deleteFromChat={() => deleteItem(ind)} w="100%"/>
                }
            })}
        </VStack>
    );
}

export default ChatArea;