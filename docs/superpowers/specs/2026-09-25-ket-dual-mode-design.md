# KET Garden 雙模式改版設計

日期：2026-09-25

## 目標

KET Garden 將清楚分成「學習複習」與「KET 題型練習」兩種模式。學習複習可使用繁體中文協助理解；KET 題型練習的文章、題幹、作答欄與選項全部使用英文，題目結構比照 Cambridge A2 Key for Schools 公布的考試形式。

本站題目維持原創，不複製 Cambridge 正式試題。網站會提供 Cambridge 官方數位樣題、手冊與聽力錄音入口，讓學習者熟悉真正的考試介面與錄音。

## 官方格式基準

以 Cambridge English 官方的 A2 Key for Schools exam format 與 preparation 頁面為準：

- Reading and Writing：60 分鐘、7 Parts、32 Questions。
- Listening：約 30 分鐘、5 Parts、25 Questions，每段錄音播放兩次。
- Speaking：2 Parts，兩位考生通常約 8–10 分鐘。
- Reading and Writing Parts 1–5 為閱讀；Parts 6–7 為寫作。
- 正式作答內容不出現中文翻譯或中文選項。

參考來源：

- https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/format/
- https://www.cambridgeenglish.org/exams-and-tests/qualifications/key/preparation/
- https://www.cambridgeenglish.org/Images/168174-cambridge-english-key-for-schools-handbook-for-teachers.pdf

## 模式一：學習複習

此模式用於理解與記憶，不冒充正式考試。

- 保留至少 500 字，目前維持 851 個 A2 Key 核心詞彙。
- 單字卡顯示英文、繁體中文意思、主題與可用的 UK 音標。
- 發音按鈕開啟 Cambridge Dictionary 官方發音頁。
- 可用英文或中文搜尋，並按生活主題篩選。
- 可提供中文提示、中文解釋與學習建議。
- 不再把英翻中選擇題稱為 KET 模擬題或計入 KET 模擬成績。

## 模式二：KET 題型練習

### Reading and Writing

練習頁按官方七個 Parts 組織：

1. Part 1：六個短告示、訊息或標誌，各配一題三選一主旨理解。
2. Part 2：七個人物需求與三篇同主題短文進行配對。
3. Part 3：一篇較長文章配五題三選一細節與主旨理解。
4. Part 4：一篇事實性短文設六個缺字，從三個英文詞彙中選出正確答案。
5. Part 5：Email 或 Email 往返內容設六個缺字，每格輸入一個英文單字。
6. Part 6：根據三個提示點寫一封至少 25 字的 Email 或短訊息。
7. Part 7：根據三幅連續圖片寫至少 35 字的故事。

851 個單字主要用於單字卡、Part 4 選字題、閱讀文章及寫作提示。題庫只收錄具有自然英文上下文、合理干擾選項且通過內容檢查的題目，不以大量自動英翻中題目充數。

### Listening

練習頁按官方五個 Parts 組織：

1. Part 1：五段短對話，各選一張正確圖片。
2. Part 2：一段獨白配五格筆記填空。
3. Part 3：一段對話配五題三選一。
4. Part 4：五段短錄音，各回答主旨、訊息或話題三選一。
5. Part 5：一段對話配五組資訊配對。

原創聽力必須標示為練習用合成英語語音，不宣稱是 Cambridge 真人錄音。播放器提供一般速度、重播兩次與停止控制。Cambridge 官方樣題錄音維持獨立入口，並連到相符的官方題本或數位樣題。

### Speaking

1. Part 1：模擬考官的個人資料與日常生活問答，建議作答 3–4 分鐘。
2. Part 2：呈現同一情境中的選項，練習表達喜好、理由、同意或不同意，並提示向搭檔提問，建議作答 5–6 分鐘。

中文只放在練習說明、陪練提醒或完成後回饋，不直接翻譯正在作答的問題。

## 導航與操作

首頁提供兩個清楚入口：

- 「學習複習」：單字卡、中文解釋與基礎技能暖身。
- 「KET 題型練習」：按 Reading and Writing、Listening、Speaking 及各 Part 進入。

每個 Part 可單獨練習。另提供完整模擬入口，依正式題數與順序組成回合。考前連續練習仍可選 5、10、20 題，但只抽取符合正式題型的客觀題。

## 語言與回饋規則

- 正式題型中的文章、題幹、選項、輸入提示與作答按鈕使用英文。
- 送出前不顯示中文翻譯。
- 送出後先顯示英文證據或關鍵線索，再顯示可展開的繁體中文解析。
- 錯題筆記保存題型、Part、作答結果與解析。
- 模擬成績只計算符合官方題型的題目，並明確標示為本站練習結果，不換算成官方 Cambridge English Scale 分數。

## 內容與版權界線

- 題目、圖片、短文與逐字稿均為本站原創。
- 只引用 Cambridge 公開頁面的格式說明與提供官方資源連結。
- 不重製或重新發布 Cambridge 正式題目、圖片、答案、錄音或完整逐字稿。
- 官方樣題與自製練習在介面上清楚分開。

## 技術結構

- 將考試 Parts 定義成獨立資料集合，題目記錄 `paper`、`part`、`format`、`instructions` 與評分方式。
- 客觀題共用作答、即時回饋、錯題保存與進度元件。
- Part 2 配對、Part 5 單字輸入、Listening 筆記填空與配對使用各自的作答元件。
- 寫作保留草稿、字數計算與自我檢查，不產生假造的官方分數。
- 舊版 localStorage 資料以相容方式讀取；找不到的舊題目不顯示在錯題清單。

## 驗證標準

- KET 題型練習中不出現中文答案選項。
- Reading and Writing 七 Parts、Listening 五 Parts、Speaking 二 Parts 均可進入並正確顯示官方相同的作答形式。
- Part 4 所有答案與干擾選項均為英文，且放在自然上下文中。
- 完整模擬依正式順序呈現 32 題 Reading and Writing 與 25 題 Listening；寫作題另依最低字數檢查。
- 每段原創聽力可重播，官方錄音入口可開啟。
- 單字卡仍提供 851 字、中文搜尋及 Cambridge 發音頁。
- 鍵盤、螢幕閱讀器與手機版可完成主要流程。
- 自動測試涵蓋題型結構、語言界線、答案有效性、儲存相容性與題數；再以瀏覽器檢查一輪完整作答流程。

