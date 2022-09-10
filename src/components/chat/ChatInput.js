import React, { useContext, useState } from "react";
import RichEditor from "./Editor";
import { ChatContext } from "../../context/ChatContext";
import Editor2 from "./Editor2";

const ChatInput = () => {
  let { handleSendMsg } = useContext(ChatContext);
  const [content, setContent] = useState("");
  console.log(content);

  return (
    <div>
      <RichEditor
        setContent={setContent}
        handleSendMsg={handleSendMsg}
        content={content}
      />
      {/* <Editor2 /> */}
    </div>
  );
};

export default ChatInput;
