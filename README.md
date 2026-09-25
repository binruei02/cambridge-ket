# KET Garden

A2 Key for Schools 親子原創複習網站，繁體中文介面。程式無需安裝套件。

## 本機啟動

在此資料夾執行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

開啟 http://127.0.0.1:4173 。請透過 HTTP 開啟，不要直接雙擊 HTML（瀏覽器會限制 ES modules）。

## 内容

- 851 張 A2 Key 核心字彙卡、15 個生活主題與 851 題單字小測驗
- 中英文搜尋、每頁 24 字與不限次數連續練習
- 12 題閱讀、10 題合成語音聽力
- 4 個寫作任務、8 個親子口說話題
- 每日 8 題混合練習、錯題重練、最近 7 天紀錄

題目、提示與解說：`dist/content.mjs`。
作答與本機儲存邏輯：`dist/state.mjs`。
頁面與操作：`dist/app.js`、`dist/index.html`、`dist/styles.css`。

## 驗證

```sh
node --test tests/*.test.mjs
node --check dist/app.js
```

## 使用說明

所有題目均為原創 A2 程度練習，非 Cambridge 官方題庫或完整模擬考。
所有單字卡都可直接開啟 Cambridge Dictionary 官方發音頁，在 UK 區塊播放英式真人錄音。Cambridge 禁止其他網站直接串流其單字 MP3，因此不在本站內嵌播放。原創聽力與例句使用裝置英文合成語音；不同瀏覽器或裝置的聲音會不同，部分裝置需安裝英文語音或連線才能播放。
作文草稿和學習紀錄儲存於目前瀏覽器的 localStorage，無帳號、無跨裝置同步。清除網站資料會刪除紀錄。無痕模式關閉後通常不會保留。
寫作與口說提供示範、自我檢查及陪練提示，不提供自動文法批改、錄音或官方分數。
本站為私人的 Sites 網站；預設只有擁有者可開啟，未開放公開存取。

官方考試形式：https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/format/
官方備考資源：https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/preparation/
