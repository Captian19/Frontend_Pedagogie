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

                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', "list"],
                        inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                            bold: { className: 'bordered-option-classname' },
                            italic: { className: 'bordered-option-classname' },
                            underline: { className: 'bordered-option-classname' },
                            strikethrough: { className: 'bordered-option-classname' },
                            code: { className: 'bordered-option-classname' },
                        },
                        blockType: {
                            className: 'bordered-option-classname',
                        },
                        fontSize: {
                            className: 'bordered-option-classname',
                        },
                        fontFamily: {
                            className: 'bordered-option-classname',
                        },
                        list: {
                            unordered: { className: 'demo-option-custom' },
                            ordered: { className: 'demo-option-custom' },
                            // indent: { icon: Icons.indent, className: 'demo-option-custom' },
                            // outdent: { icon: Icons.outdent, className: 'demo-option-custom' },
                        },
                    }}
                    wrapperStyle={{ border: 3, borderStyle: "solid", borderColor: "white" }}
                    editorStyle={{ border: 2, borderStyle: "solid", borderColor: "gray", height: 250, margin: 6, borderRadius: 6 }}
                    editorState={editorState}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    localization={{ locale: 'fr' }}
                    readOnly={this.props.readOnly != undefined ? this.props.readOnly : false}
                />
            </div>
        );
    }
}