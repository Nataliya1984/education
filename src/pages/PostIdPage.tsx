import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService, {ResponseComments} from "../API/PostService";
import {Loader} from "../components/UI/Loader/Loader";
import {PostType} from "./Posts";



export const PostIdPage = () => {
    const params = useParams()
    //создаем состояние и в это состояние помещаем то, что нам вернет сервер
    const [post, setPost] = useState<PostType>({id: 0, body: '', title: '', userId: 0})
    //сохраняем полученный комментарий в состоянии
    const [comments, setComments] = useState<Array<ResponseComments>>([])


    //используем переиспользуемый хук для запроса на сервер useFetching, он возвращает массив где первый элемент это функция, второй - индикатор загрузки и 3-ий это ошибка, параметром этот хук принимает колбэк, который будет возвращен ввиде обертки первым элементом этого массива. Внутри этого колбэка мы дергаем постсервис и метод getById(), id  - достаем из параметров
    const [fetchPostById, isLoading, error] = useFetching(async (id: any) => {
        const response = await PostService.getById(id)
        //после того как мы получили ответ от сервера помещаем поле data в состояние
        setPost(response.data)

    })

    //реализуем запрос для получения комментариев
    const [fetchComments, isCommentsLoading, errorComments] = useFetching(async (id: any) => {
        const response = await PostService.getCommentsByPostId(id)
        //после того как мы получили ответ от сервера помещаем поле data в состояние
        setComments(response.data)

    })

    useEffect(() => {
        //вызываем функцию которую нам вернул хук
        fetchPostById(params.id)
        fetchComments(params.id)

    }, [])

    return (
        <div>
            <h1>Вы открыли страницу поста с ID = {params.id}</h1>
            {/*    выводим информацию о посте */}
            {isLoading
                ? <Loader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h1>
                Комментарии:
            </h1>
            {isCommentsLoading
                ? <Loader/>
                : <div>
                    {comments.map(comm =>
                    <div style={{marginTop:'15px'}}>
                        <h5>{comm.email}</h5>
                        <div>{comm.body}</div>
                    </div>
                    )}
            </div>
            }
        </div>
    );
};
