// import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
// import { CKEditor } from '@ckeditor/ckeditor5-react'
import React, { Component, useEffect, useRef, useState } from 'react'

const EditorComponent = ({ value, onChange }) => {
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        }
        setEditorLoaded(true)
    }, [])

    // console.log(ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName))
    return editorLoaded ? (
        <CKEditor
            editor={ClassicEditor}
            data={value}
            config={{
                removePlugins: ['Table', 'MediaEmbed'],
            }}
            onChange={(event, editor) => {
                const data = editor.getData()

                onChange(data)
            }}
        />
    ) : (
        <div>Editor loading</div>
    )
}

export default EditorComponent
