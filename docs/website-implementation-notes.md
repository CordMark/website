# CordMark Website — トップページ実装メモ(方向B「結び / Weave」)

最終更新: 2026-09-03(背景と縄の描画を作り直し)
状態: トップページのみ新構成へ切り替え済み。About、Service、Contactは旧デザインのまま。

## 選ばれた方向

三方向(A 痕跡 / B 結び / C 余白)を比較し、B「結び / Weave」を採用した。

- 比較: https://claude.ai/code/artifact/8ebb372e-b0b5-4437-82bc-0bc641ee1e90
- 展開案: https://claude.ai/code/artifact/2c7085c9-7235-4ae5-81ab-22d3537b6394

## ファイル構成

```text
app/page.tsx                 新トップページ(Server Component)。Section順は構想書のとおり
app/home/home.css            .wv 配下にScopeした新Token・Section Style。Header/Footerの上書きも含む
app/home/ThreadCanvas.tsx    背景に固定した一枚のCanvas。地の色と、形だけが変わる一本の糸(ばらばら→縄→輪→マーク)、CordMark OSの物語
app/Header.tsx / Footer.tsx  トップページのみ、Headerにマーク(`.brand__mark`、docked後に表示)、Footerに大きなマークを置く
app/home/CordMark.tsx        ブランドのシンボル(原本: cordmark-os/company/context/shared/brand/cordmark-symbol-*.svg のpathをcurrentColorで描画)
app/_legacy/HomeLegacy.tsx   切替前のトップページ。ルーティングされない退避用。不要になれば削除
```

追加した依存はなし(Three.js、GSAPは試した後に削除。動きはすべてCanvas 2Dと自前のScroll計測)。

## 構成の考え方(2026-09-03 背景固定型)

ユーザーの判断は二段階で変わった。まず「Sectionを切り分けるより、Scrollで重なり連続する方が洗練される」、次に「糸が文書と一緒に流れ去るのはおかしい。糸は背景の同じ位置にずっと居て、Scrollとともに結び目になっていく絵」。左右分割ではなく背景。最終的に次の構成にした。

- **一枚の固定Canvas**(`.wv-thread`)がViewport全体を覆い、各Sectionの`data-ground`(night / paper / paper2 / charcoal)を読んで地の色を塗る。境界は26vhのGradientで溶かし、Hero→Purposeだけ70vh(Mobileは38vh)かけて夜から紙へ。中間色は無彩色の灰にならないよう暖色の石色へ寄せる。全面に静止した紙の粒子(overlay 11%)を重ねる。Heroの暖色の光と、CSSのScrim・SCROLLの表示は見出しと一緒にJSで消す(消さないと紙への溶け込みの中に円錐状の明るい帯が出る)。SectionのCSS背景はすべて透明で、文章は糸の上を流れる。
- **糸は「中心線＋その周りを撚る6本」**として描く。中心線に対する法線方向に `sin(撚り位相)` のずれを与え、`cos(撚り位相)` を奥行きとして、全体を薄く一筆で描いた上に手前に来る区間だけを濃く太く重ねる(2 pass)。これで縄の「上下の交差」が出る。Scroll量に応じて中心線の形だけを補間する。A ばらばら(6本が各自漂う) → B 縄(横一本、ゆるい波) → C 輪(CordMark OSの中心) → D マーク(名刺の二重の輪)。
  - A→B: Heroの固定区間(300svh)のScroll量。一斉に編まれるのではなく、右端から柔らかい前線が左へ進み、各strandは `JOIN_DELAY` の順に時間差で巻き込まれる(点ごとの進行度 q で位置をmix)。区間の9割ほどで編み終わり、見出しは後半(0.55〜0.85)で薄くなる。ユーザーの要望「ばらばらから少しずつまとまる。早すぎ・不自然はNG」に対応。
  - B: PurposeとFocusの背後で静止(左側は薄く、右側は濃い)。
  - B→C: 「縄が巻き取られて輪になる」弧のModel。中心線は円弧で、最初は半径が巨大(ほぼ直線)、進むにつれ弧の長さが W→2πR に縮み、開き角が 2π に閉じる。点ごとの線形補間だとY字に折れるので採らない。輪の位置は右列の`.wv-os__stage`の中心。中心には `AI / CONTEXT` のLabel。
  - C: CordMark OSの固定区間(280svh)のScroll量を物語の時間(0〜18秒相当)に写像。人の輪、Questionの往復、朱のHuman Decision。左の5段は`is-active`で追従。
  - C→D: 物語の終盤(14.6〜18秒相当)で二重の輪へ。
  - D→Header: 固定が解けて`.wv-os__stage`が上がり始めると、マークは縮みながら小さな弧を描いてHeaderの「CORDMARK」左へ飛ぶ(`pF`、0.7vh分のScroll)。途中でCanvasの描画を消し、`html[data-wv-mark="docked"]`でHeader内のDOMマーク(`.brand__mark`、原本SVG)を表示する。以降はずっとロゴマークとして残り、Footerでは大きなマークとして再登場する。上へ戻れば解除。ユーザーの指摘「編んだ結果が何にもならず、ただ消える」への答え(2026-09-03、案A)。
  - Origin「縄目は、残る」: 静的なSVGの線をやめ、Section下端に「土器に押しつけられた縄目の帯」をCanvasで描く(`drawImprint`、影＋光の縁の2 passで型押しに見せる)。Scrollに合わせて左から右へ押し当てられていく。帯の右端から一本の銅色の糸がほどけ、右余白を降りてContactの「相談する」ボタン右端に届き、点で止まる(`drawTrail`)。糸は読者がScrollした位置(0.86vh)まで伸びる。Headerのマークから線を引く案Dは「無理がある」で却下し、Originの縄目を起点にした(ユーザー提案、2026-09-03)。
- **Footerは`position: relative; z-index: 1`**にしないと固定Canvasの下に隠れる。
- **固定(pin)はCSSの`position: sticky`だけ**。Scroll Hijackはしない。
- **Header**はCanvasが`html[data-wv-ground]`にdark/lightを書き、地が暗い間だけ透過・生成り文字。Scrollが始まったら(`data-wv-scrolled="1"`)暗い地の上でも半透明の夜色を敷き、本文がNavの下を素通りしないようにする。
- **Mobile(≤880px)と`prefers-reduced-motion`**では固定を解除して縦並び。Reduced Motionでは時間による動きを止め、Scroll時だけ再描画。糸は編まれた状態、物語はHuman Decisionの静止状態。

## 実装上の判断

- **中心の呼び方**: CordMark OS Sectionの中心は「会社を知るAI」。Canvas内のLabelは `AI · CONTEXT`。
- **朱の規則**: 朱(`--wv-vermilion`)はHuman Decisionにだけ使う。中心には現れない。製品Thesisと`decisions/2026-08-29-human-only-core.md`の「最終的なDecisionと責任は人」に対応する視覚規則。
- **3Dをやめた経緯**: 最初はThree.js / React Three Fiberで撚り糸を作ったが、「操作しても結ばれた状態に届きにくい」「展開案(Canvas 2D)の質感の方が好み」「3Dっぽくない方がよい」でCanvas 2Dへ。次に「Sectionの切り分けをやめて連続させたい」で一枚Canvasへ。
- **Metadata**: `app/layout.tsx`のtitle/descriptionを新メッセージへ。OG画像(`public/og.png`)は旧デザインのまま。要更新。

## 会社Contextとの整合

- 導入・検証の数字は出していない。`STATUS · 開発・検証中`のみ。
- 秘書 / 共有の秘書 / 参謀は製品Thesisの長期構想として、機能の約束にならない書き方にしている。
- Laplace、DotCraftはTwo Horizonsで「Lifeの探索」として接続。

## ブランド素材

- 名刺裏面のマーク(二重の縄の輪)とタグライン「AIネイティブな社会の、その先へ。/ Marking a more human future」を採用。
- `app/home/CordMark.tsx`は原本のpathを使用(2026-09-03差し替え済み)。viewBoxは横長(204×133)なので幅で指定し高さはauto。

## 残作業

- ユーザーによる実機での見た目確認(背景の糸の濃さ、文章との重なり、輪→マークの変形、Mobile)
- About、Service、Contactページの世界観の統一
- OG画像の更新
- `app/_legacy/HomeLegacy.tsx`の削除時期
