import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        // const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        //передаем параметры в запрос
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params:{
                _limit:limit,
                _page:page
            }
        })
        // return response.data
        //    постраничный выдод. Будем возвращать сам респонс так как необходимо будет обращаться к хедерам и вытаскивать оттуда общее колличество постов
        return response
    }

    //создаем новую функцию для открытия поста по id
    static async getById(id:any) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)

        return response
        //эта функция вернет нужный пост
    }

    //создаем новую функцию для комментариев
    static async getCommentsByPostId(id:any) {
        const response = await axios.get<ResponseComments[]>(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)

        return response
        //эта функция вернет нужный пост
    }

}


export type ResponseComments={
    "postId": number
    "id": number
    "name": string
    "email": string
    "body": string
}