import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

function Editor2() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const handleItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  return (
    <>
      <button onClick={handleItalicClick}>BOLD</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Chat goes here!"
      />
    </>
  );
}

export default Editor2;
