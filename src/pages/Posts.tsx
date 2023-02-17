import React, {useEffect, useRef, useState} from 'react';
import '../styles/App.css'
import {PostList} from "../components/PostList";
import {PostForm} from "../components/PostForm";
import {PostFilter} from '../components/UI/PostFilter';
import {MyModal} from "../components/UI/Modal/MyModal";
import {MyButton} from "../components/UI/button/MyButton";
import {usePosts} from "../hooks/usePost";
import PostService from "../API/PostService";
import {Loader} from "../components/UI/Loader/Loader";
import {useFetching} from "../hooks/useFetching";
import {getPageCount, getPagesArray} from "../utils/pages";
import {Pagination} from "../components/UI/pagination/Pagination";
import {useObserver} from "../hooks/useObserver";
import Select from "../components/UI/Select";


export type PostType = {
    // id: string
    // title: string
    // body: string
    "userId": number
    "id": number
    "title": string
    "body": string
}

export type FilteredPostType = {
    sort: string
    query: string
}

export type GetPostResponseType = {
    "userId": number
    "id": number
    "title": string
    "body": string
}

function Posts() {
    const [post, setPost] = useState<Array<PostType>>([
        // {id: v1(), title: 'JavaScript', body: 'Description'},
        // {id: v1(), title: 'React', body: 'Ttttttttttt'},
        // {id: v1(), title: 'CSS', body: 'Vppppp'},
    ])


    const [filter, setFilter] = useState<FilteredPostType>({sort: '', query: ''})
    const [modal, setModal] = useState<boolean>(false)
    //создаем состояние в котрое будем помещать общее колличество постов
    const [totalPages, setTotalPages] = useState<number>(0)
    //для лимита и для номера страницы создаем отдельное состояние
    const [limit, setLimit] = useState<number|string>(5)
    const [page, setPage] = useState<number>(1)

    //для того, что бы сделать поиск необходимо сделать фильтрацию и удалять ненужные элементы из массива
    // const sortedPost =getSortedPost()

    //переносим в папку hooks
    // const sortedPost = useMemo(() => {
    //     console.log('функция сорт отработала')
    //     if (filter.sort) {
    //         return [...post.sort((a, b) => a > b ? 1 : -1)]
    //     } else {
    //         return post
    //     }
    // }, [filter.sort, post])

    //переносим в папку hooks
    // const sortedAndSearchedPosts = useMemo(() => {
    //     return sortedPost.filter(post => post.title.toLowerCase().includes(filter.query))
    // }, [filter.query, sortedPost])

    const sortedAndSearchedPosts = usePosts(post, filter.sort, filter.query)
    const lastElement = useRef<any>()

    //вместо этого состояния используем хук useFetching
    // const [isPostLoading, setPostLoading] = useState<boolean>(false)
    //поэтому вызываем хук useFetching, и туда необходимо передать некоторый callback, в нашем случае это будет ассинхронный колбэк
    //остаетсся деструктуризировать то, что нам вернул хук useFetching: 1-ым параметром он нам возвращает функцию, 2-ым состояние за загрузку постов, 3-им за обработку ошибок
    const [fetchPosts, isPostLoading, postError] = useFetching(async (limit: number, page: number) => {
        //в нем необходимо сделать функционал, который у нас был. получить посты с сервера и засетать это состояник
        const response = await PostService.getAll(limit, page);
        setPost([...post, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    })

    useObserver(lastElement, page<totalPages, isPostLoading, ()=>{
        setPage(page + 1)
    } )

    useEffect(() => {
        // 2-ой способ в саму функцию получения постов принимать лимит и пейж, и при вызове этой функции сюда соответственно передавать
        fetchPosts(limit, page)
        // fetchPosts()
    }, [page, limit])
    //1 -ый способ, добавить в массив зависимостей page, что бы порции отображались как надо
    // }, [])


    const createPost = (newPost: any) => {
        setPost([newPost, ...post])
        // после создания поста, модалка скрывается
        setModal(false)
    }

    //удаляем после того как функционал передали в созданный хук useFetching
    // //функция которая отправляет запрос на сервер, получает какие-то данные и помещает в наше состояние с постами
    // async function fetchPosts() {
    //     setPostLoading(true)
    //     //создаем переменную куда будет помещен результат выполнения запроса
    //
    //     setPostLoading(false)
    // }

    const removePost = (posts: PostType) => {
        setPost(post.filter(el => el.id !== posts.id))
        console.log(post)
    }

    const changePage = (page: number) => {
        setPage(page)
    }

    // //для сортировки
    // const onChangeHandler = (sort: string) => {
    //     setSelectedSort(sort)
    //     // вызываем функцию setPost, что бы туда передать отсортированный массив, но так как функция сорт не возвращает новый отсортированный массив мы должны делать копию и менять копию массива
    //     // разварачиваем посты в новый массив [...post],   и отсортируем уже новый массив [...post].sort()
    //     //setPost([...post.sort((a, b) => a > b ? 1 : -1)])
    // }

    return (
        <div className="App">

            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm callback={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            {/*реализовываем поиск, находит нужный пост, остальные исчезают, добавим placheholder и сделаем инпут управляемым*/}
            <PostFilter filter={filter} setFilter={setFilter}/>

            <Select option={[
                {value:5, name:'5'},
                {value:10, name:'10'},
                {value:25, name:'25'},
                {value:-1, name:'показать все'},
            ]}
                    defaultValue={'колличество элементов на странице'}
                    value={limit}
                    onChange={el=>setLimit(el)}
            />

            {/*обработка ошибки, над списком постов делаем проверку и если есть ошибка, то выводить сообщение об ошибке*/}
            {postError && <h1>Произошла ошибка ${postError} </h1>}

            <PostList post={sortedAndSearchedPosts}
                      title={'Посты про JS'}
                      removePost={removePost}
            />

            <div ref={lastElement} style={{height: '20px'}}/>

            {isPostLoading &&
                <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
                    <Loader/>
                </div>
            }


            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
        </div>
    );
}

export default Posts;

