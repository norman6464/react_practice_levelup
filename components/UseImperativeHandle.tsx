import React, { useImperativeHandle, useState, useRef } from "react";


/*useImprativeHandleを使うとコンポーネント関数を親から好きなタイミングで明示的に呼び出せる
コンポーネントにrefが渡されると親のrefの値を決めれるもの
*/
const Child = React.forwardRef((props, ref) => {
  const [message, setMessage] = useState<string | null>(null);

  //useImprativeHandleで親のrefから参照できるsたいを指定

  useImperativeHandle(ref, () => ({
    showMessage: () => {
      const date = new Date();

      const message = "Hello,its ${date.toLocalString()}now";
      setMessage(message);
    },
  }));

  return <div>{message !== null ? <p>{message}</p> : null}</div>;
});

const Parent = () => {
  const childRef = useRef<{ showMessage: () => void }>(null);

  const onClick = () => {
    if (childRef.current !== null) {
      //子のuseimprativeHandleで指定した値を参照
      childRef.current.showMessage();
    }
  };

  return (
    <div>
      <button onClick={onClick}>Show Message</button>
      <Child ref={childRef} />
    </div>
  );
};
