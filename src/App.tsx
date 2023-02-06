import React, {ChangeEvent, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from "./components/Counter";
import {ClassCounter} from "./components/ClassCounter";

function App() {
    // let likes:number = 0

    const [value, setValue] = useState<string>('текст в инпуте')



    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <div className="App">
            <h1>{value}</h1>
            <input value={value} onChange={onChangeHandler}/>
           {/*<Counter/>*/}
            <ClassCounter/>

        </div>
    );
}

export default App;
