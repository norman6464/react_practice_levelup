import React, { useState, useMemo } from "react";


//useMemo(値を生成する関数、依存配列)
//このコードではcharacter1とcharater2の実際の関数reduceを呼ばれるときの効率の違いについてわかる
//useMemo関数はuseCallBack()と一緒で依存関係の比較から入る

export const UseMemoSample = () => {



    //textは現在のテキストボックスの中身を保持する
    const [text, setText] = useState('');

    //itemsは文字列のリストを保持する(JavaでいうArrayList<String>(初期値の値)おイメージ)
    const [items, setItems] = useState<string[]>([])


    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }




    //ボタンをクリックした時に呼びだされる関数
    const onClickButton = () => {

        setItems((prevItems) => {

            //げんんざいの入力値をitemsに追加する、この時新しい配列(スプレッド構文)を作成して入力されたtextの値を追加して保持する
            return [...prevItems, text];
        })
        //テキストボックスの中身をなかみを空にする
        setText('');
    }

    //numberOfCharacters1は再描画の度にitems.reduceを実行して結果を得る
    const numberOfCharacters1 = items.reduce((sub, item) => sub + item.length, 0);

    //わかりにくいからメモuseMemo(関数、依存配列)の法則
    //numberOfCharacters2は　useMemoを使ってitemsが行使されるタイミングでitems.reduce関数を使う
    const numberOfCharacters2 = useMemo(() => {
        return items.reduce((sub, item) => sub + item.length, 0)
    }, [items]);
    //第二引数にitemがあるのでitemが新しくなった時だけ関数を実行してメモを更新する

    
    return (
        <div>
            <p>UseMemoSample</p>
            <div>
                <input value={text} onChange={onChangeInput} />
                <button onClick={onClickButton}>Add</button>{/*この変数にはさっきのスプレッド構文の配列return
                の内容に反映されるでitem関係なくコピーされるcharacter1と比べてcharacter2の方が効率がいい */}
            </div>
            <div>
                {items.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </div>
            <div>
                <p>Total Number of Character 1: {numberOfCharacters1}</p>
                <p>Total Number of Character 2: {numberOfCharacters2}</p>
            </div>
        </div>
    )
}

