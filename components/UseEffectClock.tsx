import React, { useState, useEffect } from "react";
//インポートの{}内に入るのは関数名のインポートだよ


/*副作用について...
副作用を使用することで関すコンポーネントの更新のむう元ループを防ぐことができる
具体的にいうとおusestateなどが完了してから描画し始めたり　するのでそのためには副作用関数
useEffectが必要
useEffectもuseCallBackとuseMemoと同じようなuseEffect(関数,依存配列)で使用方法は
そのままで依存配列が変更したらそのuseEffectの引数の中の関数を実行する
*/
//タイマーが呼び出される周期を１秒にする
const UPDATE_CYCLE = 1000;

//localstorageで使用するキー
const KEY_LOCALE = 'KEY_LOCALE';

//わかりにくいかもだけどLocale.プロパティになってる
enum Locale {
    US = 'en-US',
    JP = 'ja-JP',
}

const getLocalFromString = (text: string) => {
    switch (text) {

        case Locale.US:
            return Locale.US
        case Locale.JP:
            return Locale.JP
        default:
            return Locale.US

    }
}

export const Clock = () => {
    const [timestamp, setTimestamp] = useState(new Date());//現在の日にち
    const [locale, setLocale] = useState(Locale.US);


    //タイマーをセットするための副作用
    useEffect(() => {

        //タイマーのセット
        const timer = setInterval(() => {
            setTimestamp(new Date());
        }, UPDATE_CYCLE);//UPDATE_CYCLEは１０００の値が入っているつまり１秒ごとに再描画がされている

        //クリーンアップ関数を渡してアンマウント時にタイマーの解除をする
        return () => {
            clearInterval(timer);//クリーンアップ関数は次のuseEffectが実行される直前またはアンマウント時に実行される
        }

    }, [])/*第二引数[]空白つまり依存配列で最初の描画時には初期化 
        new Dateの部分でそれ以降は空白の配列なので何も実行されない */

    /*localeが変化した時に(defaultではUSになっている)
    localstrageに値を保存するための副作用*/
    useEffect(() => {
        //localStrageメソッドはweb strage Api　でブラウザでキーバリューのデータを保存されている標準API
        const saveLocale = localStorage.getItem(KEY_LOCALE);//キーと値

        //nullではない場合
        if (saveLocale! == null) {
            setLocale(getLocalFromString);

        }
    }, [])//依存配列は空白


    useEffect(()=>{
        localStorage.setItem(KEY_LOCALE,locale);
    },[locale]);

    return (
        <div>
            <p>
                <span id="current-time-label">現在時刻</span>
                <span>:{timestamp.toLocaleString(locale)}</span>
                <select
                    value={locale}
                    onChange={(e) => setLocale(getLocalFromString(e.target.value))}>
                    <option value="en-US">en-US</option>
                    <option value="jp-JP">jp-JP</option>
                </select>
            </p>
        </div>
    )
}


/*useLayoutEffect関数はこのuseEffect関数の手順の逆で
先に描画をする前にこの関数を実行する
(例)
useLayoutEffect(() => {
   const savedLocale = localStorage.getItem(KEY_LOCALE)
   if (savedLocale !== null) {
     setLocale(getLocaleFromString(savedLocale))
   }
 }, [])
*/

