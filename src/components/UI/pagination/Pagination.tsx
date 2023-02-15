import React from 'react';
import {getPagesArray} from "../../../utils/pages";

export type PaginationPropsType={
    totalPages:number
    page:number
    changePage:(page: number)=>void
}

export const Pagination = ({totalPages, page,changePage }:PaginationPropsType) => {
    let pagesArray = getPagesArray(totalPages)
    return (
        <div className={'page__wrapper'}>
            {/*на основании массива со страницами мы можем нарисовать кнопки c номерами страниц, поэтому мы по массиву итерируемся и создаем кнопку и внутрь кнопки помещаем номер страницы*/}
            {pagesArray.map((el) =>
                //добавляем дополнительный класс page__curent
                <span
                    key={el}
                    className={page === el ? 'page page__current' : 'page'}
                    onClick={() => changePage(el)}
                >
                        {el}
                    </span>
            )}
        </div>
    );
};

