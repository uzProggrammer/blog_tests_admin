import React from 'react';
import { colourOptions } from './data';
import Select from 'react-select';

const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: localStorage.getItem('coreui-free-react-admin-template-theme')==='dark'?'var(--cui-dark-bg)':'--cui-light', }),
    menu: (styles) => ({ ...styles, zIndex: 9999, backgroundColor: localStorage.getItem('coreui-free-react-admin-template-theme')==='dark'?'var(--cui-dark-bg-subtle)':'--cui-light', }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return {
            ...styles,
            ":hover":{
                backgroundColor: 'var(--cui-primary)',
            },
            ":active":{
                backgroundColor: 'var(--cui-info)',
            },
        };
    },
    input: (styles) => ({ ...styles, color:localStorage.getItem('coreui-free-react-admin-template-theme')==='dark'?'white':'black' }),
    placeholder: (styles) => ({ ...styles, color:localStorage.getItem('coreui-free-react-admin-template-theme')==='dark'?'white':'black' }),
    singleValue: (styles, { data }) => ({ ...styles, color:localStorage.getItem('coreui-free-react-admin-template-theme')==='dark'?'white':'black'   }),
};

export default function ReactSelect(props) {
    return (
        <Select
            options={props.options}
            styles={colourStyles}
            onChange={props.onEdit}
        />
    )
};