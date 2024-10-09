// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import {ClassicEditor, Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading, FontColor, FontBackgroundColor, FontFamily, FontSize, BlockQuote, CodeBlock, Strikethrough, Subscript, Superscript, Code, Link,} from 'ckeditor5';
// import MathType from '@wiris/mathtype-ckeditor5/dist/index.js';

// import { baseURL } from '../api';

// import './styles.scss';

// import 'ckeditor5/ckeditor5.css';

// function CKEDITOR(props) {

//     return (
//         <CKEditor
//             editor={ClassicEditor}
//             config={{
//                 toolbar: {
//                     items: [
//                         'undo', 'redo',
//                         '|',
//                         'heading',
//                         '|',
//                         'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
//                         '|',
//                         'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
//                         '|',
//                         'link', 'ImageUpload', 'blockQuote', 'codeBlock',
//                         '|',
//                         'MathType', 'ChemType',],
//                 },
//                 plugins: [
//                     Bold, Essentials, Italic, Mention, Paragraph, Undo, Heading, FontColor, FontBackgroundColor, FontFamily, FontSize, BlockQuote, CodeBlock, Strikethrough, Subscript, Superscript, Code, Link, MathType
//                 ],
//                 initialData: props.value,
//             }}
//             onChange={(event, editor) => { props.onChange(editor.getData()); }}
//         />
//     );
// }

// export default CKEDITOR;


import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

import '../assets/tiny/skins/ui/CUSTOM/content.css'


export default function CKEDITOR(props) {
    let useDarkMode = localStorage.getItem('coreui-free-react-admin-template-theme') === 'dark';
  return (
    <Editor
      apiKey='17a7wrogyqde5oyr8zrqqq2htjo86oedjrlbztd41drtencr'
      init={{
        skin: useDarkMode ? 'oxide-dark' : 'oxide',
        content_css: useDarkMode ? 'dark' : 'default',
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
      }}
      initialValue={props.value}
      onChange={(e)=>{props.onChange(e.level.content)}}
    />
  );
}