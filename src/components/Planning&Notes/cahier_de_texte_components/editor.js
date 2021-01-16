import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


export default class EditorWYSI extends Component {
    /**
     * 
     * @param {*} props 
     * The role of this class component is to have the WYSIWYG texterea with formatting
     */
    constructor(props) {
        super(props);
        this.state = {
            editorState: props.defaultValue != null ? EditorState.createWithContent(ContentState.createFromBlockArray(convertFromHTML(props.defaultValue))) : EditorState.createEmpty(),
        };
        this.onEditorStateChange = this.onEditorStateChange.bind(this);

    }


    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
        this.props.handleEditorChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    wrapperStyle={{border:1.5, borderStyle: "solid", borderColor: "black"}}
                    editorStyle={{border:2, borderStyle: "solid", borderColor: "gray", height:250, margin: 5, borderRadius:6}}
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    localization={{locale: 'fr'}}
                />
            </div>
        );
    }
}