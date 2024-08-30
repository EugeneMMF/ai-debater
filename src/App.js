import { ChakraProvider, UnorderedList } from "@chakra-ui/react";
import { AlertProvider } from "./context/alertContext";
import Alert from "./components/Alert";
import Chat from "./components/Chat";

function App() {
  return (
    <ChakraProvider>
      <AlertProvider>
        <main>
          <Chat />
          <Alert />
        </main>
      </AlertProvider>
    </ChakraProvider>
  );
}

export default App;
