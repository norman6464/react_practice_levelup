import React, { memo, useState } from "react";

//メモ関数で親コンポーネントと子コンポーネントの代わり具合を検査する

type FizzProps = {
  isFizz: boolean;
};

//Fizzは通常の関数コンポーネント
//isFizzがtrueの場合はFizzを表示して,それ以外は何も表示しない
//isFizzの変化にかからわず、親が再描画されるとFizzも再描画される
const Fizz = (props: FizzProps) => {
  const { isFizz } = props;
  console.log("Fizzが再描画されましたisFizz = ${isFizz}");
  return <span>{isFizz ? "Fizz" : ""}</span>;
};

type BuzzProps = {
  isBuzz: boolean;
};

//Buzzはメモ化した関数のコンポーネント
//isBuzzがtrueの場合はBuzzと表示してさっきと同じ内容
//親コンポーネントが再描画されても,isBuzz自体が変化しない限りBuzzは再描画されない

const Buzz = memo<BuzzProps>((props) => {
  const { isBuzz } = props;
  console.log("Buzzが詐病がされました,isBuzz = ${isBuzz}");
  return <span>{isBuzz ? "isBuzz" : ""}</span>;
});

export const Parent = () => {
  const [count, setCount] = useState(1);
  const isFizz = count % 3 === 0;
  const isBuzz = count % 5 === 0;

  console.log("Parentが再描画されました,count = ${count}");
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>++</button>
      <p>{"現在のカウント : ${count}"}</p>
      <p>
        <Fizz isFizz={isFizz} />
        <Buzz isBuzz={isBuzz} />
      </p>
    </div>
  );
};
