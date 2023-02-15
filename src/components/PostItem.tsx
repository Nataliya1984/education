import React from 'react';
import '../styles/App.css'
import { MyButton } from './UI/button/MyButton';
import {PostType} from "../pages/Posts";


type PostItemPropsType = {
    post:PostType
    number:number
    removePost:(posts:PostType)=>void
}

export const PostItem = (props:PostItemPropsType) => {

    const removePostHandler = () => {
      props.removePost(props.post)
    }

    return (
        <div className='post'>
            <div className="post__content">
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={removePostHandler} > Удалить </MyButton>
            </div>
        </div>
    );
};

