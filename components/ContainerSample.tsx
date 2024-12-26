import React, { JSX } from 'react';//必ずインポートをする




type ContainerProps = {
    title: string,
    children: React.ReactNode
}


/*ここが関数コンポーネントの呼び出しもと
const Container =(props:{title:string,children:React.ReactElement})=>{
今までこの呼び出しだったのが上のオブジェクト(type(別名)エイリアスで定義してからpropsを作る*/



const Container = (props: ContainerProps): JSX.Element => {


    //さっきと同じpropsにデータを渡す
    const { title, children } = props


    return (
        <div style={{ background: 'red' }}>
            <span>{title}</span>
            {/*propsのchildrenを埋め込むと、このコンポーネントの開始タグと閉じタグで囲んだ要素を表示する(つまり渡したデータによて値がことなる) */}
            <div>{children}</div>
        </div>
    )
}

//ここからが関数コンポーネントの呼び出し(親)
const Parent = (): JSX.Element => {
    return (
        //Containerを使用する際に、他の要素を囲って使用する
        <Container title='Hello'>
            <p>ここの部分が背景色で囲まれます</p>
        </Container>
    )
}

export default Parent
