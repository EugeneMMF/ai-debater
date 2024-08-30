import { useFormik } from "formik";
import * as Yup from 'yup';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Textarea,
    VStack,
    Heading,
    Text,
    HStack
} from "@chakra-ui/react";
import { useChatContext } from "../context/chatContext";
import { useState } from "react";

const ChatBottom = () => {
    const {isLoading, appendToChat, submit, change, updateLastIndex, currentRole, setRoles } = useChatContext();
    const [files, setFiles] = useState([]);
    const formik = useFormik({
        initialValues: {
            userPrompt: "Should governments subsidize fuel? I think they are good for the nation.",
            role1: "You are a huge advocate for fuel subsidies by the government. Push your ideas forward.",
            role2: "You are highly against the subsidizing of fuel costs by governments. Push your ideas forward."
        },
        onSubmit: (values) => {
            if (!change) {
                if (values.userPrompt !== "") {
                    appendToChat({
                        "role": currentRole,
                        "content": values.userPrompt,
                        "unaltered": values.userPrompt
                    })
                }
                if (values.role1 !== "" && values.role2 !== "") {
                    setRoles({
                        "model": values.role1,
                        "user": values.role2
                    })
                }
            }
            updateLastIndex();
            submit();
            setFiles([]);
            // formik.resetForm();
        },
    })
    
    return (
        <VStack w="full">
            <Box w="100%">
            <form onSubmit={(e) => {e.preventDefault();formik.handleSubmit(e)}}>
            <HStack>
                <FormControl isInvalid={!(change || formik.values.userPrompt != "")}>
                    <FormLabel as="legend" htmlFor="userPrompt">Debate Topic *</FormLabel>
                    <Textarea
                        id="userPrompt"
                        name="userPrompt"
                        height="100%"
                        width="100%"
                        {...formik.getFieldProps("userPrompt")}
                        placeholder="Type the debate topic here in a manner congruent with debater 1..."
                        backgroundColor="#18181b"
                        disabled={change}
                    />
                </FormControl>
                <FormControl isInvalid={!(change || formik.values.role1 != "")}>
                    <FormLabel as="legend" htmlFor="role1">Role 1 *</FormLabel>
                    <Textarea
                        id="role1"
                        name="role1"
                        height="100%"
                        width="100%"
                        {...formik.getFieldProps("role1")}
                        placeholder="Type role for debater 1 here..."
                        backgroundColor="#18181b"
                        disabled={change}
                    />
                </FormControl>
                <FormControl isInvalid={!(change || formik.values.role2 != "")}>
                    <FormLabel as="legend" htmlFor="role2">Role 2 *</FormLabel>
                    <Textarea
                        id="role2"
                        name="role2"
                        height="100%"
                        width="100%"
                        {...formik.getFieldProps("role2")}
                        placeholder="Type role for debater 2 here..."
                        backgroundColor="#18181b"
                        disabled={change}
                    />
                </FormControl>
                <Button type="submit" colorScheme="purple" className="buttonload" disabled={isLoading || !(change || (formik.values.userPrompt != "" && formik.values.role2 != "" && formik.values.role1 != ""))} width="20%">
                    {isLoading ? <i className="fa fa-spinner fa-spin" />: <Text>{!change ? "Submit": "Step"}</Text>}
                </Button>
            </HStack>
            </form>
            </Box>
        </VStack>
    )
}

export default ChatBottom;