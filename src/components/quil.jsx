import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	AccessibilityHelp,
	Autoformat,
	AutoImage,
	Autosave,
	Base64UploadAdapter,
	BlockQuote,
	Bold,
	Code,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	Heading,
	Highlight,
	ImageBlock,
	ImageCaption,
	ImageInline,
	ImageInsert,
	ImageInsertViaUrl,
	ImageResize,
	ImageStyle,
	ImageTextAlternative,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	Paragraph,
	PasteFromOffice,
	RemoveFormat,
	SelectAll,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersLatin,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	TodoList,
	Underline,
	Undo
} from 'ckeditor5';


import { baseURL } from '../api';

import './styles.scss';

import 'ckeditor5/ckeditor5.css';

function CKEDITOR(props) {

    return (
        <CKEditor
            editor={ClassicEditor}
            config={{
                toolbar: {
                    items: [
                        'undo',
						'redo',
						'|',
						'sourceEditing',
						'findAndReplace',
						'|',
						'subscript',
						'superscript',
						'heading',
						'|',
						'fontSize',
						'fontFamily',
						'fontColor',
						'fontBackgroundColor',
						'|',
						'bold',
						'italic',
						'underline',
						'strikethrough',
						'code',
						'removeFormat',
						'|',
						'specialCharacters',
						'link',
						'insertImage',
						'mediaEmbed',
						'insertTable',
						'highlight',
						'blockQuote',
						'|',
						'bulletedList',
						'numberedList',
						'todoList',
						'outdent',
						'indent',
					],
                },
                plugins: [
                    AccessibilityHelp,
					Autoformat,
					AutoImage,
					Autosave,
					Base64UploadAdapter,
					BlockQuote,
					Bold,
					Code,
					Essentials,
					FindAndReplace,
					FontBackgroundColor,
					FontColor,
					FontFamily,
					FontSize,
					Heading,
					Highlight,
					ImageBlock,
					ImageCaption,
					ImageInline,
					ImageInsert,
					ImageInsertViaUrl,
					ImageResize,
					ImageStyle,
					ImageTextAlternative,
					ImageToolbar,
					ImageUpload,
					Indent,
					IndentBlock,
					Italic,
					Link,
					LinkImage,
					List,
					ListProperties,
					MediaEmbed,
					Paragraph,
					PasteFromOffice,
					RemoveFormat,
					SelectAll,
					SourceEditing,
					SpecialCharacters,
					SpecialCharactersArrows,
					SpecialCharactersCurrency,
					SpecialCharactersEssentials,
					SpecialCharactersLatin,
					SpecialCharactersMathematical,
					SpecialCharactersText,
					Strikethrough,
					Subscript,
					Superscript,
					Table,
					TableCaption,
					TableCellProperties,
					TableColumnResize,
					TableProperties,
					TableToolbar,
					TextTransformation,
					TodoList,
					Underline,
					Undo,
                ],
                initialData: props.value,
				image: {
					toolbar: [
						'imageStyle:inline', 'imageStyle:wrapText', 'imageStyle:breakText', '|',
						'toggleImageCaption', 'imageTextAlternative'
					]
				},
				balloonToolbar: ['bold', 'italic', '|', 'link', 'insertImage', '|', 'subscript', 'superscript'],
				fontSize: {
					options: [10, 12, 14, 'default', 18, 20, 22],
					supportAllValues: true
				},
				link: {
					addTargetToExternalLinks: true,
					defaultProtocol: 'https://',
					decorators: {
						toggleDownloadable: {
							mode: 'manual',
							label: 'Downloadable',
							attributes: {
								download: 'file'
							}
						}
					}
				},
				list: {
					properties: {
						styles: true,
						startIndex: true,
						reversed: true
					}
				},
				table: {
					contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
				},
				blockToolbar: [
					'fontSize',
					'fontColor',
					'fontBackgroundColor',
					'|',
					'bold',
					'italic',
					'|',
					'link',
					'insertImage',
					'insertTable',
					'|',
					'bulletedList',
					'numberedList',
					'outdent',
					'indent'
				],
				menuBar: {
					isVisible: true
				},
            }}
            onChange={(event, editor) => { props.onChange(editor.getData()); }}
			
        />
    );
}

export default CKEDITOR;