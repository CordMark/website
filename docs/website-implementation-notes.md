# CordMark Website — トップページ実装メモ(方向B「結び / Weave」)

最終更新: 2026-09-04 夜(Company OS Sectionを近未来のAIコア表現へ作り直し、アニメーション先行の構成へ)
状態: トップページのみ新構成へ切り替え済み。About、Service、Contactは旧デザインのまま。

## 選ばれた方向

三方向(A 痕跡 / B 結び / C 余白)を比較し、B「結び / Weave」を採用した。

- 比較: https://claude.ai/code/artifact/8ebb372e-b0b5-4437-82bc-0bc641ee1e90
- 展開案: https://claude.ai/code/artifact/2c7085c9-7235-4ae5-81ab-22d3537b6394

## ファイル構成

```text
app/page.tsx                 新トップページ(Server Component)。Section順は構想書のとおり
app/home/home.css            .wv 配下にScopeした新Token・Section Style。Header/Footerの上書きも含む
app/home/HeroCord.tsx        Hero専用のCanvas 2D。糸だけを扱う(ばらばら→縄→マーク→消える)
app/home/CompanyOsCanvas.tsx Company OS Sectionの全画面3D Sceneの入れ物。能力判定と遅延読込、DOMとの同期
app/home/three/companyOsScene.ts  Three.jsのScene本体(Reactの外)。Scroll進行度で九つの幕を進める
app/home/GroundWatch.tsx     地の色がCSSになったので、Headerが読む html[data-wv-*] を書く役だけを残した
app/_legacy/ThreadCanvas.tsx 旧・背景固定の一枚Canvas(退避)
app/beyond/page.tsx          Phase 2のページ(Laplace、DotCraft)。固定Canvasは使わず、`.wv-page` でHeaderと地の色をCSSで揃える
app/Header.tsx / Footer.tsx  Headerにマーク(`.brand__mark`、docked後に表示)、Footerに大きなマークを置く
app/home/CordMark.tsx        ブランドのシンボル(原本: cordmark-os/company/context/shared/brand/cordmark-symbol-*.svg のpathをcurrentColorで描画)
app/_legacy/HomeLegacy.tsx   切替前のトップページ。ルーティングされない退避用。不要になれば削除
```

依存は `three` の完全固定(0.185.1)のみ。GSAP、Lenis、React Three Fiber、dreiは入れない。
- R3Fを採らなかった理由: 作るのはComponent Treeではなく一本のTimelineで、宣言的なScene合成の利点が効かない。加えて `@react-three/fiber@9` のpeerが `react: ">=19 <19.3"` で、3DのためにReact本体のUpgrade経路を人質に取ることになる。
- Three.jsは `app/home/CompanyOsCanvas.tsx`(Client)の `useEffect` 内で `await import()` する。Server Componentで `next/dynamic` の `ssr: false` は使えない(Next 16でBuildが落ちる)。この形なら初期JSは1バイトも増えず、three(gzip前 約540KB)は遅延Chunkに入る。

## 構成の考え方(2026-09-03 背景固定型)

ユーザーの判断は二段階で変わった。まず「Sectionを切り分けるより、Scrollで重なり連続する方が洗練される」、次に「糸が文書と一緒に流れ去るのはおかしい。糸は背景の同じ位置にずっと居て、Scrollとともに結び目になっていく絵」。左右分割ではなく背景。最終的に次の構成にした。

- **一枚の固定Canvas**(`.wv-thread`)がViewport全体を覆い、各Sectionの`data-ground`(night / paper / paper2 / charcoal)を読んで地の色を塗る。境界は26vhのGradientで溶かし、Hero→Purposeだけ42vh(Mobileは30vh)かけて夜から紙へ。中間色は無彩色の灰にならないよう暖色の石色へ寄せる。全面に静止した紙の粒子(overlay 11%)を重ねる。Heroの暖色の光と、CSSのScrim・SCROLLの表示は見出しと一緒にJSで消す(消さないと紙への溶け込みの中に円錐状の明るい帯が出る)。SectionのCSS背景はすべて透明で、文章は糸の上を流れる。
- **糸は「中心線＋その周りを撚る6本」**として描く。中心線に対する法線方向に `sin(撚り位相)` のずれを与え、`cos(撚り位相)` を奥行きとして、全体を薄く一筆で描いた上に手前に来る区間だけを濃く太く重ねる(2 pass)。これで縄の「上下の交差」が出る。Scroll量に応じて中心線の形だけを補間する。A ばらばら(6本が各自漂う) → B 縄(横一本、ゆるい波) → C 輪(CordMark OSの中心) → D マーク(名刺の二重の輪)。
  - A→B: Heroの固定区間(260svh)のScroll量。一斉に編まれるのではなく、右端から柔らかい前線が左へ進み、各strandは `JOIN_DELAY` の順に時間差で巻き込まれる(点ごとの進行度 q で位置をmix)。区間の9割ほどで編み終わり、見出しは後半(0.55〜0.85)で薄くなる。ユーザーの要望「ばらばらから少しずつまとまる。早すぎ・不自然はNG」に対応。
  - B: Purposeの背後で静止(左側は薄く、右側は濃い)。
  - B→C: 「縄が巻き取られて輪になる」弧のModel。中心線は円弧で、最初は半径が巨大(ほぼ直線)、進むにつれ弧の長さが W→2πR に縮み、開き角が 2π に閉じる。点ごとの線形補間だとY字に折れるので採らない。輪の位置は右列の`.wv-os__stage`の中心。中心には `AI / CONTEXT` のLabel。
  - C: CordMark OSの固定区間(280svh)のScroll量を物語の時間(0〜18秒相当)に写像。人の輪、Questionの往復、朱のHuman Decision。左の5段は`is-active`で追従。
  - C→D: 物語の終盤(14.6〜18秒相当)で二重の輪へ。
  - D→Header: 固定が解けて`.wv-os__stage`が上がり始めると、マークは縮みながら小さな弧を描いてHeaderの「CORDMARK」左へ飛ぶ(`pF`、0.7vh分のScroll)。途中でCanvasの描画を消し、`html[data-wv-mark="docked"]`でHeader内のDOMマーク(`.brand__mark`、原本SVG)を表示する。以降はずっとロゴマークとして残り、Footerでは大きなマークとして再登場する。上へ戻れば解除。ユーザーの指摘「編んだ結果が何にもならず、ただ消える」への答え(2026-09-03、案A)。
  - Origin「縄目は、残る」: 静的なSVGの線をやめ、Section下端に「土器に押しつけられた縄目の帯」をCanvasで描く(`drawImprint`、影＋光の縁の2 passで型押しに見せる)。Scrollに合わせて左から右へ押し当てられていく。帯の右端から一本の銅色の糸がほどけ、右余白を降りてContactの「相談する」ボタン右端に届き、点で止まる(`drawTrail`)。糸は読者がScrollした位置(0.86vh)まで伸びる。Headerのマークから線を引く案Dは「無理がある」で却下し、Originの縄目を起点にした(ユーザー提案、2026-09-03)。
- **Footerは`position: relative; z-index: 1`**にしないと固定Canvasの下に隠れる。
- **固定(pin)はCSSの`position: sticky`だけ**。Scroll Hijackはしない。
- **Header**はCanvasが`html[data-wv-ground]`にdark/lightを書き、地が暗い間だけ透過・生成り文字。Scrollが始まったら(`data-wv-scrolled="1"`)暗い地の上でも半透明の夜色を敷き、本文がNavの下を素通りしないようにする。
- **Mobile(≤880px)と`prefers-reduced-motion`**では固定を解除して縦並び。Reduced Motionでは時間による動きを止め、Scroll時だけ再描画。糸は編まれた状態、物語はHuman Decisionの静止状態。

## 二つのOSの呼び分け(2026-09-04)

ユーザーの指示: **売っているProductは Company OS**、**CordMark OS は自社運営のための社内OSで、販売しない**。

- サイトの中心Section(`#company-os`)は Company OS。実装者のQuestion → Human Decision → 開発可能な仕様 → 開発再開、という流れは Company OS の First MVP。
- `#cordmark-os` は別Sectionにして、「Company OSが目指す姿を自社の会社運営で先に実践している社内OS」として書く。販売Productとして並べない。
- Header、Footer、metadata、`/beyond` のPhase 1の具体物もすべて Company OS。
- **未解決**: `cordmark-os` Repository側の文書は、2026-09-01のcommit `c1f5e15`(Rename Company OS to CordMark OS)以降、**売り物のほうを「CordMark OS」「市場向けCordMark OS」と呼んでいる**(`company/projects/company-os/README.md` の `name: CordMark OS`、`docs/product-spec/README.md`)。サイトはユーザーの最新の指示に従っているので、現状サイトとRepositoryの呼称が逆。どちらかへ揃える必要がある。

## 実装上の判断

- **中心の呼び方**: Company OS Sectionの中心は「会社を知るAI」。3Dには文字を描かない(役職名はDOMのLabel)。
- **朱の規則**: 朱(`--wv-vermilion`)はHuman Decisionにだけ使う。中心には現れない。製品Thesisと`decisions/2026-08-29-human-only-core.md`の「最終的なDecisionと責任は人」に対応する視覚規則。
- **3Dをやめた経緯**: 最初はThree.js / React Three Fiberで撚り糸を作ったが、「操作しても結ばれた状態に届きにくい」「展開案(Canvas 2D)の質感の方が好み」「3Dっぽくない方がよい」でCanvas 2Dへ。次に「Sectionの切り分けをやめて連続させたい」で一枚Canvasへ。
- **Metadata**: `app/layout.tsx`のtitle/descriptionを新メッセージへ。OG画像(`public/og.png`)は旧デザインのまま。要更新。

## 時代の二つの段階(2026-09-03 追加)

ユーザーの整理: 軸は「Work / Life」ではなく「時代の段階」。Phase 1 = AIを社会に適用する(CordMark OS、支援、受託)。Phase 2 = AIが行き渡った先の人の生き方を模索する(Laplace、DotCraft)。どちらにもWorkもLifeもあり、順序はあるが並走している。いまはPhase 1に重心。
- トップの Current Focus Section は 2026-09-03 夜に削除(末尾の Two Phases とほぼ同じ役割で冗長だった)。Purpose の直後に CordMark OS が来る。二つの段階は末尾の Two Phases(`.wv-horizon`)だけで示し、Phase 2側は `/beyond` へ送る。
- `/beyond` は中間トップ(a16b5bd)のLaplace / DotCraft Sectionを新パレットで組み直したもの。盤面画像と `.craft` の素材はそのまま使う。Headerのナビに「Phase 2」を追加。
- ラベルは英字の PHASE 1 / PHASE 2。日本語の固定名は付けない。
- **文言の規則(2026-09-03 夜)**: 「順序はあるが並走している」ことを文章で説明しない。「同時に進めている」「すでに動いている」「NOW · IN PARALLEL」のような、時系列を弁明する語は使わない。二つの段階は事実として並べるだけにし、並走は両方に具体物(CordMark OS / Laplace、DotCraft)があることで伝える。副Labelは AI-NATIVE / BEYOND。二つの段階の言い方は「社会をAIネイティブに。その先の、人の営みを考える。」に統一(Two Phasesの見出し、/beyondのCardも同じ語彙)。「AI」の語が連続しないよう、Phase 1のCardは「意思と実行を、つなぐ」、Phase 2は「人に残る営みを、形にする」と別の角度で言い直す。Current Focus は削除し、Two Phases が全体を見渡す締めになる。
- Two Phases の Card(`.wv-horizon`)は Hover で上辺に撚り糸の帯(`::before`、repeating-linear-gradient を scaleX で左から渡し、その後ゆっくり撚りが流れる)、6px の浮き、暖色の影、隣の Card は opacity 0.6(`:has`)。Reduced Motion では動きなし。
- 本文に `palt` を掛けない(見出しのみ)。本文は `.wv-lead` 0.03em、小段落 0.02〜0.04em の字間。

## 会社Contextとの整合

- 導入・検証の数字は出していない。`STATUS · 開発・検証中`のみ。
- 秘書 / 共有の秘書 / 参謀は製品Thesisの長期構想として、機能の約束にならない書き方にしている。
- Laplace、DotCraftはPhase 2の探索として `/beyond` に接続。

## ブランド素材

- 名刺裏面のマーク(二重の縄の輪)とタグライン「AIネイティブな社会の、その先へ。/ Marking a more human future」を採用。
- `app/home/CordMark.tsx`は原本のpathを使用(2026-09-03差し替え済み)。viewBoxは横長(204×133)なので幅で指定し高さはauto。

## 残作業

- ユーザーによる実機での見た目確認(背景の糸の濃さ、文章との重なり、輪→マークの変形、Mobile)
- About、Service、Contactページの世界観の統一
- OG画像の更新
- `app/_legacy/HomeLegacy.tsx`の削除時期
