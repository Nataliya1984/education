 import React from 'react';
 import {PostItem} from "./PostItem";
 import {PostType} from "../App";

export type PostListPropsType = {
   post:PostType[]
    title:string
    removePost:(posts:PostType)=>void
}

export const PostList = (props:PostListPropsType) => {

    if (!props.post){
        return (
            <h1 style={{textAlign: 'center'}}>Посты не существуют</h1>
        )
    }

    return (
       <div>
           <h1 style={{textAlign:'center'}}>{props.title}</h1>
           {
               props.post.map((el, index)=>{
                   return(
                       <PostItem number={index + 1} post={el} key={el.id} removePost={props.removePost}/>
                   )
               })
           }
       </div>
    );
};
