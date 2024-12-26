import React, { useState } from "react";

//typeでエイリアス(別名)
type CounterProps = {
  initialValue: number; //numberはintと同じ
};

const Counter = (props: CounterProps) => {
  const { initialValue } = props; //propsにinitialValueの値を渡す

  //カウント回数の状態を保持するuseState()を呼び出す
  //そして引数には初期値を渡す
  //countが現在の状態の場合、setStateが状態を更新する
  const [count, setCount] = useState(initialValue);

  return (
    <div>
      <p>Count:{count}</p>
      {/* setCountを呼ぶことで状態を更新する */}
      <button onClick={() => setCount(count - 1)}>-</button>
      {/* これがコールバック関数 */}
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
    </div>
  );
}; /*コールバックの一つ目は普通の代入を二つ目は関数で呼び出してインクリメントをしている */

export default Counter;
