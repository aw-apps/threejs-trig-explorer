# Three.js 三角函數 3D 教學工具

一個以互動式 3D 動畫呈現三角函數（正弦、餘弦、正切）數學原理的網頁教學工具，使用 Three.js 開發，適合學生、教師及對數學有興趣的學習者。

## 專案目標

- 以「單位圓 + 函數曲線」的方式，同步展示 sin / cos / tan 的幾何意義
- 讓使用者透過拖曳、播放、暫停與步進操作，直觀理解角度與函數值的對應
- 提供課堂示範與自學都容易上手的互動體驗

## 技術選型

- HTML5
- CSS3
- JavaScript (ES Modules)
- Three.js（CDN 載入）
- GitHub Pages（靜態部署）

## MVP 功能

1. 3D 單位圓場景（可旋轉、縮放、平移）
2. 角度指示器與半徑向量動畫
3. sin / cos / tan 即時數值顯示
4. 2D 函數曲線面板，與 3D 場景同步
5. 函數顯示切換（sin、cos、tan）

## 在本機執行

這是純前端靜態網站，建議使用本機伺服器開啟：

```bash
python3 -m http.server 8000
```

開啟瀏覽器前往：

```
http://localhost:8000
```

## 測試與驗證

目前以手動驗證為主（MVP）：

1. 開啟 `index.html`
2. 調整角度與播放控制，確認 3D 指示器與數值同步
3. 切換 sin / cos / tan 顯示，確認曲線與數值正確更新
4. 在不同視窗尺寸確認畫面可正常操作

## 部署

- 部署目標：GitHub Pages
- 設定方式：Repository Settings → Pages → Deploy from branch
- 分支/目錄：`main` / `/ (root)`

部署後網址格式：

```
https://aw-apps.github.io/threejs-trig-explorer/
```
