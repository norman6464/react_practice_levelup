import React, { useState, useCallback } from "react";

type ButtonProps = {
  onClick: () => void;
};

//DecrementButtonは通常の関数コンポーネントを持つ
const DecrementButton = (props: ButtonProps) => {
  const { onClick } = props; //関数onClickの値をpropsに渡す

  console.log("DecrementButtonが再描画されました");
  return <button onClick={onClick}>Dectrement</button>;
};

//Incrementはメモ化した関数コンポーネント
const IncrementButton = React.memo((props: ButtonProps) => {
  const { onClick } = props;
  console.log("Incrementが再描画されました");

  return <button onClick={onClick}>Increment</button>;
});

//DoubleButtonはメモ化した関数コンポーネントを表示する
const DoubleButton = React.memo((props: ButtonProps) => {
  const { onClick } = props;
  console.log("DoubleButtonが再描画されました");

  return <button onClick={onClick}>Double</button>;
});

//useCallBack(関数、依存関係の配列)で関数をメモ化する
export const Parent = () => {
  const [count, setCount] = useState(0);

  const decrement = () => {
    setCount((c) => c - 1);
  };

  const Increment = () => {
    setCount((c) => c + 1);
  };

  //今回はuseCallBackの第二引数の依存配列は空白なので何も持たないということ
  const double = useCallback(() => {
    setCount((c) => c * 2);
  }, []);

  return (
    <div>
      <p>Count:{count}</p>
      {/* コンポーネントに関数を渡す */}
      <DecrementButton onClick={decrement} />
      {/* メモ化コンポーネントに関数を渡す */}
      <IncrementButton onClick={Increment} />
      {/* メモ化コンポーネントにメモ化した関数を返す */}
      <DoubleButton onClick={double} />
    </div>
  );
};
