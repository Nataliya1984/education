import React from "react";
import { Component } from "react";

export class ClassCounter extends Component<any, any> {
    // в классовой компоненте состояние создается с помощью constructor
    //конструктор в параметры принимает пропсы, после чего мы инициализируем состояние для этого зарезервировано свойство в компаненте, которое так и называется state, внутри его мы создаем поле count - это и будет наш счетчик
    //
    constructor(props: any) {
        super(props);
        this.state = {
            count: 0
        }
        // контекст компаненты теряется,и в эти функции этот контекст явно необходимо забиндить
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
    }

    increment() {
        this.setState({count: this.state.count + 1})
    }

    decrement() {
        this.setState({count:this.state.count -1})
    }

    render() {
        //функция render, которая будет возвращать tsx
        return (
            <div>
                <h1>{this.state.count}</h1>
                <button onClick={this.increment}> inc</button>
                <button onClick={this.decrement}> dec</button>
            </div>
        );
    }
}
