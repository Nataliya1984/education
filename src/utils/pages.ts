export const getPageCount = (totalCount:number, limit:number) => {
return Math.ceil(totalCount / limit)
}


//вынесли функционал по заполнению массива в отдельную функцию
//функция которая принимает общее колличество страниц и на основании этого колличества заполняет массив
//зная общее колличество страниц, формируем массив в котором значения идут от 1 до 10-и, и уже на оснавании этого массива нарисовать кнопки при нажатии на которые быдет меняться страница
export const getPagesArray = (totalPages:number) => {

    let result = []

    for (let i = 0; i < totalPages; i++) {
        result.push(i +1)
    }
    return result
}