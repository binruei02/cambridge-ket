# KET Garden

A2 Key for Schools 親子原創複習網站，繁體中文介面。程式無需安裝套件。

## 本機啟動

在此資料夾執行：

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

開啟 http://127.0.0.1:4173 。請透過 HTTP 開啟，不要直接雙擊 HTML（瀏覽器會限制 ES modules）。

## 内容

- **雙模式架構**：
  - **模式一：學習複習**：851 張 A2 Key 核心字彙卡、中英搜尋、主題分類、Cambridge Dictionary 官方發音頁直連、分項暖身。
  - **模式二：KET 題型練習**：嚴格比照 Cambridge A2 Key for Schools 官方格式。作答前全英文，交卷後提供英文 Evidence 與繁體中文詳細解析。
    - **Reading and Writing（7 Parts · 32 題）**：Part 1 告示簡訊、Part 2 三文比對配對、Part 3 長文理解、Part 4 選詞克漏字、Part 5 開放式填空（每格一字）、Part 6 引導短 Email（$\ge 25$ 字）、Part 7 連續三圖看圖寫作（$\ge 35$ 字）。
    - **Listening（5 Parts · 25 題）**：每段錄音播放兩次（Play 1 of 2 / Play 2 of 2），支援慢速（0.75x）與逐字稿展開。
    - **Speaking（2 Parts）**：Part 1 考官生活問答、Part 2 情境討論（5 大話題、搭檔提問提示與句型）。
    - **全真模擬試卷**：完整 32 題 Reading & Writing 與 25 題 Listening 連續測驗。
- **錯題筆記與進度**：錯題自動加入，答對自動移出；作答進度以本機 `localStorage` 保存。

題目、提示與解說：`dist/content.mjs`、`dist/exam-content.mjs`。
考試引擎與計分：`dist/exam-engine.mjs`。
作答與本機儲存邏輯：`dist/state.mjs`。
頁面與操作：`dist/app.js`、`dist/index.html`、`dist/styles.css`。

## 驗證

```sh
node --test tests/*.test.mjs
node --check dist/app.js && node --check dist/exam-content.mjs && node --check dist/exam-engine.mjs
```

## 使用說明

所有題目均為原創 A2 程度練習，非 Cambridge 官方題庫或完整模擬考。
所有單字卡都可直接開啟 Cambridge Dictionary 官方發音頁，在 UK 區塊播放英式真人錄音。Cambridge 禁止其他網站直接串流其單字 MP3，因此不在本站內嵌播放。原創聽力與例句使用裝置英文合成語音；不同瀏覽器或裝置的聲音會不同，部分裝置需安裝英文語音或連線才能播放。
作文草稿和學習紀錄儲存於目前瀏覽器的 localStorage，無帳號、無跨裝置同步。清除網站資料會刪除紀錄。無痕模式關閉後通常不會保留。
寫作與口說提供示範、自我檢查及陪練提示，不提供自動文法批改、錄音或官方分數。
本站為私人的 Sites 網站；預設只有擁有者可開啟，未開放公開存取。

官方考試形式：https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/format/
官方備考資源：https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/preparation/
