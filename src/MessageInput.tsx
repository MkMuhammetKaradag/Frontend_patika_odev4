import { useState } from "react";

const MessageInput = ({ send }: { send: (value: string) => void }) => {
  const [value, setValue] = useState("");
  return (
    <div className="flex mt-2  justify-between ">
      <input
        type="text"
        placeholder="type your message..."
        className="flex-grow p-2 border rounded"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          if (value.length > 2) {
            send(value);
            setValue("");
          }
        }}
      >
        send
      </button>
    </div>
  );
};

export default MessageInput;
