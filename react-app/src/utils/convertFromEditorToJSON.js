import { convertToRaw } from "draft-js";

const convertFromEditorToJson = (editorState) => {
  const content = editorState.getCurrentContent();
  const jsonContent = JSON.stringify(convertToRaw(content))
  return jsonContent;
}

export default convertFromEditorToJson;
