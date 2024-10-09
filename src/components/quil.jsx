import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo } from 'ckeditor5';
import MathType from '@wiris/mathtype-ckeditor5/dist/index.js';

import './styles.scss';

import 'ckeditor5/ckeditor5.css';

function CKEDITOR(props) {
    
    return (
        <CKEditor
            editor={ ClassicEditor }
            config={ {
                toolbar: {
                    items: [ 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'bulletedList', '|', 'MathType', 'ChemType',],
                },
                plugins: [
                    Bold, Essentials, Italic, Mention, Paragraph, Undo, MathType
                ],
                mention: {
                    // Mention configuration
                },
                initialData: props.value,
            } }
            onChange={ ( event, editor ) => {props.onChange(editor.getData());} }
        />
    );
}

export default CKEDITOR;