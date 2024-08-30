import { createContext, useState, useContext, useEffect } from "react";
import { useAlertContext } from "./alertContext";

const ChatContext = createContext(undefined);

export const ChatsProvider = ({children}) => {

    const [chats, setChats] = useState([]);
    const [currentRole, setCurrentRole] = useState("user")
    const [roles, setRoles] = useState({})
    const [submit, setSubmit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [change, setChange] = useState(false);
    const [lastIndex, setLastIndex] = useState(chats.length-1);
    const { onOpen } = useAlertContext();

    function switchRoleOfMessages() {
        return chats.map((chat) => {
            if (currentRole == "model"){
                return {
                    "parts": chat.unaltered,
                    "role": chat.role == "user" ? "model" : "user"
                }
            } else {
                return {
                    "parts": chat.unaltered,
                    "role": chat.role
                }
            }
        })
    }

    async function invokeResponse() {
        const url = "http://192.168.1.88:5000/chat";
        const formData = new FormData();
        const switched = switchRoleOfMessages();
        return fetch(
            url,
            {
                method: "POST",
                body: JSON.stringify({
                    "role": roles[currentRole],
                    "history": switched.filter((chat, index) => index != chats.length - 1),
                    "prompt": switched[switched.length - 1].parts
                })
            }
        )
        .then(response => response.text()
        .then(text => JSON.parse(text))
        .then(text => setChats(
            [...chats, {
                role: currentRole == "user" ? "model" : "user",
                content: text.content,
                unaltered: text.unaltered
            }]
        )).then(() => {
            setIsLoading(false);
            setCurrentRole(currentRole == "user" ? "model" : "user");
        }));
    }

    useEffect(() => {
        if (!submit) return;
        setSubmit(false);
        if (!change) {
            console.log("there")
            onOpen("error", "You must either enter a prompt or upload a file by dragging it into the prompt section.")
            return;
        }
        // setChange(false);
        setIsLoading(true);
        invokeResponse();
        // wait(2000);
    }, [submit])

    return (
        <ChatContext.Provider value={{
            chats,
            appendToChat: (chat) => {
                setChange(true);
                setChats([...chats, chat]);
            },
            submit: () => setSubmit(true),
            change,
            updateLastIndex: () => setLastIndex(chats.length),
            lastIndex,
            setChats,
            isLoading,
            currentRole,
            setRoles
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => useContext(ChatContext);