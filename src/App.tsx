import React, {useMemo, useState} from 'react';
import {v1} from 'uuid';
import './styles/App.css'
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import {PostFilter} from './components/UI/PostFilter';
import {MyModal} from "./components/UI/Modal/MyModal";
import {MyButton} from "./components/UI/button/MyButton";


export type PostType = {
    id: string
    title: string
    body: string
}

export type FilteredPostType = {
    sort: string
    query: string
}

function App() {
    const [post, setPost] = useState<Array<PostType>>([
        {id: v1(), title: 'JavaScript', body: 'Description'},
        {id: v1(), title: 'React', body: 'Ttttttttttt'},
        {id: v1(), title: 'CSS', body: 'Vppppp'},
    ])


    const [filter, setFilter] = useState<FilteredPostType>({sort: '', query: ''})

    const [modal, setModal]=useState<boolean>(false)

    //для того, что бы сделать поиск необходимо сделать фильтрацию и удалять ненужные элементы из массива
    // const sortedPost =getSortedPost()

    const sortedPost = useMemo(() => {
        console.log('функция сорт отработала')
        if (filter.sort) {
            return [...post.sort((a, b) => a > b ? 1 : -1)]
        } else {
            return post
        }
    }, [filter.sort, post])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter(post => post.title.toLowerCase().includes(filter.query))
    }, [filter.query, sortedPost])


    const createPost = (newPost: any) => {
        setPost([...post, newPost])
        // после создания поста, модалка скрывается
        setModal(false)
    }

    const removePost = (posts: PostType) => {
        setPost(post.filter(el => el.id !== posts.id))
        console.log(post)
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
            <MyButton style={{marginTop:'30px'}} onClick={()=>setModal(true)}>
                Создать пост
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm callback={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            {/*реализовываем поиск, находит нужный пост, остальные исчезают, добавим placheholder и сделаем инпут управляемым*/}
            <PostFilter filter={filter} setFilter={setFilter}/>

            <PostList post={sortedAndSearchedPosts}
                      title={'Список постов 1'}
                      removePost={removePost}
            />
        </div>
    );
}

export default App;
