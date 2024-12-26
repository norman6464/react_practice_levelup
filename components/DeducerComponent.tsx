import React, { useReducer } from "react";
/*reducer = 減速機

reducer(現在の状態,action){
return次の状態
} reducerにactionデータを渡す
const[現在の状態,dispath] = useReducer(reducer,reducerに渡される初期状態)
この[現在の状態,dispatch]は関数useReducerの戻り値
*/


//アロー関数ということを忘れない
type Action = 'DECREMENT' | 'INCREMENT' | 'DOUBLE' | 'RESET';

const reducer = (currentCount: number, action: Action) => {
    switch (action) {
        case 'INCREMENT':
            return currentCount + 1;
        case "DECREMENT":
            return currentCount - 1;
        case "DOUBLE":
            return currentCount * 2;
        case "RESET":
            return 0
        default:
            return currentCount
    }

}

type CounterProps = {
    initialVale: number;
}

const Counter = (props: CounterProps) => {
    const { initialVale } = props;

    const [count, dispatch] = useReducer(reducer, initialVale);


    return (
        <div>
            <p>Count:{count}</p>
            {/* dispatch関数にactionを渡して、状態を更新する */}
            <button onClick={() => dispatch('DECREMENT')} >-</button>
            <button onClick={() => dispatch('INCREMENT')}>+</button>
            <button onClick={() => dispatch('DOUBLE')}>✖️</button>
            <button onClick={() => dispatch('RESET')}>Reset</button>
        </div>
    )
}

export default Counter//ここのエクスポートは今作った関数変数Counterをエクスポート

