import React, { useState, useRef } from "react";

// 非同期処理関数で指定した時間だけ処理を一時停止する関数
// setTimeout関数は指定した時間の経過後に実行する組み込み関数
// Promiseインスタンスに非同期処理の機能が備わっている
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const UPLOAD_DELAY = 5000; // 5秒後

const InputUploader = () => {
  // 隠されたinputにアクセスするためのref
  const inputImageRef = useRef<HTMLInputElement | null>(null);

  // 選択されたファイルデータを保持するref
  const fileRef = useRef<File | null>(null); // デフォルト値はnull

  const [message, setMessage] = useState<string>(''); // 初期値は空文字

  // 「画像がアップロード」というテキストがクリックされたときのコールバック
  const onClickText = () => {
    if (inputImageRef.current !== null) {
      // inputのDOMにアクセスして、クリックイベントを発火する
      inputImageRef.current.click();
    }
  };

  // ファイルが変更されたときに呼び出されるコールバック
  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files !== null && files.length > 0) {
      // fileRef.currentに値を保存する
      // fileRef.currentに変更があっても再描画されない
      fileRef.current = files[0]; // リストだから配列の最初の要素を取りだす
    }
  };

  // アップロードボタンがクリックされた時に実行するコールバック
  const onClickUpload = async () => {
    if (fileRef.current !== null) {
      // 通常はここにAPIを呼んで、ファイルをサーバーにアップロードをする

      // ここでは擬似的に一定時間待つ（5秒）
      // awaitで一時的にPromiseが解決するまでそのコードの実行を待つ
      await sleep(UPLOAD_DELAY);

      // アップロードが成功した旨を表示するために、メッセージを書き換える
      setMessage(`${fileRef.current.name} has been successfully uploaded`);
    }
  };

  return (
    <div>
      <p style={{ textDecoration: 'underline' }} onClick={onClickText}>画像をアップロード</p>

      <input
        ref={inputImageRef}
        type="file"
        accept="image/*"
        onChange={onChangeImage}
        style={{ visibility: 'hidden' }}
      />
      <br />
      <button onClick={onClickUpload}>アップロードする</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default InputUploader;
