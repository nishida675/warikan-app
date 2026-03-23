@startuml
title 匿名認証初期化処理(グループ作成ページ)

actor User

box "UI層" #LightBlue
participant GroupCreationPage
participant Loading
end box

box "Service層" #LightGreen
participant AuthProvider
participant useAuth
participant initAnonymousAuth
end box

box "Firebase層" #LightYellow
participant FirebaseAuth
end box

User -> GroupCreationPage : ページアクセス
activate GroupCreationPage

GroupCreationPage -> AuthProvider : Reactレンダリング
activate AuthProvider

AuthProvider -> Loading : Loading表示
activate Loading

AuthProvider -> initAnonymousAuth : useEffect()
activate initAnonymousAuth

initAnonymousAuth -> FirebaseAuth : signInAnonymously()
activate FirebaseAuth

FirebaseAuth --> initAnonymousAuth : userCredential
deactivate FirebaseAuth

initAnonymousAuth --> AuthProvider : 認証完了
deactivate initAnonymousAuth

AuthProvider -> AuthProvider : isAuthReady = true

AuthProvider --> Loading : 非表示
deactivate Loading

AuthProvider --> GroupCreationPage : children render

GroupCreationPage -> useAuth : useAuth()
activate useAuth

useAuth -> AuthProvider : AuthContext取得
AuthProvider --> useAuth : isAuthReady
useAuth --> GroupCreationPage
deactivate useAuth

GroupCreationPage --> User : 画面表示
deactivate GroupCreationPage
deactivate AuthProvider

@enduml

@startuml
title 匿名認証初期化処理(グループページ)

actor User

box "UI層" #LightBlue
participant GroupPage
participant Loading
end box

box "Service層" #LightGreen
participant useAuth
participant AuthProvider
participant initAnonymousAuth
end box

box "Firebase層" #LightYellow
participant FirebaseAuth
end box

User -> GroupPage : ページアクセス
activate GroupPage

GroupPage -> useAuth : useAuth()
activate useAuth

useAuth -> AuthProvider : AuthContext取得
activate AuthProvider

AuthProvider -> initAnonymousAuth : 認証初期化確認
activate initAnonymousAuth

alt 未ログイン
    initAnonymousAuth -> FirebaseAuth : signInAnonymously()
    activate FirebaseAuth
    FirebaseAuth --> initAnonymousAuth : userCredential
    deactivate FirebaseAuth
else 既にログイン済み
    initAnonymousAuth --> AuthProvider : currentUser
end

initAnonymousAuth --> AuthProvider : 認証状態確定
deactivate initAnonymousAuth

AuthProvider -> AuthProvider : isAuthReady = true

AuthProvider --> useAuth : isAuthReady
deactivate AuthProvider

useAuth --> GroupPage
deactivate useAuth

alt 認証完了
    GroupPage --> User : 画面表示
else 認証未完了
    GroupPage -> Loading : Loading表示
    activate Loading
    deactivate Loading
end

deactivate GroupPage

@enduml