import React from 'react';
import { ButtonHTMLAttributes } from 'react';
import { DetailedHTMLProps } from 'react';
import style from './MyButton.module.css'

//тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type MyButtonPropsType=DefaultButtonPropsType & {
   // xType?: string
}


export const MyButton: React.FC<MyButtonPropsType> = (
    { ...restProps}:MyButtonPropsType) => {

    return (
        <button
            className={style.myBtn}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    );
};
