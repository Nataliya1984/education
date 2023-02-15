 import React from 'react';
 import {PostItem} from "./PostItem";
 import {
     CSSTransition,
     TransitionGroup,
 } from 'react-transition-group';
 import {PostType} from "../pages/Posts";

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
           <h1 style={{textAlign:'center'}}>
               {props.title}
           </h1>
           <TransitionGroup>
               {props.post.map((el, index)=>
                       <CSSTransition
                           key={el.id}
                           timeout={500}
                           classNames="post"
                       >
                       <PostItem
                               number={index + 1}
                               post={el}
                               // key={el.id}
                               removePost={props.removePost}
                           />
                       </CSSTransition>
                   )
               }
           </TransitionGroup>

       </div>
    );
};
