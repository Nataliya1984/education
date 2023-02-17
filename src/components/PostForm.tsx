import React, {useState} from 'react';
import {MyInput} from "./UI/Input/MyInput";
import {MyButton} from "./UI/button/MyButton";
import {v1} from "uuid";

type PostFormPropsType = {
    callback:(newPost:any)=>void
}

export const PostForm = ({callback}:PostFormPropsType) => {

    //что бы не создавать для каждого инпута отдельное состояние, создадим объект и для каждого инпута использовать поле этого объекта
    const [posts, setPosts] = useState({title:'', body:''})


    const onChangeHandler = (e:any) => {
        setPosts({...posts, title: e.currentTarget.value})
        console.log(posts)
    }

    const onChangeBodyHandler = (e:any) => {
        // setBody(e.currentTarget.value)
        setPosts({...posts, body: e.currentTarget.value})
    }

    const addNewPost = (e:any) => {
        e.preventDefault()
        const newPost = { id:v1(), ...posts}
        callback(newPost)
        setPosts({title: '', body: ''})
    }

    return (
            <form>
                <MyInput
                    type="text"
                    placeholder={'Название поста'}
                    value={posts.title}
                    onChange={onChangeHandler}
                />
                <MyInput
                    type="text"
                    placeholder={'Описание поста'}
                    value={posts.body}
                    onChange={onChangeBodyHandler}
                />
                <MyButton
                    onClick={addNewPost}
                >
                    Создать пост
                </MyButton>
            </form>
    );
};
