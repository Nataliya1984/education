import {useMemo} from "react";
import { PostType } from "../pages/Posts";


//хук который занимается сортировкой
export const useSortedPosts = (post:Array<PostType>, sort:string) => {
    const sortedPost = useMemo(() => {
       // console.log('функция сорт отработала')
        if (sort) {
            return [...post.sort((a, b) => a > b ? 1 : -1)]
        } else {
            return post
        }
    }, [sort, post])
    return sortedPost
}


//хук который будет возвращать уже и отфильтрованный и отсортированный массив
export const usePosts = (posts:Array<PostType>, sort:string, query:string) => {

    //необходимо получить массив отсортированных постов, для этого у нас есть хук в него передаем посты и передаем метод сортировки
    const sortedPost =useSortedPosts(posts, sort)
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter(post => post.title.toLowerCase().includes(query))
    }, [query, sortedPost])

    return sortedAndSearchedPosts
}