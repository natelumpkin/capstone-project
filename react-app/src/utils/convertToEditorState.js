import {EditorState, convertFromRaw, decorator} from 'draft-js'

const convertToEditorState = (editorContent) => {
  const content = convertFromRaw(JSON.parse(editorContent));
  const editorState = EditorState.createWithContent(content, decorator);
  return editorState
}

export default convertToEditorState;
