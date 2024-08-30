import { HStack, VStack } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import BotLogo from "../images/logo192.png"
import UserLogo from "../images/smily.png"
import { MdClear } from "react-icons/md";
import { forwardRef } from "react";

const ChatItem = forwardRef((props, ref) => {
    if (props.chat.role === "model") {
        return <div className="chatItem" ref={ref}>
                    <div className="chatSpan bot">
                            <img src={BotLogo} width="30px"/>
                            <div dangerouslySetInnerHTML={{__html: props.chat.content}}></div>
                    </div>
                </div>
    }
    return <VStack className="chatItem">
                {
                    props.chat.type=="file" ?
                    <div className="chatSpan user" ref={ref}>
                        <img src={UserLogo} width="30px" />
                        {
                            props.cancellable ?
                            <p style={{backgroundColor: "grey", border: "purple 3px solid"}} >{props.chat.content}
                            <MdClear onClick={() => {
                                props.chat.delete();
                                props.deleteFromChat();
                            }} /></p> :
                            <p style={{backgroundColor: "grey", border: "purple 3px solid"}} >{props.chat.content}</p>
                        }
                    </div> :
                    <div className="chatSpan user" ref={ref}>
                        <img src={UserLogo} width="30px" />
                        <div dangerouslySetInnerHTML={{__html: props.chat.content}}></div>
                    </div>
                }
            </VStack>
})

export default ChatItem;