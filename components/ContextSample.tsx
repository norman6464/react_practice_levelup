import React from "react";
//React Hooks部分

//Titleを渡すためのContextを作成
const TitleContext = React.createContext("");

//Titleコンポーネントの中でContextの値をする
const Title = () => {
  //Consumerを使って,Contextの値を参照
  return (
    <TitleContext.Consumer>
      {/*Consumer直下に関数を置いてContextの値を参照する */}
      {(title) => {
        return <h1>{title}</h1>;
      }}
    </TitleContext.Consumer>
  );
};

const Header = () => {
  return (
    <div>
      {/* HeaderからTitleへは何もデータを渡さない */}
      <Title />
      {/* 書き方クソキモい笑 */}
    </div>
  );
};

//Pageコンポーネントの中でContextの値を渡す
const Page = () => {
  const title = "React Book";
  //Provider(供給)を使いContextに値をセットする

  return (
    <TitleContext.Provider value={title}>
      <Header />
    </TitleContext.Provider>
  );
};

export default Page;
