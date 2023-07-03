# 公司出勤打卡系統
![](https://imgur.com/OF2KrcZ.png)

## 功能介紹
* 使用者可以登入
* 使用者可以登出
* 使用者能編輯自己的password
* 使用者可以打卡
* 使用者可以查看出缺勤狀況
* 管理者可以在登入後點擊「後台」導向後台頁面
* 管理者可以瀏覽所有的使用者清單
* 管理者可以編輯使用者出缺勤狀態


## 前置作業
1. 安裝 node.js 與 npm
2. 將專案 clone 到本地
3. 透過終端機進入資料夾，輸入：
```
npm install -y
```

4. 設定環境變數連線 MongoDB
```
JWT_SECRET=xxxxxxxx
```
5. 輸入以下程式碼以啟動專案：
npm run start
6. 若看見此行訊息則代表順利運行，打開瀏覽器進入到以下網址
Example app listening on port 3000!
7. 欲停止伺服器請輸入：
ctrl + c

## 功能使用
![](https://imgur.com/QHzc3ue.png)
* 點擊中間上下班打卡按鈕，即可進行打卡功能，並且在下方列表出現打卡記錄
* 後台管理員點擊右上方Admin按鈕可以導入後台
* 點擊右上方Profile按鈕可以查看使用者個人資料
* 點擊右上方Logout可以登出
* 點擊左上方公司出勤打卡系統可以導回首頁


## 開發工具
* Node.js 16.12.0
* Express 4.17.1
* Express-Handlebars 5.0.2
* Express-Session 1.17.2
* jsonwebtoken 8.5.1
* passport 0.4.1
* Bootstrap 5.1.1
* mysql2 2.3.0
* sequelize 6.6.5