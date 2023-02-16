import React from 'react';
import '../styles/App.css'
import { MyButton } from './UI/button/MyButton';
import {PostType} from "../pages/Posts";
import { useNavigate } from 'react-router-dom';


type PostItemPropsType = {
    post:PostType
    number:number
    removePost:(posts:PostType)=>void
}

export const PostItem = (props:PostItemPropsType) => {

    let navigate = useNavigate();
    console.log(navigate)

    const removePostHandler = () => {
      props.removePost(props.post)
    }

    const openPosHandler = () => {
        navigate(`/posts/${props.post.id}`)
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
                <MyButton onClick={openPosHandler} > Открыть </MyButton>
                <MyButton onClick={removePostHandler} > Удалить </MyButton>
            </div>
        </div>
    );
};

