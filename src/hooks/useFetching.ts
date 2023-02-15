import {useState} from "react";


export const useFetching = (callback: any) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    //базовый кейс - это обработка ошибок, по умолчанию это будет пустая строка и если ошибка произошла, мы будем эту ошибку туда добавлять
    const [error, setError] = useState<any>('')
    // создаем функцию, обернем все в try, catch, для того что бы отлавливать потенциально возможные ошибки
    const fetching = async (...args:any) => {
        try {
            setIsLoading(true)
            await callback(...args)
        } catch (e:any) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching, isLoading, error]
}