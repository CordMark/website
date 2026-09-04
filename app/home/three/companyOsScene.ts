import * as THREE from "three";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";

/**
 * The Company OS scene.
 *
 * One full-screen WebGL scene for the pinned Company OS section. It is a
 * director, not a component tree: each frame it takes one progress value and
 * drives every uniform from it.
 *
 * What it has to say, in one picture:
 *
 *   One change in a spec travels through three people and comes back as the
 *   day's work. Nobody stops. The executive sees only the decision that
 *   mattered. The thing in the middle is a ball of threads — the same cord the
 *   hero wove, now holding the company's context.
 *
 * Rules it never breaks:
 *
 *   1. No text is drawn in 3D. Every word on screen is DOM.
 *   2. The core never decides. The one warm colour in an otherwise cool scene
 *      belongs to the human decision, and appears only there.
 *
 * The beats, over the pinned progress p (they match STEP_AT in the canvas):
 *
 *   arrive      0.00–0.12  the core lights; the company assembles around it
 *   whole       0.10–0.30  the whole picture, at rest — read it before it moves
 *   answer      0.34–0.46  sales asks; the core answers, with grounds. The
 *                          engineer is never touched
 *   ask         0.46–0.58  the engineer asks; the core gathers the background
 *                          and opens one path, to the PM
 *   decide      0.58–0.73  the hub gathers what sales knows and hands it to
 *                          the PM; the PM decides. The one warm light. The
 *                          decision goes back to the hub, and a dim ping
 *                          reaches the executive — told, not asked — before
 *                          the beat ends
 *   act         0.73–0.80  it returns to the engineer as work; the trace stays
 *   visibility  0.80–0.90  the engineer's raw word reaches the hub, and the
 *                          hub carries the one thing nobody reported to the
 *                          executive, who calls the priority — before it is
 *                          too late
 *   ai-native   0.90–1.00  the scaffolding withdraws; the threads thicken
 */

/* ---------- palette ---------- */
const DEEP = new THREE.Color("#0d2a55");
const BLUE = new THREE.Color("#2f7de1");
const BLUE_PALE = new THREE.Color("#8fb8f0");
const CYAN = new THREE.Color("#38d8d0");
const CYAN_HOT = new THREE.Color("#9ff6ee");
const VIOLET = new THREE.Color("#8f8cf0");
const WHITE = new THREE.Color("#ede7da");
const SLATE = new THREE.Color("#5b6b85");
/** the only warm colour in the scene — the human decision, nowhere else.
    Same vermilion the rest of the site uses for it. */
const HUMAN = new THREE.Color("#b5482e");
const HUMAN_LIT = new THREE.Color("#e2643f");
/** every role node is this colour. Five colours would read as five ranks. */
const NODE = new THREE.Color("#9db4bd");
const NODE_DIM = new THREE.Color("#3d525e");

/**
 * Four roles on a ring around the hub. The ring turns so that whoever is
 * speaking in a beat comes to the front — nearest the camera, largest — and
 * everyone else stays in view behind them. Nobody is higher than anybody
 * else; the small elevations only keep the ring from reading as a diagram.
 */
const R_NODE = 3.8;
/** radius of the ball of threads, before CORE_SCALE */
const R_THREAD = 1.38;
/** The hub is small. The people and the paths between them are the story;
    the ball is what they share, not what they look at. */
const CORE_SCALE = 0.6;
const ROLES = [
  { id: "engineer", az: 0, el: -3 },
  { id: "pm", az: 90, el: 4 },
  { id: "exec", az: 180, el: 1 },
  { id: "sales", az: 270, el: -2 },
];
const ENGINEER = 0;
const PM = 1;
const EXEC = 2;
const SALES = 3;

/** which way the ring faces, over p: the azimuth (degrees) that is turned
    to the front. Between keyframes the ring eases round the short way. In
    the overview nobody is in front — the four stand on the diagonals, so
    none of them hides behind the hub or under the headline. */
const FRONT_OF = (i: number) => ROLES[i].az;
const FRONT: [number, number][] = [
  [0.0, 45],
  [0.3, 45],
  [0.36, FRONT_OF(SALES)],
  [0.46, FRONT_OF(SALES)],
  [0.5, FRONT_OF(ENGINEER)],
  [0.57, FRONT_OF(ENGINEER)],
  [0.61, FRONT_OF(PM)],
  [0.72, FRONT_OF(PM)],
  [0.76, FRONT_OF(ENGINEER)],
  [0.8, FRONT_OF(ENGINEER)],
  [0.85, FRONT_OF(EXEC)],
  [0.9, FRONT_OF(EXEC)],
  [0.96, 45],
  [1.0, 45],
];

/**
 * The camera. It hardly moves: a little above the ring, looking in. The
 * story is told by the ring turning, not by the camera flying about.
 */
type Shot = {
  p: number;
  el: number;
  dist: number;
  target: [number, number, number];
  /** how far the whole view slides to the right, in world units, so the
      scene keeps clear of the caption in the upper left */
  sx: number;
};
const SHOTS: Shot[] = [
  // overview: front on, the hub riding high so the headline has the bottom
  { p: 0.0, el: 18, dist: 10.6, target: [0, -0.72, 0], sx: 0 },
  { p: 0.28, el: 18, dist: 10.6, target: [0, -0.72, 0], sx: 0 },
  // the beats: seen from higher up, so the person behind the hub stands
  // above it on screen instead of vanishing into it; the ring sits lower,
  // clear of the caption
  { p: 0.36, el: 27, dist: 11, target: [0, -0.8, 0], sx: 1.0 },
  { p: 0.9, el: 27, dist: 11, target: [0, -0.8, 0], sx: 1.0 },
  // ai-native: pull back
  { p: 0.97, el: 16, dist: 13, target: [0, -0.2, 0], sx: 0.7 },
  { p: 1.0, el: 16, dist: 13, target: [0, -0.2, 0], sx: 0.7 },
];

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (u: number) => u * u * (3 - 2 * u);
const lerpAngle = (a: number, b: number, t: number) => {
  let d = ((b - a + 540) % 360) - 180;
  return a + d * t;
};
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
  /** true when the words sit under the scene (a phone), not beside it */
  setStacked: (stacked: boolean) => void;
  dispose: () => void;
  /** screen-space positions of the role nodes, for the DOM labels */
  /** `r` is the ring's radius on screen, in px, so words can keep clear of it */
  projectRoles: (out: { x: number; y: number; depth: number; visible: boolean; dim: number; r: number }[]) => void;
  /** screen-space position of the core's centre, and the radius of the threads */
  projectCore: (out: { x: number; y: number; r: number }) => void;
};

type MountOptions = {
  canvas: HTMLCanvasElement;
  quality: SceneQuality;
  onContextLost: () => void;
};

/** a soft radial glow, drawn once to a texture for the sprite in the core */
function glowTexture(): THREE.Texture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.18, "rgba(255,255,255,0.55)");
  g.addColorStop(0.5, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function mountCompanyOsScene(opts: MountOptions): CompanyOsScene {
  const { canvas, quality, onContextLost } = opts;

  const counts = {
    low: { field: 2000, coreDust: 500, memory: 220, threads: 30, tube: 96 },
    mid: { field: 5000, coreDust: 1200, memory: 520, threads: 46, tube: 128 },
    high: { field: 9000, coreDust: 2200, memory: 900, threads: 62, tube: 160 },
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
     The core: a ball of threads.
     A dark disc behind it (the ground it sits on), a soft body of light
     inside, and dozens of thin luminous loops wound around it, each turning
     on its own axis. Front threads are bright and a little white; back
     threads sink into the body. The body writes depth, so the far half of
     every loop is occluded — that is what makes it a ball and not a glow.
     ================================================================== */

  const core = new THREE.Group();
  cell.add(core);

  const coreUniforms = {
    uTime: { value: 0 },
    uCharge: { value: 0 }, // 0 dormant → 1 lit
    uThink: { value: 0 }, // rises while the core is working on a question
    uMemory: { value: 0 }, // how much context it holds
  };

  // the body of light
  const bodyMat = new THREE.ShaderMaterial({
    uniforms: {
      ...coreUniforms,
      uDeep: { value: DEEP.clone() },
      uCyan: { value: CYAN.clone() },
      uHot: { value: CYAN_HOT.clone() },
    },
    vertexShader: /* glsl */ `
      varying vec3 vN;
      varying vec3 vView;
      void main() {
        vN = normalize(normalMatrix * normal);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vView = normalize(-mv.xyz);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uCharge, uThink, uMemory;
      uniform vec3 uDeep, uCyan, uHot;
      varying vec3 vN;
      varying vec3 vView;
      void main() {
        float facing = max(0.0, dot(normalize(vN), normalize(vView)));
        float fres = 1.0 - facing;
        // a soft light in the middle, deeper toward the rim, then a thin lit edge
        vec3 col = uDeep * 0.35;
        col = mix(col, uCyan, pow(facing, 2.2) * 0.55 * uCharge);
        col += uHot * pow(facing, 6.0) * (0.18 + uThink * 0.3) * uCharge;
        col += mix(uCyan, uHot, uThink) * pow(fres, 3.2) * (0.6 + uMemory * 0.4) * uCharge;
        float a = (0.78 + 0.2 * pow(facing, 2.0)) * uCharge;
        float d = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        col += (d - 0.5) / 255.0;
        gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
      }
    `,
    transparent: true,
    depthWrite: true,
    depthTest: true,
  });
  const coreBody = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 4), bodyMat);
  core.add(coreBody);

  // the glow, a sprite so it is round from any angle and costs nothing
  const glowTex = glowTexture();
  const glowMat = new THREE.SpriteMaterial({
    map: glowTex,
    color: CYAN,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const glow = new THREE.Sprite(glowMat);
  glow.scale.setScalar(3.4);
  glow.renderOrder = -1;
  core.add(glow);

  // the threads: one merged geometry, one draw call. Each loop carries its own
  // spin axis and speed as attributes, and is turned in the vertex shader.
  const threadGeo = (() => {
    const parts: THREE.BufferGeometry[] = [];
    const q = new THREE.Quaternion();
    const axis = new THREE.Vector3();
    for (let i = 0; i < counts.threads; i++) {
      // a circle, bent a little so no two loops are the same ellipse
      const a1 = 0.02 + Math.random() * 0.05;
      const a2 = Math.random() * 0.03;
      const f1 = 2 + Math.floor(Math.random() * 3);
      const f2 = 4 + Math.floor(Math.random() * 4);
      const ph1 = Math.random() * Math.PI * 2;
      const ph2 = Math.random() * Math.PI * 2;
      const rad = R_THREAD * (0.9 + Math.random() * 0.14);
      const pts: THREE.Vector3[] = [];
      const n = 40;
      for (let k = 0; k < n; k++) {
        const t = (k / n) * Math.PI * 2;
        const r = rad * (1 + a1 * Math.sin(f1 * t + ph1) + a2 * Math.sin(f2 * t + ph2));
        pts.push(new THREE.Vector3(Math.cos(t) * r, Math.sin(t) * r, Math.sin(f1 * t + ph2) * rad * a1 * 1.6));
      }
      q.setFromEuler(new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI));
      for (const p of pts) p.applyQuaternion(q);
      const curve = new THREE.CatmullRomCurve3(pts, true, "catmullrom", 0.5);
      const radius = 0.009 + Math.random() * 0.007;
      const geo = new THREE.TubeGeometry(curve, counts.tube, radius, 3, true);
      const count = geo.attributes.position.count;
      axis.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
      const aAxis = new Float32Array(count * 3);
      const aSeed = new Float32Array(count);
      const seed = Math.random();
      // speed: slow, either way round. A few are noticeably quicker.
      const speed = (Math.random() < 0.5 ? -1 : 1) * (0.05 + Math.random() * 0.12) * (Math.random() < 0.15 ? 2.2 : 1);
      // colour pick: mostly teal, a third violet, a few pale
      const colSel = Math.random() < 0.55 ? 0 : Math.random() < 0.75 ? 1 : 2;
      const aInfo = new Float32Array(count * 2);
      for (let v = 0; v < count; v++) {
        aAxis[v * 3] = axis.x;
        aAxis[v * 3 + 1] = axis.y;
        aAxis[v * 3 + 2] = axis.z;
        aSeed[v] = seed;
        aInfo[v * 2] = speed;
        aInfo[v * 2 + 1] = colSel;
      }
      geo.setAttribute("aAxis", new THREE.BufferAttribute(aAxis, 3));
      geo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1));
      geo.setAttribute("aInfo", new THREE.BufferAttribute(aInfo, 2));
      geo.deleteAttribute("uv");
      parts.push(geo);
    }
    const merged = mergeGeometries(parts, false)!;
    parts.forEach((g) => g.dispose());
    merged.boundingSphere = new THREE.Sphere(new THREE.Vector3(), R_THREAD * 1.3);
    return merged;
  })();

  const threadMat = new THREE.ShaderMaterial({
    uniforms: {
      ...coreUniforms,
      uTeal: { value: CYAN.clone() },
      uViolet: { value: VIOLET.clone() },
      uPale: { value: CYAN_HOT.clone() },
      uWhite: { value: WHITE.clone() },
      uRadius: { value: R_THREAD },
    },
    vertexShader: /* glsl */ `
      attribute vec3 aAxis;
      attribute float aSeed;
      attribute vec2 aInfo;
      uniform float uTime, uThink;
      uniform float uRadius;
      varying float vFront;
      varying float vCol;
      varying float vSeed;
      vec3 rot(vec3 p, vec3 k, float a) {
        float c = cos(a), s = sin(a);
        return p * c + cross(k, p) * s + k * dot(k, p) * (1.0 - c);
      }
      void main() {
        float ang = uTime * aInfo.x * (1.0 + uThink * 2.4) + aSeed * 6.2831;
        vec3 p = rot(position, aAxis, ang);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        // how far toward the camera this point sits, inside the ball
        vec4 c = modelViewMatrix * vec4(0.0, 0.0, 0.0, 1.0);
        vFront = clamp((mv.z - c.z) / uRadius * 0.5 + 0.5, 0.0, 1.0);
        vCol = aInfo.y;
        vSeed = aSeed;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      precision highp float;
      uniform float uTime, uCharge, uThink, uMemory;
      uniform vec3 uTeal, uViolet, uPale, uWhite;
      varying float vFront;
      varying float vCol;
      varying float vSeed;
      void main() {
        vec3 base = vCol < 0.5 ? uTeal : (vCol < 1.5 ? uViolet : uPale);
        // the front of the ball catches a little white; the back sinks
        vec3 col = mix(base, uWhite, pow(vFront, 3.0) * 0.4);
        float breathe = 0.85 + 0.15 * sin(uTime * 0.6 + vSeed * 6.2831);
        float a = (0.06 + 0.62 * pow(vFront, 1.6)) * breathe;
        a *= (0.75 + uThink * 0.5 + uMemory * 0.45) * uCharge;
        gl_FragColor = vec4(col, a);
      }
    `,
    transparent: true,
    depthWrite: false,
    depthTest: true,
    blending: THREE.AdditiveBlending,
  });
  const threads = new THREE.Mesh(threadGeo, threadMat);
  core.add(threads);

  // dust held inside the ball
  const dustGeo = new THREE.BufferGeometry();
  {
    const n = counts.coreDust;
    const pos = new Float32Array(n * 3);
    const seed = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1;
      const th = Math.random() * Math.PI * 2;
      const r = Math.cbrt(Math.random()) * 1.25;
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
        p *= mix(0.8, 1.08, uMemory);
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        vA = (0.35 + 0.65 * fract(aSeed * 7.3 + uTime * 0.2)) * uCharge;
        gl_PointSize = (1.0 + aSeed * 1.5) * uScale * (7.5 / max(0.5, -mv.z));
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
        gl_FragColor = vec4(uCyan, a * vA * 0.5);
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
  const nodes = new THREE.InstancedMesh(new THREE.SphereGeometry(0.075, 14, 10), nodeMat, ROLES.length);
  nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  cell.add(nodes);

  const ringMat = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const nodeRings = new THREE.InstancedMesh(new THREE.RingGeometry(0.23, 0.245, 40), ringMat, ROLES.length);
  nodeRings.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  cell.add(nodeRings);

  /** the curve each link follows: bowed, so the set never reads as a wheel.
      aU runs 0 at the role to 1 at the core. */
  const linkCurves = rolePos.map((p) => {
    const mid = p.clone().multiplyScalar(0.5);
    mid.y += 0.55 + Math.abs(p.y) * 0.3;
    mid.multiplyScalar(1.06);
    const near = p.clone().normalize().multiplyScalar(R_THREAD * CORE_SCALE + 0.12);
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
          // the head, and a tail behind it
          float head = smoothstep(0.08, 0.0, abs(vU - uFlow)) * uFlowAmt;
          float a = base + head * 0.9;
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
      const r = 1.85 + Math.random() * 0.3;
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
        gl_FragColor = vec4(vS > 0.88 ? uWarm : uCyan, a * 0.6);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const memory = new THREE.Points(memGeo, memMat);
  core.add(memory);

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
  const shotTarget = new THREE.Vector3();
  const camLocal = new THREE.Vector3();
  /** how far each person has receded this frame, for the DOM labels */
  const dimOut = [0, 0, 0, 0];
  /** each person's ring radius this frame, in world units */
  const ringWorld = [0.25, 0.25, 0.25, 0.25];
  const camUp = new THREE.Vector3();

  let width = 0;
  let height = 0;
  /** how high the composition sits, leaving the bottom of the screen to the words */
  let lift = 0.9;
  /** 0 on a wide window, 1 on a narrow one: the ring pulls back and slides less */
  let narrow = 0;
  /** words under the scene: the ring keeps the upper part of the screen and
      does not slide sideways for a caption that is not there */
  let stacked = false;
  /** how much taller than wide the window is, 0 landscape → 1 a phone upright */
  let upright = 0;
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
    // a squarer window has less room below the ball; lift it a little more
    lift = 0.9 + clamp((tall - 0.6) * 0.8, 0, 0.5);
    narrow = clamp((1200 - width) / 400);
    upright = clamp((tall - 0.9) / 0.6);
    const s = quality === "low" ? 0.85 : 1;
    dustMat.uniforms.uScale.value = s;
    fieldMat.uniforms.uScale.value = s;
    memMat.uniforms.uScale.value = s;
  };
  resize();
  const setStacked = (v: boolean) => {
    stacked = v;
  };

  /** a light running along one link. t: 0 at the role, 1 at the core. */
  const flow = (idx: number, t: number, amt: number, colour: THREE.Color) => {
    const m = linkMats[idx];
    m.uniforms.uFlow.value = t;
    m.uniforms.uFlowAmt.value = amt;
    m.uniforms.uFlowColor.value.copy(colour);
  };
  const inbound = (idx: number, p: number, a: number, b: number, colour: THREE.Color) => {
    const amt = pulse(p, a, b);
    if (amt > 0.01) flow(idx, span(p, a, b), amt, colour);
  };
  const outbound = (idx: number, p: number, a: number, b: number, colour: THREE.Color, scale = 1) => {
    const amt = pulse(p, a, b) * scale;
    if (amt > 0.01) flow(idx, 1 - span(p, a, b), amt, colour);
  };

  const warmCyan = HUMAN_LIT.clone().lerp(CYAN_HOT, 0.45);

  const render = (p: number, time: number, shift: number) => {
    const arrive = span(p, 0.0, 0.1);
    const whole = span(p, 0.08, 0.2);
    // the beats — see the header. Each is a window of p.
    const decide = span(p, 0.6, 0.67);
    const act = span(p, 0.73, 0.8);
    // the tool disappears into the work: at the end the scaffolding fades and
    // only the threads are left. Not a reveal — a withdrawal.
    const invisible = span(p, 0.9, 1.0);

    // while the core is working on a question
    const think = Math.max(
      pulse(p, 0.36, 0.46),
      pulse(p, 0.48, 0.58) * 1.0,
      pulse(p, 0.59, 0.65) * 0.6,
      pulse(p, 0.83, 0.85) * 0.5,
    );

    // context the company owns never goes down, even scrolling back up
    memoryHeld = Math.max(memoryHeld, Math.max(act * 0.35, span(p, 0.8, 1.0)));

    /* ---- the ring turns: the speaker comes to the front ---- */
    void shift;
    let f = 0;
    while (f < FRONT.length - 2 && p >= FRONT[f + 1][0]) f++;
    const fa = FRONT[f];
    const fb = FRONT[f + 1];
    const ft = smooth(clamp((p - fa[0]) / Math.max(1e-6, fb[0] - fa[0])));
    const frontAz = lerpAngle(fa[1], fb[1], ft);
    cell.rotation.set(0, (-frontAz * Math.PI) / 180, -0.04 + Math.sin(time * 0.04) * 0.03);

    /* ---- camera ---- */
    let k = 0;
    while (k < SHOTS.length - 2 && p >= SHOTS[k + 1].p) k++;
    const a = SHOTS[k];
    const b = SHOTS[k + 1];
    const t = smooth(clamp((p - a.p) / Math.max(1e-6, b.p - a.p)));
    const el = ((a.el + (b.el - a.el) * t) * Math.PI) / 180;
    // stacked, the caption is under the scene: the ring rises to clear it,
    // and by the amount the frame is upright, not by a fixed step
    const rise = stacked ? upright : 0;
    // and pulls back a little, so the people at the sides stay in the frame
    const dist = (a.dist + (b.dist - a.dist) * t) * (1 + narrow * 0.18 + rise * 0.1);
    shotTarget.set(
      a.target[0] + (b.target[0] - a.target[0]) * t,
      (a.target[1] + (b.target[1] - a.target[1]) * t) * (1 + (lift - 0.9) * (1 - Math.min(1, p / 0.3))) -
        rise * (0.55 + 0.75 * Math.min(1, p / 0.3)),
      a.target[2] + (b.target[2] - a.target[2]) * t,
    );
    // slide the view: the target moves left, so the scene sits to the right.
    // Nothing to keep clear of when the words are underneath
    shotTarget.x -= (a.sx + (b.sx - a.sx) * t) * (1 - narrow * 0.55) * (1 - rise);
    camera.position.set(shotTarget.x, shotTarget.y + Math.sin(el) * dist, shotTarget.z + Math.cos(el) * dist);
    camera.lookAt(shotTarget);
    world.position.set(0, 0, 0);
    world.scale.setScalar(1);
    /* ---- core ---- */
    coreUniforms.uTime.value = time;
    coreUniforms.uCharge.value = arrive;
    coreUniforms.uThink.value = think;
    coreUniforms.uMemory.value = memoryHeld;
    core.scale.setScalar(CORE_SCALE * (0.86 + arrive * 0.14 + think * 0.04 + memoryHeld * 0.1));
    // the threads keep their own slow rotation; the whole ball leans a little
    threads.rotation.set(Math.sin(time * 0.05) * 0.08, time * 0.02, 0);
    glowMat.opacity = arrive * (0.55 + think * 0.3 + memoryHeld * 0.15);
    glowMat.color.copy(CYAN).lerp(CYAN_HOT, think * 0.6);

    /* ---- field ---- */
    fieldMat.uniforms.uTime.value = time;
    fieldMat.uniforms.uAlpha.value = (0.25 + 0.45 * (1 - memoryHeld)) * arrive * (1 - invisible * 0.4);

    /* ---- roles and links ---- */
    nodeMat.opacity = whole * (1 - invisible);
    ringMat.opacity = whole * (1 - invisible);

    const press = span(p, 0.645, 0.67);

    // Who this beat is about. Everyone else recedes, so the path reads.
    const w = (a0: number, b0: number) => span(p, a0 - 0.03, a0 + 0.03) * (1 - span(p, b0 - 0.03, b0 + 0.03));
    const inStory = span(p, 0.32, 0.37) * (1 - span(p, 0.9, 0.96));
    const focus = [0, 0, 0, 0];
    focus[SALES] = w(0.34, 0.46);
    focus[ENGINEER] = Math.max(w(0.46, 0.58), w(0.73, 0.8), w(0.34, 0.46) * 0.35, w(0.8, 0.9) * 0.7);
    focus[PM] = w(0.46, 0.8);
    focus[SALES] = Math.max(focus[SALES], w(0.58, 0.65) * 0.7);
    focus[EXEC] = Math.max(w(0.69, 0.75) * 0.6, w(0.8, 0.9));

    // Who is lit, and when. Nobody has their own colour — a palette of four
    // would be read as four ranks. Colour only ever means state.
    const heat = [0, 0, 0, 0];
    heat[SALES] = pulse(p, 0.34, 0.5);
    heat[ENGINEER] = Math.max(pulse(p, 0.46, 0.6) * 0.9, pulse(p, 0.74, 0.84), pulse(p, 0.8, 0.88) * 0.7);
    heat[PM] = Math.max(pulse(p, 0.52, 0.66), decide * (1 - span(p, 0.74, 0.79)));
    heat[SALES] = Math.max(heat[SALES], pulse(p, 0.58, 0.64) * 0.7);
    // the ping arrives: the executive lights a little, once, and reads
    heat[EXEC] = Math.max(pulse(p, 0.7, 0.76) * 0.5, pulse(p, 0.82, 0.96), span(p, 0.875, 0.888) * (1 - span(p, 0.9, 0.92)));

    for (let i = 0; i < ROLES.length; i++) {
      const appear = clamp((whole - i * 0.06) / 0.55);
      const h = heat[i];
      const recede = inStory * (1 - clamp(focus[i]));
      dimOut[i] = recede;
      const c = NODE.clone().lerp(CYAN_HOT, h);
      c.lerp(NODE_DIM, recede * 0.75);
      // the warm colour is the moment of a person's call, not a rank: on the
      // PM while the decision is made and handed on, gone once it is work;
      // on the executive for the beat in which they call the priority
      const pmCall = decide * (1 - span(p, 0.74, 0.79));
      const execCall = span(p, 0.875, 0.888) * (1 - span(p, 0.9, 0.92));
      if (i === PM) c.lerp(HUMAN_LIT, pmCall * 0.9);
      if (i === EXEC) c.lerp(HUMAN_LIT, execCall * 0.85);

      tmpM.compose(
        rolePos[i],
        tmpQ.identity(),
        tmpS.setScalar(Math.max(0.001, appear * (0.9 + h * 1.0) * (1 - recede * 0.4))),
      );
      nodes.setMatrixAt(i, tmpM);
      nodes.setColorAt(i, c);

      // rings only for whoever is lit; they face the camera (in the cell's frame)
      camLocal.copy(camera.position);
      cell.worldToLocal(camLocal);
      tmpLook.lookAt(rolePos[i], camLocal, camera.up);
      tmpQ.setFromRotationMatrix(tmpLook);
      const ringScale = appear * (0.55 + h * 0.65) * (1 - recede * 0.5);
      // the decision ring around the executive is wider still
      ringWorld[i] = Math.max(0.245 * ringScale, i === PM ? 0.345 * decisionRing.scale.x * (decisionMat.opacity > 0.01 ? 1 : 0) : 0);
      tmpM.compose(rolePos[i], tmpQ, tmpS.setScalar(Math.max(0.001, ringScale)));
      nodeRings.setMatrixAt(i, tmpM);
      nodeRings.setColorAt(i, c.clone().multiplyScalar(0.25 + h * 0.75));
    }
    nodes.instanceMatrix.needsUpdate = true;
    nodeRings.instanceMatrix.needsUpdate = true;
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
    if (nodeRings.instanceColor) nodeRings.instanceColor.needsUpdate = true;

    for (let i = 0; i < linkMats.length; i++) {
      const m = linkMats[i];
      m.uniforms.uDraw.value = clamp((whole - i * 0.05) / 0.5);
      // the paths in use this beat are drawn firmly; the rest stay faint
      m.uniforms.uOpacity.value = (0.1 + clamp(focus[i]) * inStory * 0.45) * (1 - invisible);
      m.uniforms.uColor.value.copy(SLATE).lerp(BLUE, 0.35);
      m.uniforms.uFlow.value = -1;
      m.uniforms.uFlowAmt.value = 0;
    }

    // 01 ANSWER — sales asks, the hub answers. The engineer is never touched.
    inbound(SALES, p, 0.34, 0.4, CYAN_HOT);
    outbound(SALES, p, 0.4, 0.46, CYAN_HOT);

    // 02 ASK — the engineer asks; one path opens, to the PM, with the background
    inbound(ENGINEER, p, 0.46, 0.52, CYAN_HOT);
    outbound(PM, p, 0.52, 0.58, CYAN_HOT);

    // 03 DECIDE — the hub gathers what sales knows of the customer and hands
    // it to the PM; the PM decides. The executive is told, not asked: a dim
    // ping, and no reply comes back.
    inbound(SALES, p, 0.58, 0.62, CYAN);
    outbound(PM, p, 0.61, 0.65, CYAN_HOT);
    inbound(PM, p, 0.665, 0.7, HUMAN_LIT);
    outbound(EXEC, p, 0.69, 0.725, BLUE_PALE, 0.55);

    // 04 ACT — back to the engineer, the decision with the grounds for it
    outbound(ENGINEER, p, 0.745, 0.8, warmCyan);

    // 05 VISIBILITY — the engineer's unpolished word comes in to the hub, and
    // goes on to the executive unasked, with where C stands
    inbound(ENGINEER, p, 0.81, 0.84, CYAN_HOT);
    outbound(EXEC, p, 0.835, 0.865, warmCyan, 0.95);

    /* ---- the decision: one person, one warm mark ---- */
    camLocal.copy(camera.position);
    cell.worldToLocal(camLocal);
    tmpLook.lookAt(rolePos[PM], camLocal, camera.up);
    decisionRing.position.copy(rolePos[PM]);
    decisionRing.quaternion.setFromRotationMatrix(tmpLook);
    decisionWave.position.copy(rolePos[PM]);
    decisionWave.quaternion.copy(decisionRing.quaternion);
    // the mark stays on the person who decided, quieter once the work has moved on
    // the ring around the PM lasts while the decision is theirs to hand on,
    // and is gone once it has become the engineer's work
    decisionMat.opacity = press * (1 - invisible) * (1 - act * 0.35) * (1 - span(p, 0.74, 0.79));
    decisionRing.scale.setScalar(0.4 + (1 - Math.pow(1 - press, 3)) * 0.6);
    // a short ripple; the PM is close to the camera here, so it stays small
    // over before the ACT caption arrives (0.70) and the ring turns away (0.71)
    const ripple = pulse(p, 0.672, 0.70);
    decisionWaveMat.opacity = ripple * 0.4;
    decisionWave.scale.setScalar(1 + ripple * 0.6);

    /* ---- what the company now owns ---- */
    memMat.uniforms.uTime.value = time;
    memMat.uniforms.uFill.value = memoryHeld;

    renderer.render(scene, camera);
  };

  const projectRoles = (out: { x: number; y: number; depth: number; visible: boolean; dim: number; r: number }[]) => {
    const v = new THREE.Vector3();
    const e = new THREE.Vector3();
    const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
    for (let i = 0; i < ROLES.length; i++) {
      v.copy(rolePos[i]);
      cell.localToWorld(v);
      const depth = v.distanceTo(camera.position);
      // a point one ring radius to the side, in screen terms
      e.copy(v).addScaledVector(right, ringWorld[i]);
      v.project(camera);
      e.project(camera);
      out[i] = {
        x: (v.x * 0.5 + 0.5) * width,
        y: (-v.y * 0.5 + 0.5) * height,
        depth,
        visible: v.z < 1,
        dim: dimOut[i],
        r: Math.abs(e.x - v.x) * 0.5 * width,
      };
    }
  };

  const projectCore = (out: { x: number; y: number; r: number }) => {
    const v = new THREE.Vector3(0, 0, 0);
    core.localToWorld(v);
    // a point just outside the threads, straight up in screen terms. The dark
    // disc is wider, but words may sit on the disc; only the threads are kept
    // clear.
    const s = new THREE.Vector3();
    core.getWorldScale(s);
    camUp.setFromMatrixColumn(camera.matrixWorld, 1);
    const edge = v.clone().addScaledVector(camUp, (R_THREAD + 0.06) * s.y);
    v.project(camera);
    edge.project(camera);
    out.x = (v.x * 0.5 + 0.5) * width;
    out.y = (-v.y * 0.5 + 0.5) * height;
    out.r = Math.abs((edge.y - v.y) * 0.5 * height);
  };

  const dispose = () => {
    canvas.removeEventListener("webglcontextlost", onLost);
    glowTex.dispose();
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const m = mesh.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else if (m) m.dispose();
    });
    renderer.dispose();
  };

  return { render, resize, setStacked, dispose, projectRoles, projectCore };
}
