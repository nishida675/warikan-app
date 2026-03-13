@startuml
title グループ作成処理

actor User

box "UI層" #LightBlue
participant GroupCreationPage
end box

box "Service層" #LightGreen
participant CreateGroup
end box

box "Firebase層" #LightYellow
participant Firestore
end box

User -> GroupCreationPage : グループ名入力\nメンバー追加
User -> GroupCreationPage : 「作成」クリック

GroupCreationPage -> CreateGroup : CreateGroup(groupName, members)
activate CreateGroup

alt 成功
    CreateGroup -> Firestore : addDoc(warikan)
    activate Firestore
    Firestore --> CreateGroup : projectId
    deactivate Firestore

    loop members
        CreateGroup -> Firestore : addDoc(users)
        activate Firestore
        Firestore --> CreateGroup : success
        deactivate Firestore
    end

    CreateGroup --> GroupCreationPage : { success: true, id }
    deactivate CreateGroup

    GroupCreationPage -> GroupCreationPage : router.push("/GroupCreatingSuccessful/[id]")
    GroupCreationPage --> User : 成功画面表示

else エラー
    CreateGroup -> Firestore : addDoc()
    activate Firestore
    Firestore --> CreateGroup : error
    deactivate Firestore

    CreateGroup --> GroupCreationPage : { success: false, error: Firestore 書き込みに失敗しました。}
    deactivate CreateGroup

    GroupCreationPage --> User : エラーメッセージ表示(alert)
end

@enduml