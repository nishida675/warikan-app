@startuml
title データ取得処理 (READ)

actor User

box "UI層" #LightBlue
participant GroupPage
participant Loading
end box

box "Service層" #LightGreen
participant getProject
participant getUsers
participant getExpenses
end box

box "Firebase層" #LightYellow
participant Firestore
end box

User -> GroupPage : ページアクセス
activate GroupPage

GroupPage -> GroupPage : loading = true
GroupPage -> Loading : render

GroupPage -> getProject : getProject(projectId)
activate getProject

getProject -> Firestore : getDoc(project)
activate Firestore
Firestore --> getProject : projectData
deactivate Firestore

getProject --> GroupPage
deactivate getProject

GroupPage -> getUsers : getUsers(projectId)
activate getUsers

getUsers -> Firestore : getDocs(users)
activate Firestore
Firestore --> getUsers : users
deactivate Firestore

getUsers --> GroupPage
deactivate getUsers

GroupPage -> getExpenses : getExpenses(projectId)
activate getExpenses

getExpenses -> Firestore : getDocs(expenses)
activate Firestore
Firestore --> getExpenses : expenses
deactivate Firestore

getExpenses --> GroupPage
deactivate getExpenses

alt データ取得成功
    GroupPage -> GroupPage : groups state更新
    GroupPage -> GroupPage : expenses state更新
    GroupPage -> GroupPage : loading = false
    GroupPage --> User : グループ画面表示
else 取得エラー
    GroupPage -> GroupPage : console.error
    GroupPage -> GroupPage : loading = false
    GroupPage --> User : エラー状態の画面表示
end

deactivate GroupPage

@enduml

@startuml
title 支出追加処理 (CREATE)

actor User

box "UI層" #LightBlue
participant ExpenseNewPage
participant Loading
end box

box "Service層" #LightGreen
participant addExpense
end box

box "Firebase層" #LightYellow
participant Firestore
end box

User -> ExpenseNewPage : 登録ボタン押下
activate ExpenseNewPage

ExpenseNewPage -> ExpenseNewPage : isSubmitting = true
ExpenseNewPage -> ExpenseNewPage : isLoading = true
ExpenseNewPage -> Loading : render

ExpenseNewPage -> addExpense : addExpense()
activate addExpense

addExpense -> Firestore : addDoc()
activate Firestore
Firestore --> addExpense : result
deactivate Firestore

addExpense --> ExpenseNewPage : result
deactivate addExpense

alt 登録成功 (result.success)
    ExpenseNewPage -> ExpenseNewPage : router.push(GroupPage)
    ExpenseNewPage --> User : グループ画面表示
else 登録失敗
    ExpenseNewPage -> ExpenseNewPage : isSubmitting = false
    ExpenseNewPage -> ExpenseNewPage : isLoading = false
    ExpenseNewPage -> ExpenseNewPage : console.error
end

deactivate ExpenseNewPage

@enduml

@startuml
title 支出編集処理 (UPDATE)

actor User

box "UI層" #LightBlue
participant ExpenseEditPage
end box

box "Service層" #LightGreen
participant updateExpense
end box

box "Firebase層" #LightYellow
participant Firestore
end box

User -> ExpenseEditPage : 更新ボタン押下
activate ExpenseEditPage

ExpenseEditPage -> ExpenseEditPage : loading = true

ExpenseEditPage -> updateExpense : updateExpense(projectId, expenseId, data)
activate updateExpense

updateExpense -> Firestore : updateDoc()
activate Firestore

Firestore --> updateExpense : result
deactivate Firestore

updateExpense --> ExpenseEditPage : success
deactivate updateExpense

alt 更新成功
    ExpenseEditPage -> ExpenseEditPage : ExpenseContext更新
    ExpenseEditPage -> ExpenseEditPage : router.back()
    ExpenseEditPage --> User : グループ画面表示
else 更新失敗
    ExpenseEditPage -> ExpenseEditPage : alert表示
end

ExpenseEditPage -> ExpenseEditPage : loading = false

deactivate ExpenseEditPage

@enduml

@startuml
title 支出削除処理 (DELETE)

actor User

box "UI層" #LightBlue
participant GroupPage
end box

box "Service層" #LightGreen
participant DeleteExpense
end box

box "Firebase層" #LightYellow
participant Firestore
end box

User -> GroupPage : 削除ボタン押下
activate GroupPage

GroupPage -> DeleteExpense : DeleteExpense(projectId, expenseId)
activate DeleteExpense

DeleteExpense -> Firestore : deleteDoc()
activate Firestore

Firestore --> DeleteExpense : result
deactivate Firestore

DeleteExpense --> GroupPage : isDelete
deactivate DeleteExpense

alt 削除成功
    GroupPage -> GroupPage : expenses state更新
    GroupPage --> User : UI更新
else 削除失敗
    GroupPage -> GroupPage : alert表示
end

deactivate GroupPage

@enduml

@startuml
title プロジェクト編集処理 (UPDATE)

actor User

box "UI層" #LightBlue
participant GroupEditPage
end box

box "Service層" #LightGreen
participant updateGroup
participant updateUsers
end box

box "Firebase層" #LightYellow
participant Firestore
end box

User -> GroupEditPage : 更新ボタン押下
activate GroupEditPage

GroupEditPage -> GroupEditPage : loading = true

'-----------------------------
' グループ名更新
'-----------------------------

GroupEditPage -> updateGroup : updateGroup(projectId, name)
activate updateGroup

updateGroup -> Firestore : updateDoc(project)
activate Firestore
Firestore --> updateGroup : result
deactivate Firestore

updateGroup --> GroupEditPage : okGroup
deactivate updateGroup

'-----------------------------
' メンバー更新
'-----------------------------

GroupEditPage -> updateUsers : updateUsers(projectId, members)
activate updateUsers

loop members分繰り返し

updateUsers -> Firestore : getDoc(user)
activate Firestore
Firestore --> updateUsers : snapshot
deactivate Firestore

alt ユーザー存在
    updateUsers -> Firestore : updateDoc(user)
    activate Firestore
    Firestore --> updateUsers : success
    deactivate Firestore
else ユーザー不存在
    updateUsers -> Firestore : addDoc(user)
    activate Firestore
    Firestore --> updateUsers : newUserId
    deactivate Firestore
end

end

updateUsers --> GroupEditPage : okUsers
deactivate updateUsers

'-----------------------------
' 成功/失敗分岐
'-----------------------------

alt 更新成功 (okGroup && okUsers)
    GroupEditPage -> GroupEditPage : Context(groups)更新
    GroupEditPage -> GroupEditPage : router.back()
    GroupEditPage --> User : 前画面へ戻る
else 更新失敗
    GroupEditPage -> GroupEditPage : alert表示
end

GroupEditPage -> GroupEditPage : loading = false

deactivate GroupEditPage

@enduml