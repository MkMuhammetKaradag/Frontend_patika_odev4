import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { v4 as uuidv4 } from "uuid";

export interface messageType {
  text: string;
  owner: string;
}

const App = () => {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<messageType[]>([]);
  const [owner, _] = useState(uuidv4().slice(0, 10).toString());

  const send = (value: string) => {
    socket?.emit("message", { message: value, owner: owner });
  };

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_APP_API as string);
    setSocket(newSocket);
  }, [setSocket]);

  const messageListener = ({
    message,
    owner,
  }: {
    message: string;
    owner: string;
  }) => {
    setMessages([
      ...messages,
      {
        text: message,
        owner,
      },
    ]);
  };
  useEffect(() => {
    socket?.on("message", messageListener);
    return () => {
      socket?.off("message", messageListener);
    };
  }, [messageListener]);

  return (
    <div className=" flex  flex-col items-center">
      <h1 className="text-3xl font-bold underline">Hello CHAT!</h1>
      <div className="flex-grow  container border-2 overflow-auto p-4">
        <Messages messages={messages} owner={owner}></Messages>
        <MessageInput send={send}></MessageInput>
      </div>
    </div>
  );
};

export default App;
