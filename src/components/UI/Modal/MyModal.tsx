import React, {ReactNode} from 'react';
import style from './MyModal.module.css'

type MyModalPropsType = {
children:ReactNode
    visible:any
    setVisible:any
}

export const MyModal = ({children, visible, setVisible}: MyModalPropsType) => {

   const rootClasses = [style.myModal]
    if (visible){
        rootClasses.push(style.active)
    }

    return (
        // для того, что бы добавить активный класс, можно воспользоваться такой конструкцией: создать массив, добавить туда два класса и заджойнить его по пробелу (джойн возвращает строку и в этой строке будет два класса склеенных по пробелу)
        // <div className={[style.myModal, style.active].join(' ')}>

        //с помощью этой конструкции мы определяем добавлять класс active или нет
        // с помощью onClick реализуем закрытие на темную область
        <div className={rootClasses.join(' ')} onClick={()=>setVisible(false)}>
            {/*что бы не закрывалось окно при нажатии на контентную часть необходимо предотвратить всплытие события, для этого у ивента есть функция которая называется стоппропэгейшен*/}
            <div className={style.myModalContent} onClick={(e)=>{e.stopPropagation()}}>
                {children}
            </div>
        </div>
    );
};
