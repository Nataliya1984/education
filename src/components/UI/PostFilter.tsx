import React from 'react';
import { FilteredPostType } from '../../pages/Posts';
import {MyInput} from "./Input/MyInput";
import Select from "./Select";


type PostFilterPropsType={
filter:FilteredPostType
    setFilter:any
}

export const PostFilter = ({filter, setFilter}:PostFilterPropsType) => {
    return (
        <div>
            <MyInput placeholder={'поиск...'}
                     value={filter.query}
                     onChange={(e: any) => {
                         setFilter({...filter,query:e.currentTarget.value})
                     }}
            />

            <Select defaultValue={'Сортировка по:'} option={[
                {value: 'title', name: 'по названию'},
                {value: 'body', name: 'по описанию'}
            ]}
                    onChange={selectedSort => setFilter({...filter, sort:selectedSort})}
                    value={filter.sort}
            />
        </div>
    );
};
