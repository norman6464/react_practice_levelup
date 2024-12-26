import React, { useContext } from "react";

/*useContextはcontextの値を参照するための関数
useContextの引数にcontextを渡すことでそのcontextの値を参照できる
*/


type User = {
    id: number,
    name: string,
};


//ユーザーデータを保存するContextを作成する
const UserContext = React.createContext<User | null>(null);//デフォルト値はnull


const GrandChild = () => {
    //useContextにContextを渡すことでContextから値を取得できる
    const user = useContext(UserContext);

    return user !== null ? <p>Hello,{user.name}</p> : null

}


const Child = () => {
    const now = new Date();
    return (
        <div>
            <p>Current:{now.toLocaleString()}</p>
            <GrandChild />
        </div>
    )
}

const Parent = () => {
    const user: User = {
        id: 1,
        name: 'Alice',
    };

    return (
        //Contextに値を渡すここでProviderを使う
        <UserContext.Provider value={user}>
            <Child />
        </UserContext.Provider>
    )
}
