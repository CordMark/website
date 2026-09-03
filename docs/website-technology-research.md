# CordMark Website — Creative Technology Research

調査日: 2026-09-03
状態: 技術調査 / 実装前
対象: CordMark Websiteのリデザイン

## 結論の要約

「`.jsみたいなもの」は、おそらく **Three.js** のことです。Three.jsは、Webブラウザの中でリアルタイム3DやShader表現を動かすための代表的なJavaScriptライブラリです。

現在の先端的なブランドサイトは、一つのライブラリだけで作られているわけではありません。主に次の役割を組み合わせています。

```text
Next.js / React        ページ、情報、導線、SEO
CSS / SVG              Typography、Layout、軽い動き
GSAP                   物語の時間軸、Scroll演出、文字の動き
Lenis                  ScrollとDOM・3D描画の同期
Three.js               3D、光、粒子、Shader、空間表現
React Three Fiber      Three.jsをReactの中で扱う
Blender / Spline       3D素材やSceneの制作
Rive                   状態を持つ2D Vector Animation
```

重要なのは、全部を使うことではありません。優れたサイトほど、「そのブランドを一つの動きで覚えてもらう」ために、技術を限定して使っています。

CordMarkに対する現時点の第一候補は次です。

1. 現在のNext.js / React構成を維持する
2. Narrative全体の演出にGSAPを使う
3. 必要な場合だけ、Heroに一つのThree.js表現を置く
4. Three.jsを使うならReact Three Fiberで既存構成へ統合する
5. WebGPUは本番の前提にせず、研究的なPrototypeに留める
6. LenisはScrollと3Dの同期が必要になった時点で追加する

## 「イケているサイト」を技術以外の面から分解する

### 1. 一つの強いVisual Ideaがある

3D、粒子、横Scroll、Kinetic Typographyを大量に並べるのではなく、一つのVisual Metaphorがページ全体を支えています。

例:

- 光を扱う会社なら、光の挙動そのものをNavigationにする
- 自動車なら、Scrollを走行やTelemetryに変える
- 劇場をConceptにするなら、閲覧者が劇場を探索する
- CordMarkなら、縄目、意思の接続、Decisionの蓄積を一つの体験にする

### 2. 3Dと通常のWebページを分けて考えている

優れた3Dサイトでも、本文、Navigation、Case Study、Contact Formまで3Dにするとは限りません。

3Dは存在感や世界観を担当し、文章と操作はHTML / CSSのDOMが担当します。これにより、読みやすさ、Accessibility、SEO、Mobile Performanceを保てます。

### 3. Motionが情報の順序をつくっている

Scroll Animationの役割は、画面を派手にすることではありません。

- 何から読むか
- 何と何がつながっているか
- どの変化が原因で、何が結果なのか
- どこで立ち止まるか

を時間として設計します。

### 4. PerformanceもDesignの一部になっている

先端的な3D Case Studyでは、KTX2 Texture、GPU Instancing、Shader Preload、Web Worker、端末に応じた品質調整などが使われています。

「重いが美しい」ではなく、「触れた瞬間に反応すること」まで含めて完成度と捉えています。

## 注目する実例

### Chillbase — WebGPU / TSL / Compute Shader

- URL: https://chillbase.net
- Case Study: https://chipsa.design/publications/kak-webgl-pomogaet-chipsa-sozdavat-kreativnye-3d-saity
- 技術: WebGPU、Three.js Shading Language、Compute Shader
- 表現: 数万のParticleが物理的に動き、Cursorに反応し、形を変え、Logoへ集合する
- 学び: WebGPUは単に描画を綺麗にする技術ではなく、多数の要素が生き物のように反応する体験に使われている
- CordMarkへの応用: 分散したSignalが人の意思を中心に集まり、DecisionやActionへ形を変える表現

### Timeless — Three.jsを「光の言語」として使う

- URL: https://timeless.club
- Case Study: https://chipsa.design/publications/kak-webgl-pomogaet-chipsa-sozdavat-kreativnye-3d-saity
- 技術: Three.js、Custom Shader、GPU Instancing、KTX2 Texture、Worker
- 表現: Portal、水、反射、星のParticle、Real-time Lighting
- 学び: 3Dを装飾ではなく、Brandのテーマである時間と空間を体験させる媒体として使っている
- CordMarkへの応用: 縄目や痕跡を、そのまま描くのではなく、時間、蓄積、接続を感じる光やMaterialに変換する

### Aurel’s Grand Theater — 3Dと読みやすいDOMのHybrid

- URL: https://aurelienvigne.com
- Case Study: https://tympanus.net/codrops/2025/05/20/behind-the-curtain-building-aurels-grand-theater-from-design-to-code/
- 技術: Three.js、GSAP、Blender、Vue.js、TypeScript、WebGL
- 表現: 3Dの劇場を探索する体験と、通常のCase Studyページを共存させる
- 学び: 世界観を担う部分は没入型にし、内容を読む部分では明快なLayoutへ戻す
- CordMarkへの応用: HeroとPurposeは体験的にし、事業・会社情報・Contactは読みやすくする

### GSAP Showcase — Kinetic TypographyとScroll Choreography

- URL: https://gsap.com/showcase/
- 現在の掲載例: Gionatan Nese、Jesper Landberg、Edolus、Bombon、Graffico Studioなど
- 観察点: 3Dがなくても、文字の出現順序、Sectionの固定、Mask、Page Transition、Hoverだけで強い世界観を作れる
- CordMarkへの応用: PurposeやPrinciplesを、単なるFade-inではなく、意味の順番に合わせて読ませる

### Lenis Showcase — Scrollと描画を同じ感触にする

- URL: https://lenis.dev
- 掲載例: Unseen Studio、Lando Norris、Rockstar Games、Google Cloud x Team USAなど
- 技術的な役割: Wheel、Trackpad、TouchのScroll感を整え、DOMとWebGLのScroll-linked Animationを同期する
- 学び: Lenis自体がVisualを作るわけではない。Scrollと描画の時間差を減らし、サイト全体に一つの手触りを与える

## 技術ごとの現在地

### Three.js

#### できること

- Browser上のReal-time 3D
- Particle、光、影、反射、屈折
- Custom Shaderによる有機的な表現
- 3D ModelやCameraをScroll、Cursor、Touchへ連動
- Post-processingによるBloom、Depth of Field、Distortionなど

#### CordMarkとの相性

高い可能性があります。ただし、CordMark OSの画面を3D化するためではなく、CordMark固有の「縄目」「意思」「つながり」「余白」を一つのSignature Visualにする場合に限ります。

#### 現時点の判断

- ページ全体ではなく、HeroまたはPurposeの一箇所に限定する
- まずWebGLRendererで安定した版を作る
- 静止画または軽量CanvasのFallbackを必ず持つ
- Three.jsがなくても文章と導線が成立する構造にする

公式情報:

- https://threejs.org
- https://threejs.org/manual/en/webgpurenderer
- https://threejs.org/docs/TSL.html

### React Three Fiber

Three.jsをReact Componentとして扱うRendererです。現在のCordMark WebsiteはNext.js + Reactなので、直接Three.jsを命令的に組み込むより、React Three Fiberを使う方が構成を揃えやすい可能性があります。

公式READMEでは、React 19にはReact Three Fiber v9を組み合わせるよう案内されています。現在のサイトはReact 19.2系なので、この組み合わせが候補になります。

用途:

- Three.js SceneをReact Componentへ分割する
- ScrollやPointer状態と3Dを接続する
- `drei`、`postprocessing`、`gltfjsx`などの周辺Toolを使う

公式情報:

- https://github.com/pmndrs/react-three-fiber

### WebGPU / Three.js WebGPURenderer / TSL

WebGPUはWebGLより新しいGPU APIで、Compute Shaderや大量のParticle Simulationなど、より高度な表現に向いています。

Three.jsのWebGPURendererは、WebGPU非対応環境でWebGL 2へ自動Fallbackできます。TSLを使うと、JavaScriptで書いたShader LogicをWGSLまたはGLSLへ変換できます。

ただし、Three.js公式はWebGPURendererをまだExperimentalと説明し、純粋なWebGL 2用途ではWebGLRendererを推奨しています。

現時点の判断:

- CordMarkの公開サイトの必須基盤にはしない
- Visual R&DまたはPrototypeで試す価値は高い
- WebGL版と比較し、表現上の差が明確な場合だけ採用を検討する

### GSAP

GSAPは、Web上の要素、SVG、Canvas、Three.jsの値を時間軸で制御するAnimation Libraryです。

特にScrollTriggerは、Sectionの固定、Scroll位置に連動するAnimation、横方向の展開、複数要素のTimeline制御に使われています。

CordMarkで想定できる用途:

- Purposeの言葉を読む速度に合わせて展開する
- Signal → Question → Human Decision → Specification → Actionを順番に見せる
- 縄目のLineと本文を同じTimelineで動かす
- Section Transitionや文字のMask Reveal
- Three.jsのCamera、Material、Particleの値をScrollへ連動する

2025年4月以降、以前有料だったPluginを含めGSAP全体が無償で使えるようになり、Commercial Useも標準Licenseの範囲へ広がっています。

Reactでは`@gsap/react`の`useGSAP()`を使い、Componentが消えたときにAnimationやListenerを確実にCleanupする構成が候補です。

公式情報:

- https://gsap.com
- https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- https://github.com/greensock/react
- https://webflow.com/updates/gsap-becomes-free

### Motion for React

Reactと相性の良い、宣言的なAnimation Libraryです。現在の公式Documentationはv13系です。

向いていること:

- Button、Card、NavigationなどのMicro-interaction
- Componentの出入り
- Layoutの変化
- 単純なScroll-triggered / Scroll-linked Animation
- Gesture

対応BrowserではNativeのScrollTimelineを使ってHardware-acceleratedなScroll Animationを実行できます。

現時点の判断:

Motionだけでも美しいサイトは作れます。一方、CordMarkで長いNarrative TimelineとThree.js連携を行う場合は、GSAPの方が中心Toolとして扱いやすい可能性があります。GSAPとMotionを同じ役割で併用すると管理が複雑になるため、基本はどちらかを主にします。

公式情報:

- https://motion.dev/docs/react
- https://motion.dev/docs/react-scroll-animations

### Lenis

Lenisは5KB未満のSmooth Scroll Libraryです。見た目を直接作るToolではなく、Scrollの感触と、Scrollに連動するDOM / WebGL描画を同期するために使います。

現時点の判断:

- 3Dや複雑なScroll-linked Animationを使う場合に検討する
- 通常の縦Scrollだけなら、最初から必須にしない
- Browser標準の操作感を壊すScroll Hijackingはしない
- Keyboard、Touch、Reduced Motionを含めて確認する

公式情報:

- https://lenis.dev
- https://github.com/darkroomengineering/lenis

### Spline

Browser上で3D Sceneを視覚的に作り、Vanilla JavaScript、Three.js、React、Next.js、React Three Fiber向けにExportできるToolです。

現在はWebGPUを既定で使い、非対応BrowserではWebGLへFallbackします。

向いていること:

- 短時間で3Dの方向性を比較する
- Designerが直接Scene、Material、Cameraを調整する
- Cursor反応や状態変化をPrototypeする

注意点:

- 独自性と細かなPerformance最適化はCustom Three.js実装より制約が出やすい
- CordMark固有の縄目表現を最終品質まで作るなら、Prototype用として使い、最終版はCustom実装に移す可能性がある

公式情報:

- https://docs.spline.design/exporting-your-scene/web/exporting-as-code

### Rive

Riveは、State Machineを持つInteractive Vector Animationを作れるToolです。User Inputや状態によってAnimationを切り替えられ、WebではCanvas / WebGL2 Runtimeを利用できます。

向いていること:

- 2Dの概念図
- ButtonやIllustrationの状態変化
- CordMark OSのFlowを、Hoverや選択によって変化させる
- DesignerとDeveloperの分業

Three.jsの代わりではありません。奥行きや光の3D表現より、状態を持つ2D Motionに向いています。

公式情報:

- https://rive.app/docs/runtimes/web/web-js
- https://rive.app/docs/runtimes/web/state-machines

### Native CSS Scroll-driven Animations / View Transitions

Browser標準でも、Scroll位置に連動するAnimationと、ページ・状態間のTransitionが増えています。

利点:

- JavaScriptの計測を減らせる
- Browserが描画を最適化しやすい
- 単純なAnimationならLibraryを減らせる

注意点:

- すべてのBrowserで同じSupportではない
- CordMarkの中心体験に使う場合はFallbackが必要
- 現時点ではProgressive Enhancementとして使うのが安全

公式情報:

- https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll-driven_animations
- https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API

## CordMarkに推奨する技術構成

### 基盤

- Next.js 16 / React 19: 現在の構成を維持
- HTML / CSS: 情報、Typography、Layoutの中心
- SVG: 縄目やDecision Flowなど、軽量で意味のあるLine表現

### Narrative Motion

- 第一候補: GSAP
- Plugin: ScrollTrigger、SplitText、必要に応じてFlip / MorphSVG / DrawSVG
- React統合: `@gsap/react`

### Signature Visual

- 第一候補: Three.js + React Three Fiber v9
- Production Renderer: WebGLRenderer
- 補助: Drei、必要最小限のPost-processing
- 範囲: Heroを中心とした一つのCanvas

### Scroll Smoothing

- LenisはOptional
- Three.jsとDOMのScroll同期に問題がある場合だけ採用

### WebGPU

- 別Prototypeとして試す
- 本番採用の前にWebGL版との差、Device対応、発熱、Battery、Fallbackを比較

### 使わない可能性が高いもの

- GSAPとMotionの全面的な併用
- 複数の常時描画Canvas
- すべてのSectionを3Dにする構成
- Scrollを強制的に固定・加速する過度なScroll Hijacking
- 意味のないCursor Trail、Particle、Noise、Glitch
- AI企業らしく見せるためだけの青い3D Object

## CordMark向けSignature Visualの技術仮説

### 仮説A — Cord / Trace

複数のLineが画面内を独立して流れ、交差した場所に痕跡が残る。ScrollによってLineが一本の縄目やMarkへ編まれていく。

表すもの:

- 異なる人のContext
- 摩擦
- Decision
- 組織に残る知識

候補技術:

- 軽量版: SVG + GSAP
- 奥行き版: Three.jsのTubeGeometry / Shader
- 研究版: TSL + Compute Shader

### 仮説B — Human Decision Core

多数のSignalが集まるが、中心で自動処理されるのではなく、一度Human Decisionを通過して形を変え、Actionへ流れる。

表すもの:

- AIが人間の意思に置き換わらないこと
- CordMark OSのProduct Thesis
- 意思決定と実行の接続

候補技術:

- DOM / SVG + GSAP
- Three.js Particle System
- Rive State Machineによる2D版

### 仮説C — Surplus / Space

密集していた情報や作業が整理され、画面に余白が生まれる。その余白に、人の言葉、創作、関係が現れる。

表すもの:

- 生産力を処理量ではなく余力へ変える
- 時間と自由への還元
- WorkからLifeへの接続

候補技術:

- GSAPのLayout / Mask Animation
- CSS Grid + Clip Path
- Three.jsを使わないEditorial Motion

現時点では、**AとBをHeroとCordMark OS Sectionに使い、Cをページ全体のLayout変化として使う**組み合わせが、CordMarkらしさと技術的な必然性を両立しやすいと考えます。

## PerformanceとAccessibilityの基準

Animationや3Dを入れても、次を最低条件とします。

- Main CopyとContact導線はCanvasの読込前から表示する
- 3Dは必要になるまでLazy Loadする
- Mobileでは粒子数、Shader、Post-processing、解像度を落とす
- Canvasが画面外にあるときは描画を停止する
- `prefers-reduced-motion`では、意味を保った静止状態へ切り替える
- Keyboard NavigationとFocus表示をAnimationで隠さない
- Animation対象は基本的に`transform`と`opacity`を優先する
- 文字を分割して動かす場合もScreen Readerの読み上げを壊さない
- 3Dが動かない環境向けのFallbackを持つ
- Page Transitionが失敗しても通常Navigationが成立する

公開後の目標値:

- LCP: 2.5秒以下
- INP: 200ms以下
- CLS: 0.1以下

3Dを採用した場合でも、この基準から逆算してVisualの複雑さを決めます。

Next.jsでは、Three.jsやCanvas Componentを`next/dynamic`で遅延読込し、最初に必要なJavaScriptを減らす構成が候補です。

参考:

- https://nextjs.org/docs/app/guides/lazy-loading
- https://web.dev/articles/defining-core-web-vitals-thresholds

## 実装前に行う比較

次の三つを同じHero Copy、同じLayoutで比較すると、技術に引っ張られず判断できます。

### Prototype 1 — CSS / SVG / GSAP

- 3Dなし
- 縄目のLineとTypographyで表現
- 最も軽く、Mobileにも強い

### Prototype 2 — Three.js / React Three Fiber

- 奥行き、光、Materialを持つ縄目
- CursorとScrollに反応
- Brandの記憶に残る可能性が高い

### Prototype 3 — WebGPU / TSL

- 多数のSignalが集まり、組み替わるParticle表現
- 表現力は最も高い
- 安定性と制作コストを要検証

評価軸:

- CordMarkの思想が説明なしでも感じられるか
- ただのAI企業らしいVisualになっていないか
- 文字を読む邪魔にならないか
- Mobileで同じ意味が残るか
- 初回表示と操作反応が十分に速いか
- 次の担当者が継続的に修正できるか

## 現時点の推奨判断

まずGSAPを中心に、Typography、余白、Section間の関係でNarrativeを成立させます。そのうえで、CordMark固有のSignature VisualとしてThree.jsを一箇所だけ試します。

Three.jsがあるから格好よくなるのではなく、CordMarkの「人の意思を、技術で現実へ変える」という考えを、通常の画像では表せない形で体験させられるなら採用します。

WebGPUは非常に面白く、CordMarkの技術志向にも合います。ただし、現段階では公開サイトの前提ではなく、WebGL版を超える意味があるかを確認する研究対象とします。
