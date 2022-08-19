import dynamic from 'next/dynamic'

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})

const modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ list: 'ordered' }, { list: 'bullet' }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme

        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'font',
    'color',
    'background',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'code-block',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
]

const EditorComponent = ({ value, onChange }) => {
    return (
        <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            value={value}
            onChange={data => onChange(data)}
        />
    )
}

export default EditorComponent
