//здесь мы будем описывать наши маршруты
//создаем объект для авторизованных пользователей
export enum ROUTS_PRIVATE {
    DEFAULT = '/',
    ABOUT = '/about',
    POSTS_ID_ID = '/posts/:id',
    ERROR = '/404',
}

//создаем объект для не авторизованных пользователей
export enum ROUTS_PUBLIC{
    LOGIN = '/login',
}