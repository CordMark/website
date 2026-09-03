import * as THREE from "three";

/**
 * The Company OS scene.
 *
 * One full-screen WebGL scene for the pinned Company OS section. It is a
 * director, not a component tree: each frame it takes one progress value and
 * drives every uniform from it.
 *
 * What it has to say, in one picture:
 *
 *   The company is not a ladder. There is no line from junior to senior to
 *   executive. Every role connects to the same core, and everything — a
 *   question, an answer, a decision, the visibility an executive needs —
 *   travels through that core. That is the product.
 *
 * Rules it never breaks:
 *
 *   1. No text is drawn in 3D. Every word on screen is DOM.
 *   2. The core never decides. The one warm colour in an otherwise cool scene
 *      belongs to the human decision, and appears only there.
 *
 * The beats, over the pinned progress p:
 *
 *   arrive    0.00–0.12  the core lights; the company assembles around it
 *   whole     0.10–0.22  the whole picture, at rest — read it before it moves
 *   signal    0.22–0.34  an engineer stops; the question travels to the core
 *   context   0.32–0.44  the core gathers the background around the question
 *   route     0.42–0.56  three paths open at once: answer / ask / decide
 *   decide    0.54–0.66  a person decides. The one warm light in the scene
 *   act       0.64–0.74  it returns as work, and the trace stays in the core
 *   asset     0.72–0.84  the core thickens — context the company now owns
 *   company   0.82–1.00  pull back: one cell of many, the whole company
 */

/* ---------- palette: taken from the product's own proposal deck ---------- */
const DEEP = new THREE.Color("#0d2a55");
const BLUE = new THREE.Color("#2f7de1");
const BLUE_PALE = new THREE.Color("#8fb8f0");
const CYAN = new THREE.Color("#38d8d0");
const CYAN_HOT = new THREE.Color("#9ff6ee");
const SLATE = new THREE.Color("#5b6b85");
/** the only warm colour in the scene — the human decision, nowhere else.
    Same vermilion the rest of the site uses for it. */
const HUMAN = new THREE.Color("#b5482e");
const HUMAN_LIT = new THREE.Color("#e2643f");
/** every role node is this colour. Six colours would read as six ranks. */
const NODE = new THREE.Color("#9db4bd");
const NODE_DIM = new THREE.Color("#3d525e");

/**
 * The five roles, placed on a sphere by golden angle rather than around a
 * circle. An evenly spaced ring is a diagram, and a diagram of people around
 * a centre is read as an org chart. Here nobody is higher, nearer or larger
 * than anybody else, and two of them sit behind the core — so the core has to
 * occlude them, which is what makes it read as a real body rather than a glow.
 */
const R_NODE = 3.1;
const ROLES = [
  { id: "engineer", az: 0.0, el: -32.0 },
  { id: "pm", az: 137.5, el: -19.2 },
  { id: "lead", az: 275.0, el: -6.4 },
  { id: "sales", az: 52.5, el: 6.4 },
  { id: "exec", az: 190.0, el: 19.2 },
];
const ENGINEER = 0;
const PM = 1;
const LEAD = 2;
const SALES = 3;
const EXEC = 4;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (u: number) => (u < 0.5 ? 2 * u * u : -1 + (4 - 2 * u) * u);
const span = (t: number, a: number, b: number) => (t <= a ? 0 : t >= b ? 1 : ease((t - a) / (b - a)));
const pulse = (t: number, a: number, b: number) => {
  if (t <= a || t >= b) return 0;
  return Math.sin(((t - a) / (b - a)) * Math.PI);
};

export type SceneQuality = "low" | "mid" | "high";

export type CompanyOsScene = {
  /** p: scroll progress. shift: 0 centred for the overview, 1 moved aside for the text */
  render: (p: number, time: number, shift: number) => void;
  resize: () => void;
  dispose: () => void;
  /** screen-space positions of the role nodes, for the DOM labels */
  projectRoles: (out: { x: number; y: number; depth: number; visible: boolean }[]) => void;
};

type MountOptions = {
  canvas: HTMLCanvasElement;
  quality: SceneQuality;
  onContextLost: () => void;
};

export function mountCompanyOsScene(opts: MountOptions): CompanyOsScene {
  const { canvas, quality, onContextLost } = opts;

  const counts = {
    low: { field: 2600, coreDust: 900, memory: 260 },
    mid: { field: 7000, coreDust: 2200, memory: 620 },
    high: { field: 14000, coreDust: 4200, memory: 1100 },
  }[quality];

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: quality !== "low",
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const onLost = (e: Event) => {
    e.preventDefault();
    onContextLost();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 200);
  const world = new THREE.Group();
  scene.add(world);

  /** the cell that holds the core, the roles and their links */
  const cell = new THREE.Group();
  world.add(cell);

  const rolePos = ROLES.map((r) => {
    const az = (r.az * Math.PI) / 180;
    const el = (r.el * Math.PI) / 180;
    const c = Math.cos(el) * R_NODE;
    return new THREE.Vector3(Math.sin(az) * c, Math.sin(el) * R_NODE, Math.cos(az) * c);
  });

  /* ==================================================================
     The core.
     Layered rather than a bloom blob: a dark inner body with animated
     bands showing through, a fresnel shell that only lights at the rim,
     two counter-rotating wire shells, and dust held inside.
     ================================================================== */

  const core = new THREE.Group();
  cell.add(core);

  const coreUniforms = {
    uTime: { value: 0 },
    uCharge: { value: 0 }, // 0 dormant → 1 lit
    uThink: { value: 0 }, // rises while the core is working on a question
    uMemory: { value: 0 }, // how much context it holds
  };

  const bodyMat = new THREE.ShaderMaterial({
    uniforms: {
      ...coreUniforms,
      uDeep: { value: DEEP.clone() },
      uCyan: { value: CYAN.clone() },
      uHot: { value: CYAN_HOT.clone() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vN;
      varying vec3 vP;
      varying vec3 vView;
      void main() {
        vN = normalize(normalMatrix * normal);
        vP = position;
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uTime, uCharge, uThink, uMemory;
      uniform vec3 uDeep, uCyan, uHot;
      varying vec3 vN;
      varying vec3 vP;
      varying vec3 vView;

      float hash(vec3 p){ return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453); }
      float noise(vec3 p){
        vec3 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hash(i), hash(i+vec3(1,0,0)), f.x),
                       mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), f.x), f.y),
                   mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), f.x),
                       mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), f.x), f.y), f.z);
      }

      void main() {
        float fres = 1.0 - abs(dot(normalize(vN), normalize(vView)));
        // slow internal weather, faster while it is working
        float t = uTime * (0.12 + uThink * 0.5);
        float n = noise(vP * 2.1 + vec3(0.0, t, 0.0));
        n = mix(n, noise(vP * 4.7 - vec3(t * 0.6, 0.0, t * 0.3)), 0.45);
        // latitude bands: structure, so it does not read as a lava lamp
        float band = smoothstep(0.55, 0.98, sin(vP.y * 11.0 + n * 3.4 + uTime * 0.35));

        vec3 col = uDeep * 0.5;
        col = mix(col, uCyan, n * 0.5 * uCharge);
        col += uHot * band * (0.16 + uThink * 0.4) * uCharge;
        // the rim is where it reads as a body of light rather than a ball
        col += mix(uCyan, uHot, uThink) * pow(fres, 2.6) * (1.1 + uMemory * 0.5) * uCharge;

        // the underside stays dark, so it is a body and not a lamp
        col *= mix(0.42, 1.0, smoothstep(-0.8, 0.5, vN.y));

        float a = (0.62 + 0.30 * pow(fres, 1.6) + band * 0.12 + uMemory * 0.08) * uCharge;
        // 8-bit dither: deep navy gradients band badly without it
        float d = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        col += (d - 0.5) / 255.0;
        gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
      }
    `,
    transparent: true,
    // It writes depth on purpose. A light that does not occlude what is behind
    // it is a glow; a thing that does is an object. Two roles sit behind it.
    depthWrite: true,
    depthTest: true,
  });
  const coreBody = new THREE.Mesh(new THREE.IcosahedronGeometry(0.95, 5), bodyMat);
  core.add(coreBody);

  const shellMat = (color: THREE.Color) =>
    new THREE.MeshBasicMaterial({
      color,
      wireframe: true,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  const shellA = new THREE.Mesh(new THREE.IcosahedronGeometry(1.28, 1), shellMat(BLUE));
  const shellB = new THREE.Mesh(new THREE.IcosahedronGeometry(1.62, 2), shellMat(CYAN));
  core.add(shellA, shellB);

  const haloMat = new THREE.MeshBasicMaterial({
    color: CYAN,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const halo = new THREE.Mesh(new THREE.RingGeometry(1.85, 1.9, 96), haloMat);
  halo.rotation.x = Math.PI / 2;
  core.add(halo);

  const dustGeo = new THREE.BufferGeometry();
  {
    const n = counts.coreDust;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = Math.cbrt(Math.random()) * 1.5;
      const s = Math.sqrt(1 - u * u);
      pos[i * 3] = Math.cos(th) * s * r;
      pos[i * 3 + 1] = u * r;
      pos[i * 3 + 2] = Math.sin(th) * s * r;
      seed[i] = Math.random();
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    dustGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    dustGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 2);
  }
  const dustMat = new THREE.ShaderMaterial({
    uniforms: { ...coreUniforms, uCyan: { value: CYAN_HOT.clone() }, uScale: { value: 1 } },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime, uCharge, uThink, uMemory, uScale;
      varying float vA;
      void main() {
        float sp = 0.25 + aSeed * 0.5 + uThink * 0.9;
        float a = uTime * sp + aSeed * 6.28;
        vec3 p = position;
        p.xz = mat2(cos(a * 0.35), -sin(a * 0.35), sin(a * 0.35), cos(a * 0.35)) * p.xz;
        p.y += sin(a) * 0.06;
        // as context accumulates the cloud fills out toward the shell
        p *= mix(0.72, 1.06, uMemory);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vA = (0.35 + 0.65 * fract(aSeed * 7.3 + uTime * 0.2)) * uCharge;
        gl_PointSize = (1.0 + aSeed * 1.7) * uScale * (7.5 / max(0.5, -mv.z));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision mediump float;
      uniform vec3 uCyan;
      varying float vA;
      void main() {
        float a = 1.0 - smoothstep(0.14, 0.5, length(gl_PointCoord - 0.5));
        if (a < 0.01) discard;
        gl_FragColor = vec4(uCyan, a * vA * 0.7);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const coreDust = new THREE.Points(dustGeo, dustMat);
  core.add(coreDust);

  /* ==================================================================
     The company around it. Links only ever run between a role and the
     core — no role links to another role. That is the whole point.
     ================================================================== */

  const nodeMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const nodes = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.15, 0), nodeMat, ROLES.length);
  nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  cell.add(nodes);

  const ringMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const nodeRings = new THREE.InstancedMesh(new THREE.RingGeometry(0.26, 0.28, 40), ringMat, ROLES.length);
  nodeRings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  cell.add(nodeRings);

  /** the curve each link follows: bowed, so the set never reads as a wheel */
  const linkCurves = rolePos.map((p) => {
    const mid = p.clone().multiplyScalar(0.5);
    mid.y += 0.55 + Math.abs(p.y) * 0.3;
    mid.multiplyScalar(1.06);
    const near = p.clone().normalize().multiplyScalar(1.95);
    return new THREE.CatmullRomCurve3([p.clone(), mid, near]);
  });

  const linkMats: THREE.ShaderMaterial[] = [];
  for (const curve of linkCurves) {
    const geo = new THREE.TubeGeometry(curve, 72, 0.012, 5, false);
    const uv = geo.attributes.uv as THREE.BufferAttribute;
    const aU = new Float32Array(uv.count);
    for (let i = 0; i < uv.count; i++) aU[i] = uv.getX(i);
    geo.setAttribute("aU", new THREE.BufferAttribute(aU, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: SLATE.clone() },
        uOpacity: { value: 0 },
        uDraw: { value: 0 },
        uFlow: { value: -1 },
        uFlowAmt: { value: 0 },
        uFlowColor: { value: CYAN_HOT.clone() },
      },
      vertexShader: /* glsl */ `
        attribute float aU;
        varying float vU;
        void main() {
          vU = aU;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision mediump float;
        uniform vec3 uColor, uFlowColor;
        uniform float uDraw, uOpacity, uFlow, uFlowAmt;
        varying float vU;
        void main() {
          if (vU > uDraw) discard;
          float base = uOpacity * (0.35 + 0.65 * smoothstep(0.0, 0.25, uDraw - vU));
          float head = smoothstep(0.09, 0.0, abs(vU - uFlow)) * uFlowAmt;
          float a = base + head * 0.85;
          if (a < 0.01) discard;
          gl_FragColor = vec4(mix(uColor, uFlowColor, head), a);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    linkMats.push(mat);
    cell.add(new THREE.Mesh(geo, mat));
  }

  /* ==================================================================
     The field: loose context drifting outside the company, thinning
     once the core holds it.
     ================================================================== */

  const fieldGeo = new THREE.BufferGeometry();
  {
    const n = counts.field;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 26;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22 - 3;
      seed[i] = Math.random();
    }
    fieldGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    fieldGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    fieldGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 30);
  }
  const fieldMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAlpha: { value: 0 },
      uScale: { value: 1 },
      uPale: { value: BLUE_PALE.clone() },
      uBlue: { value: BLUE.clone() },
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime, uScale;
      varying float vS;
      void main() {
        vec3 p = position;
        p.x += sin(uTime * 0.08 + aSeed * 6.28) * 0.5;
        p.y += cos(uTime * 0.07 + aSeed * 4.1) * 0.4;
        vS = aSeed;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = (0.8 + aSeed * 1.5) * uScale * (8.0 / max(0.5, -mv.z));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision mediump float;
      uniform float uAlpha;
      uniform vec3 uPale, uBlue;
      varying float vS;
      void main() {
        float a = 1.0 - smoothstep(0.1, 0.5, length(gl_PointCoord - 0.5));
        if (a < 0.01) discard;
        gl_FragColor = vec4(mix(uBlue, uPale, vS), a * uAlpha * (0.25 + vS * 0.5));
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const field = new THREE.Points(fieldGeo, fieldMat);
  world.add(field);

  /* ==================================================================
     Memory: what the company keeps. A shell that thickens with use.
     ================================================================== */

  const memGeo = new THREE.BufferGeometry();
  {
    const n = counts.memory;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const r = 2.05 + Math.random() * 0.32;
      pos[i * 3] = Math.cos(th) * s * r;
      pos[i * 3 + 1] = u * r * 0.72;
      pos[i * 3 + 2] = Math.sin(th) * s * r;
      seed[i] = Math.random();
    }
    memGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    memGeo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    memGeo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3);
  }
  const memMat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uFill: { value: 0 },
      uScale: { value: 1 },
      uCyan: { value: CYAN.clone() },
      uWarm: { value: HUMAN.clone() },
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      uniform float uTime, uFill, uScale;
      varying float vS;
      varying float vOn;
      void main() {
        vS = aSeed;
        vOn = step(aSeed, uFill);
        vec3 p = position;
        float a = uTime * 0.05;
        p.xz = mat2(cos(a), -sin(a), sin(a), cos(a)) * p.xz;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = (1.4 + aSeed * 1.2) * uScale * (7.0 / max(0.5, -mv.z)) * vOn;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision mediump float;
      uniform vec3 uCyan, uWarm;
      varying float vS;
      varying float vOn;
      void main() {
        if (vOn < 0.5) discard;
        float a = 1.0 - smoothstep(0.12, 0.5, length(gl_PointCoord - 0.5));
        if (a < 0.01) discard;
        // a few of them are decisions a person made, and stay warm
        gl_FragColor = vec4(vS > 0.86 ? uWarm : uCyan, a * 0.72);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const memory = new THREE.Points(memGeo, memMat);
  cell.add(memory);

  /* ==================================================================
     The decision. One warm mark, on a person, once.
     ================================================================== */

  const decisionMat = new THREE.MeshBasicMaterial({
    color: HUMAN,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const decisionRing = new THREE.Mesh(new THREE.RingGeometry(0.3, 0.345, 56), decisionMat);
  cell.add(decisionRing);

  const decisionWaveMat = new THREE.MeshBasicMaterial({
    color: HUMAN,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const decisionWave = new THREE.Mesh(new THREE.RingGeometry(0.34, 0.38, 56), decisionWaveMat);
  cell.add(decisionWave);

  /* ==================================================================
     Frame
     ================================================================== */

  const tmpM = new THREE.Matrix4();
  const tmpQ = new THREE.Quaternion();
  const tmpS = new THREE.Vector3();
  const tmpLook = new THREE.Matrix4();
  const yAxis = new THREE.Vector3(0, 1, 0);

  let width = 0;
  let height = 0;
  /** how far aside the composition moves once the explanation appears */
  let shiftFrac = 0.22;
  let shiftScale = 0.82;
  /** context the company owns. Monotonic: scrolling back up does not undo it. */
  let memoryHeld = 0;

  const resize = () => {
    width = canvas.clientWidth || 1;
    height = canvas.clientHeight || 1;
    const dpr = Math.min(window.devicePixelRatio || 1, quality === "low" ? 1 : quality === "mid" ? 1.75 : 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // on a tall, narrow screen the same composition has to fit a taller frame
    const tall = clamp(height / Math.max(1, width), 0.5, 2);
    camera.fov = 40 + clamp((tall - 0.6) * 16, 0, 22);
    camera.updateProjectionMatrix();
    // narrower windows leave less room beside the text, so the composition
    // moves less far and shrinks a little more
    const wide = width >= 1200;
    shiftFrac = wide ? 0.22 : 0.19;
    shiftScale = wide ? 0.82 : 0.74;
    const s = quality === "low" ? 0.85 : 1;
    dustMat.uniforms.uScale.value = s;
    fieldMat.uniforms.uScale.value = s;
    memMat.uniforms.uScale.value = s;
  };
  resize();

  const render = (p: number, time: number, shift: number) => {
    // 0.00–0.30 is the overview: the whole picture, and nothing new happening.
    // The reader gets to look before anything is explained.
    const arrive = span(p, 0.0, 0.1);
    const whole = span(p, 0.08, 0.2);
    const signal = span(p, 0.34, 0.45);
    const context = span(p, 0.43, 0.54);
    const route = span(p, 0.52, 0.64);
    const decide = span(p, 0.62, 0.73);
    const act = span(p, 0.71, 0.8);
    const asset = span(p, 0.78, 0.9);
    // the tool disappears into the work: at the end the scaffolding fades and
    // only the light is left. Not a reveal — a withdrawal.
    const invisible = span(p, 0.9, 1.0);

    // context the company owns never goes down, even scrolling back up
    memoryHeld = Math.max(memoryHeld, Math.max(act * 0.3, asset));

    /* ---- camera and placement ---- */
    camera.position.set(0, 0.55, 12.6 - whole * 0.6 + invisible * 1.8);
    camera.lookAt(0, 0, 0);
    // When the explanation appears, the whole composition moves aside and
    // shrinks rather than being covered up. visibleW is measured from the
    // frustum, so this holds at any window shape.
    const visibleW = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360) * camera.aspect;
    world.position.x = shift * visibleW * shiftFrac;
    // during the overview the composition rides high, leaving the lower third
    // to the headline; it settles back to centre once the text moves aside
    world.position.y = (1 - shift) * 1.15;
    world.scale.setScalar(1 - shift * (1 - shiftScale));
    // the group is tilted and turns slowly: a constellation, not a wheel
    cell.rotation.y = -0.3 + p * 0.55;
    cell.rotation.x = 0.2;
    cell.rotation.z = -0.16 + Math.sin(time * 0.04) * 0.04;

    /* ---- core ---- */
    coreUniforms.uTime.value = time;
    coreUniforms.uCharge.value = arrive;
    coreUniforms.uThink.value = Math.max(context * (1 - route * 0.6), pulse(p, 0.34, 0.56) * 0.8);
    coreUniforms.uMemory.value = memoryHeld;
    core.scale.setScalar(0.86 + arrive * 0.14 + context * 0.06 + memoryHeld * 0.05);
    shellA.rotation.set(time * 0.03, time * 0.06, 0);
    shellB.rotation.set(0, -time * 0.04, time * 0.025);
    (shellA.material as THREE.MeshBasicMaterial).opacity = arrive * 0.16;
    (shellB.material as THREE.MeshBasicMaterial).opacity = arrive * 0.1 + context * 0.06;
    haloMat.opacity = arrive * 0.3 + context * 0.2;
    halo.rotation.z = time * 0.08;

    /* ---- field ---- */
    fieldMat.uniforms.uTime.value = time;
    // present at the start, thinning once the core holds the context
    fieldMat.uniforms.uAlpha.value = (0.35 + 0.65 * (1 - context)) * arrive * (1 - invisible * 0.4);

    /* ---- roles and links ---- */
    nodeMat.opacity = whole * (1 - invisible);
    ringMat.opacity = whole * 0.5 * (1 - invisible);

    for (let i = 0; i < ROLES.length; i++) {
      const appear = clamp((whole - i * 0.06) / 0.55);
      // Who is lit, and when. Nobody has their own colour — a palette of six
      // would be read as six ranks. Colour only ever means state.
      let heat = 0;
      if (i === ENGINEER) heat = Math.max(signal * (1 - route * 0.4), act);
      if (i === PM || i === SALES) heat = route * (1 - decide * 0.5);
      if (i === LEAD) heat = decide;
      // the executive is kept in view; they are not asked to reply
      if (i === EXEC) heat = route * 0.3 + decide * 0.35;

      const c = NODE.clone().lerp(CYAN_HOT, heat);
      // while one person is deciding, everyone else recedes
      c.lerp(NODE_DIM, decide * (1 - act) * (i === LEAD ? 0 : 0.7));
      if (i === LEAD) c.lerp(HUMAN_LIT, decide * 0.9);

      tmpQ.setFromAxisAngle(yAxis, time * 0.25 + i);
      tmpM.compose(rolePos[i], tmpQ, tmpS.setScalar(Math.max(0.001, appear * (0.85 + heat * 0.7))));
      nodes.setMatrixAt(i, tmpM);
      nodes.setColorAt(i, c);

      // rings face the camera, so they read as stations at any angle
      tmpLook.lookAt(rolePos[i], camera.position, camera.up);
      tmpQ.setFromRotationMatrix(tmpLook);
      tmpM.compose(rolePos[i], tmpQ, tmpS.setScalar(Math.max(0.001, appear * (1 + heat * 0.35))));
      nodeRings.setMatrixAt(i, tmpM);
      nodeRings.setColorAt(i, c);
    }
    nodes.instanceMatrix.needsUpdate = true;
    nodeRings.instanceMatrix.needsUpdate = true;
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
    if (nodeRings.instanceColor) nodeRings.instanceColor.needsUpdate = true;

    for (let i = 0; i < linkMats.length; i++) {
      const m = linkMats[i];
      m.uniforms.uDraw.value = clamp((whole - i * 0.05) / 0.5);
      m.uniforms.uOpacity.value = (0.14 + route * 0.1) * (1 - invisible);
      m.uniforms.uColor.value.copy(SLATE).lerp(BLUE, 0.35);
      m.uniforms.uFlow.value = -1;
      m.uniforms.uFlowAmt.value = 0;
      m.uniforms.uFlowColor.value.copy(CYAN_HOT);
    }

    // A question leaves the engineer and runs to the core. aU runs from the
    // role (0) to the core end (1), so 1 - t sends the head inward.
    const inbound = pulse(p, 0.34, 0.45);
    if (inbound > 0.01) {
      const m = linkMats[ENGINEER];
      m.uniforms.uFlow.value = 1 - span(p, 0.34, 0.45);
      m.uniforms.uFlowAmt.value = inbound;
    }

    // The core opens the paths at once. It does not send the question up a
    // chain — it asks whoever holds the answer, and keeps the executive in view.
    if (route > 0.01) {
      const outFlow = 1 - span(p, 0.52, 0.64);
      const ask = pulse(p, 0.52, 0.64);
      // The core asks whoever holds the answer, and keeps the people who need
      // visibility in view. It does not pass the question up a chain.
      for (const [idx, colour, amt] of [
        [PM, CYAN_HOT, 1],
        [SALES, CYAN_HOT, 1],
        // notified, not asked — dimmer, and no reply comes back
        [EXEC, BLUE_PALE, 0.4],
      ] as const) {
        const m = linkMats[idx];
        m.uniforms.uFlow.value = outFlow;
        m.uniforms.uFlowAmt.value = ask * amt;
        m.uniforms.uFlowColor.value.copy(colour);
      }
      const m = linkMats[LEAD];
      m.uniforms.uFlow.value = outFlow;
      m.uniforms.uFlowAmt.value = pulse(p, 0.56, 0.7) * 0.9;
      m.uniforms.uFlowColor.value.copy(HUMAN_LIT);
    }

    // and it comes back to the engineer as work that can be done
    const outbound = pulse(p, 0.71, 0.81);
    if (outbound > 0.01) {
      const m = linkMats[ENGINEER];
      m.uniforms.uFlow.value = span(p, 0.71, 0.81);
      m.uniforms.uFlowAmt.value = outbound;
      // the decision comes back together with the grounds for it
      m.uniforms.uFlowColor.value.copy(HUMAN_LIT).lerp(CYAN_HOT, 0.45);
    }

    /* ---- the decision: one person, one warm mark ---- */
    const press = span(p, 0.645, 0.7);
    tmpLook.lookAt(rolePos[LEAD], camera.position, camera.up);
    decisionRing.position.copy(rolePos[LEAD]);
    decisionRing.quaternion.setFromRotationMatrix(tmpLook);
    decisionWave.position.copy(rolePos[LEAD]);
    decisionWave.quaternion.copy(decisionRing.quaternion);
    decisionMat.opacity = press * (1 - invisible) * (1 - act * 0.35);
    decisionRing.scale.setScalar(0.4 + (1 - Math.pow(1 - press, 3)) * 0.6);
    const ripple = pulse(p, 0.66, 0.76);
    decisionWaveMat.opacity = ripple * 0.55;
    decisionWave.scale.setScalar(1 + ripple * 2.2);

    /* ---- what the company now owns ---- */
    memMat.uniforms.uTime.value = time;
    memMat.uniforms.uFill.value = memoryHeld;

    renderer.render(scene, camera);
  };

  const projectRoles = (out: { x: number; y: number; depth: number; visible: boolean }[]) => {
    const v = new THREE.Vector3();
    for (let i = 0; i < ROLES.length; i++) {
      v.copy(rolePos[i]);
      cell.localToWorld(v);
      const depth = v.distanceTo(camera.position);
      v.project(camera);
      out[i] = {
        x: (v.x * 0.5 + 0.5) * width,
        y: (-v.y * 0.5 + 0.5) * height,
        depth,
        visible: v.z < 1,
      };
    }
  };

  const dispose = () => {
    canvas.removeEventListener("webglcontextlost", onLost);
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const m = mesh.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else if (m) m.dispose();
    });
    renderer.dispose();
  };

  return { render, resize, dispose, projectRoles };
}
