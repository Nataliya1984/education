import React from 'react';
import style from './MyInput.module.css'

export const MyInput = ({...props}) => {
    return (
        <input {...props} className={style.myInput}/>
    );
};