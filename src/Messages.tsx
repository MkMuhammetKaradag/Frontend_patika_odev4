import { messageType } from "./App";

interface MessagesProps {
  messages: messageType[];
  owner: string;
}

const Messages: React.FC<MessagesProps> = ({ messages, owner }) => {
  return (
    // <div>
    //   {messages.map((item, index) => (
    //     <div key={index}>{item}</div>
    //   ))}
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex mt-2    ${
            message.owner === owner ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-xs  text-white p-2 rounded-lg  ${
              message.owner === owner
                ? "rounded-tr-none bg-blue-500"
                : "rounded-tl-none bg-green-500"
            }`}
          >
            <p>{message.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Messages;
