import React, {useMemo, useState} from 'react';
import {v1} from 'uuid';
import './styles/App.css'
import {PostList} from "./components/PostList";
import {PostForm} from "./components/PostForm";
import Select from "./components/UI/select";
import {MyInput} from "./components/UI/Input/MyInput";


export type PostType = {
    id: string
    title: string
    body: string
}

function App() {
    const [post, setPost] = useState<Array<PostType>>([
        {id: v1(), title: 'JavaScript', body: 'Description'},
        {id: v1(), title: 'React', body: 'Ttttttttttt'},
        {id: v1(), title: 'CSS', body: 'Vppppp'},
    ])

    const [selectedSort, setSelectedSort] = useState<string>('')
    // состояние для поиска
    const [searchQuery, setSearchQuery] = useState('')

    //для того, что бы сделать поиск необходимо сделать фильтрацию и удалять ненужные элементы из массива
    // const sortedPost =getSortedPost()

    const sortedPost = useMemo(() => {
        console.log('функция сорт отработала')
        if (selectedSort) {
            return [...post.sort((a, b) => a > b ? 1 : -1)]
        } else {
            return post
        }
    }, [selectedSort, post])

    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPost.filter(post => post.title.toLowerCase().includes(searchQuery))
    }, [searchQuery, sortedPost])


    const createPost = (newPost: any) => {
        setPost([...post, newPost])
    }

    const removePost = (posts: PostType) => {
        setPost(post.filter(el => el.id !== posts.id))
        console.log(post)
    }

    //для сортировки
    const onChangeHandler = (sort: string) => {
        setSelectedSort(sort)
        // вызываем функцию setPost, что бы туда передать отсортированный массив, но так как функция сорт не возвращает новый отсортированный массив мы должны делать копию и менять копию массива
        // разварачиваем посты в новый массив [...post],   и отсортируем уже новый массив [...post].sort()
        //setPost([...post.sort((a, b) => a > b ? 1 : -1)])
    }

    return (
        <div className="App">

            <PostForm callback={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            {/*реализовываем поиск, находит нужный пост, остальные исчезают, добавим placheholder и сделаем инпут управляемым*/}
            <MyInput placeholder={'поиск...'}
                     value={searchQuery}
                     onChange={(e: any) => {
                         setSearchQuery(e.currentTarget.value)
                     }}
            />

            <Select defaultValue={'Сортировка по:'} option={[
                {value: 'title', name: 'по названию'},
                {value: 'body', name: 'по описанию'}
            ]}
                    onChange={onChangeHandler}
                    value={selectedSort}
            />

            {
                sortedAndSearchedPosts.length === 0
                    ? <h1 style={{textAlign: 'center'}}>Посты не существуют</h1>
                    : <PostList post={sortedAndSearchedPosts}
                                title={'Список постов 1'}
                                removePost={removePost}
                    />
            }


        </div>
    );
}

export default App;
