import React, { useState, useCallback, useDebugValue } from "react";

/*カスタムフックとuseDebugValue関数
ここでは関数コンポーネント内で複数のオリジナルのフックの組み合わせを使う
コードの可読性が上がる
*/

//input向けにコールバックと現在の入力内容をまとめたフック
const useInput = () => {
  //現在の入力フック
  const [state, setState] = useState("");

  //inputが変更したら、フック内の状態を更新する
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  }, []); //一時てきなカラ配列

  //デバッグように値を出力をする
  //値は開発者用ツールのComponentsタブに表示さる
  useDebugValue("input:${state}");
  //現座の入力ない内容とコールバック関数だけ返す
  return [state, onChange] as const;
 //as constでstateとonChangeがタプル(固定長の配列)になる

};

export const Input = () => {
  const [text, onChangeText] = useInput();

  return (
    <div>
      <input type="text" value={text} onChange={onChangeText} />
      <p>Input:{text}</p>
    </div>
  );
};
