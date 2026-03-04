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
cd threejs-trig-explorer
python3 -m http.server 8000
```

開啟瀏覽器前往：

```
http://localhost:8000
```

## 使用方式

1. 點擊 **Play / Pause / Step +15°** 控制角度動畫。
2. 拖曳 3D 場景（左鍵旋轉、右鍵平移、滾輪縮放）。
3. 使用 `Angle` 滑桿或輸入框調整角度，觀察 3D 指示器、數值面板與 2D 曲線同步變化。
4. 切換 sin / cos / tan 顯示開關，確認對應曲線顯示/隱藏。

## 驗證清單（Issue #3）

- [ ] 在瀏覽器 dev tools 測試桌機/平板寬度（例如 1366px、1024px、768px），版面仍可操作且資訊清楚。
- [ ] 在角度輸入框輸入非法值（空值、非數字、Infinity），可看到明確錯誤訊息，且不會默默失敗。
- [ ] 角度控制、播放控制、sin/cos/tan 切換與 2D/3D 同步行為正常。
- [ ] 專案可直接由 root 靜態檔部署到 GitHub Pages。

## 部署

- 部署目標：GitHub Pages
- 設定方式：Repository Settings → Pages → Deploy from branch
- 分支/目錄：`main` / `/ (root)`
- `index.html` 位於 repository root，並直接引用 `styles/` 與 `src/` 靜態資源，符合 Pages root 部署模式。

部署後網址格式：

```
https://aw-apps.github.io/threejs-trig-explorer/
```
