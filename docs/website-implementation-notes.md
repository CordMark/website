# CordMark Website — トップページ実装メモ(方向B「結び / Weave」)

最終更新: 2026-09-04 深夜(Company OS Sectionを「何を約束するか」から組み直し。糸の球のコア、役割ごとの六つの幕、役職のそばの一行)
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
app/home/three/companyOsScene.ts  Three.jsのScene本体(Reactの外)。Scroll進行度で幕を進める(全景→ANSWER→ASK→DECIDE→ACT→VISIBILITY→AI-NATIVE)
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

## Company OS Section(2026-09-04 夜、組み直し)

商談資料(IC様向け「Company OS共同検証のご提案」)とcompany-osのThesisを読み直し、Sectionを「Productの構造」ではなく「約束」から組み直した。ユーザーの指示: 「中心にあるのはAI」は押さない。AIネイティブカンパニーは押す(使うほど全員がAIを使え、会社がAIネイティブに生まれ変わる。AI導入で業務を楽に、の一段先)。案の資料: https://claude.ai/code/artifact/56dda5f5-be5b-44b3-b99c-fe437d9bf00b

- **見出し**は資料の表紙と同じ「現場を止めない。重要な判断を、見失わない。」。副文で「なぜ今か」(作業はAIに置き換わる、エンジニアリングだけでなくあらゆる業務で。その先で詰まるのは問いと判断が人の間を渡る時間)。
- **左の段**は機構(検知・整理・振分・判断・反映)をやめ、資料p.5の「一つの仕様変更」を役割ごとの六つの幕にした: 01 ANSWER(営業がAIに聞く) / 02 ASK(エンジニアの問いが背景付きでPMへ) / 03 DECIDE(PMが決められず経緯ごと事業責任者へ、朱) / 04 ACT(決定がエンジニアの仕事に戻る) / 05 VISIBILITY(経営には重要判断だけ) / 06 AI-NATIVE(全員がAIを学ぶ必要はない。会社がAIネイティブに生まれ変わる)。`STEP_AT = [0.34, 0.46, 0.58, 0.70, 0.80, 0.90]`。
- **役職のそばの一行**(`.wv-os__say`、`SAYS` in CompanyOsCanvas.tsx): 幕ごとに、人の言葉を「 」で括った白(決定は朱)、その下にAIの返答を `COMPANY OS` の小さな札付きで青緑。役職名は点に付いているので一行では繰り返さない(2026-09-04 深夜、「白と青の関係を分かりやすく」「経営表記が二つ被る」の指摘)。役職名は球の後ろの人は点の上、手前に来た人は点の下。DOMで描き、点の右(窓からはみ出すなら点の下に中央揃え)、コアより上の点なら上に出す。チャットUIの模型は出さない(まだ無い画面を約束しない)。
- **構成(2026-09-04 深夜、作り直し)**: ユーザーの指摘「左の一覧のせいで場面が狭い」「球の後ろの紺の円盤が謎」「AIがずっと主役である必要はない。エンジニアの問いがどう人を渡るかが見えればいい」「役職は四つに。発言する人が手前に来るように位置を動的に変える」を受けて作り直した。Sceneは全画面、幕の文章(`.wv-os__steps li`)は画面左上に一つずつ(`[data-os-scene="on"]`でgrid-areaを重ねて`is-active`だけ表示)。円盤と紺の地は削除し、地は夜色の静かなVignette。
  - **役職は四つ**: エンジニア / PM / 経営 / 営業(事業責任者は削除。日常の決定はPM、経営は知らされる側)。`R_NODE = 3.8`の輪に90°間隔で並ぶ。
  - **輪が回る**(`FRONT` in companyOsScene.ts: [p, 手前に向ける方位])。発言する人が手前・画面下に大きく来て、四人は常に全員見える。全景と最後は45°(四人が対角線上、誰も球の後ろや見出しの下に隠れない)。ANSWER=営業、ASK=エンジニア、DECIDE=PM(AIが営業の知る顧客の事情を集めてPMに添え、PMが決める。朱はPM。経営には通知だけが薄く届く)、ACT=エンジニア、VISIBILITY=経営(「重要な判断が、現場の状況ごと届く」。エンジニアの生の懸念「Bだと納期は厳しいかも」が球を経て決定と一緒に経営へ。「できています」の裏の問題を手遅れ前に知る、が経営のニーズ。「重要判断だけ」という選別の言い方はやめた。2026-09-04 深夜の指摘)。2026-09-04 深夜、「経営が決定をもらってしまっている。PMが情報収集して決め、経営には通知、重要判断だけ上がる」の指摘で修正。
  - **画面の使い方(2026-09-04 深夜)**: 左上の文章は幅36em・見出し26〜42px・本文15px。左下に幕の索引(`.wv-os__index`、01 ANSWER〜06 AI-NATIVE、現在地が青緑/朱で光る。`is-active`は`.wv-os__steps li`と一緒に切り替える)。輪はカメラ el 22で縦に広げ、手前の人が画面の下1/4まで使う。一行は輪から`30 + 26*s`px離す。**画面幅の対応(2026-09-05)**: 1920/1440/1366/1280は共通。1200px以下は左上の文章を24em、1100px以下は20emにし、一行(`.wv-os__say`)は折り返し可(max-width 15em)、拡大率の上限1.15。Sceneは`narrow`(1200→800pxで0→1)でカメラ距離+18%、右への寄せ−55%。881px以下(固定なし)は一覧を縦積み(タグ行/見出し/本文、左に細い罫)、Sceneのブロックは`clamp(300px, 52svh, 560px)`、一覧が紙への溶け込みに掛からないよう下余白を`clamp(160px, 30vh, 320px)`。確認済み: 1920×1080、1440×900、1366×768、1280×800、1024×768、834×1194、390×844。
  - **締め(06 AI-NATIVE、2026-09-04 深夜)**: 左上の字幕ではなく、最初の全景と同じ中央の見出しにした(`.wv-os__closing`)。p 0.90からSceneがフェードアウト(`FADE_FROM`、Canvas hostのopacity)、0.935から`data-os-phase="closing"`で中央に「会社が、AIネイティブに生まれ変わる。」と本文。固定表示では06の字幕(`.wv-os__steps li:last-child`)は出さない(索引の06だけ光る)。静的表示(Mobile/Reduced Motion)では一覧の06として読める。
  - **カメラはほぼ固定**(`SHOTS`: el 18〜26、dist 10前後、見出しを避けて右へ`sx`だけ寄せる)。物語は輪の回転で語る。
  - 糸の球は`CORE_SCALE = 0.6`で小さく(人と経路が主役、球は共有物)。幕の間は関係する人だけ明るく残し、他は沈める(`focus`/`recede`、DOMの役職名も薄くなる)。使われている経路の線は全体が明るくなる。
  - 役職名と一行はカメラに近いほど大きい(depthで9.5/depthを掛ける)。役職名は輪の上(`8 + 26*s`px)。一行の置き場所は右→左→下→上の順に試し、見出し・窓の端・糸の球(半径`R_THREAD+0.06`を画面に投影)に当たらない最初の場所。どこにも置けなければ出さない。
- **コアは「糸の球」**: 大円をわずかに崩した閉曲線を30〜62本(quality別)、TubeGeometryで作って一つに結合し、頂点シェーダで各自の軸に回す(`aAxis`, `aInfo`=速度と色)。手前ほど明るく白を帯び、奥は芯に沈む。芯は柔らかい光の球(depthWriteあり)＋Spriteの発光。二重の骨組み・赤道の輪・八面体は廃止。役職は小さな点＋灯る時だけ輪(灯ると2倍まで大きく)。朱は人の決定にだけ。
- **切ったもの**: STATUS行、CordMark OS Section(`#cordmark-os`)、秘書/共有の秘書/参謀の紙Section、「中心にあるのはAI。階層ではない。」。CSSも削除済み。
- 全景ではカメラの注視点を球の下(target y -0.95)に置き、球が画面上半分、見出しが下に来る。

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

- 導入・検証の数字は出していない。STATUS行も2026-09-04に削除(読者に要らない情報)。
- 秘書 / 共有の秘書 / 参謀の三行はトップから外した。Productページを作る時の材料。
- Laplace、DotCraftはPhase 2の探索として `/beyond` に接続。

## ブランド素材

- 名刺裏面のマーク(二重の縄の輪)とタグライン「AIネイティブな社会の、その先へ。/ Marking a more human future」を採用。
- `app/home/CordMark.tsx`は原本のpathを使用(2026-09-03差し替え済み)。viewBoxは横長(204×133)なので幅で指定し高さはauto。

## 残作業

- ユーザーによる実機での見た目確認(背景の糸の濃さ、文章との重なり、輪→マークの変形、Mobile)
- About、Service、Contactページの世界観の統一
- OG画像の更新
- `app/_legacy/HomeLegacy.tsx`の削除時期
