import FullScreenSection from "./FullScreenSection";
import ChatArea from "./ChatArea";
import ChatBottom from "./ChatBottom";
import { ChatsProvider } from "../context/chatContext";
import { Heading, VStack } from "@chakra-ui/react";

const Chat = () => {
    return (
        <ChatsProvider>
        <FullScreenSection
        isDarkBackground
        // backgroundColor="#202020"
        w="100%"
        h="100%"
        >
            <VStack w="100%" marginTop="50px" paddingTop="20px" paddingBottom="20px">
                <Heading as="h1">Debate</Heading>
                <ChatArea />
                <ChatBottom />
            </VStack>
        </FullScreenSection>
        </ChatsProvider>
    )
}

export default Chat;