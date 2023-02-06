import React, {useState} from 'react';

const Counter = () => {
    let [count, setCount] = useState<number>(0)
    const increment = () => {
        setCount(count += 1)
        // likes +=1
        console.log(count)
    }
    const decrement = () => {
        //likes -=1
        setCount(count -= 1)
        console.log(count)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}> inc</button>
            <button onClick={decrement}> dec</button>
        </div>
    );
};

export default Counter;