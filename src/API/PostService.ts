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
}