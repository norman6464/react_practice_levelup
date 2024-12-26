//無名関数でコンポーネントを定義してTxt,という変数に代入する
//Txtコンポーネントは親から'ccontent'というデータを受け取る
import React from "react";

const Tech = (props: { content: string }) => {
  //propsからcontentという値を取り出す
  const { content } = props;

  //propsで渡されたデータを表示する
  return <p className="tech">{content}</p>;
};

const Message = (props: {}) => {
  const content1 = "this is parent component";
  const content2 = "Message users TExt conponent";

  return (
    <div>
      {/* contentというキーでコンポーネントにデータを渡す */}
      <Tech content={content1} />
      {/* 違うデータを渡すと、違う内容が表示される */}
      <Tech content={content2} />
    </div>
  );
};

//Messageコンポーネントをデフォルトでエクスポートをする
export default Message;
