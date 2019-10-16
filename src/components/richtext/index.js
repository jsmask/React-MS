
import React, { useState } from 'react';
import { EditorState, convertToRaw,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Richtext(props, ref) {

    const { defaultValue } = props;


    const htmlBlocks=htmlToDraft(defaultValue);

    const contentState =  ContentState.createFromBlockArray(htmlBlocks.contentBlocks)
    const editorState = EditorState.createWithContent(contentState);

    const [editorContent, setEditorContent] = useState(editorState)

    const onEditorStateChange = editorState => {
        setEditorContent(editorState);
    };

    return (
        <div>
            <Editor
                editorState={editorContent}
                editorStyle={{ border: "1px solid #F1F1F1", minHeight: 200, padding: "0 10px" }}
                onEditorStateChange={onEditorStateChange}
            >
            </Editor>
            <textarea
                ref={ref}
                disabled
                style={{ display: 'none' }}
                value={draftToHtml(convertToRaw(editorContent.getCurrentContent()))}
            />
        </div>
    )
}

export default React.forwardRef(Richtext);