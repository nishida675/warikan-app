import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';//認証機能のインポート
import { getFirestore } from 'firebase/firestore';//DB機能のインポート

const firebaseConfig = {//.env.localの内容を読み込むよう設定
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);//認証機能の定義
export const db = getFirestore(app);//DB機能の定義
export const collectionName = "warikan"; // Firestoreコレクション名

//アプリ起動時に匿名ログインする関数
export const initAnonymousAuth = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
     const user = userCredential.user;
    //IDトークンを取得
    const idToken = await user.getIdToken();
    return idToken;
  } catch (error) {
    console.error("ログイン失敗:", error);
  }
};