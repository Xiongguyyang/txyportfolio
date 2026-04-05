"use client";
import { useEffect, useRef } from "react";

// ─── Math helpers ─────────────────────────────────────────────────────────────
const TAU = Math.PI * 2;
const rnd = (a: number, b: number) => Math.random() * (b - a) + a;
function gauss(μ = 0, σ = 1) {
  let u = 0, v = 0;
  while (!u) u = Math.random();
  while (!v) v = Math.random();
  return μ + σ * Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v);
}
const hex2rgb = (h: string): [number, number, number] => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

// ─── Background star palettes ─────────────────────────────────────────────────
const CORE = ["#fff8f0", "#ffe8c8", "#ffd8a0", "#ffc878", "#ffffff", "#fffaf4", "#ffede0"];
const DISK = [
  "#cce0ff", "#b8d0ff", "#a8c4ff", "#d8e8ff", "#e8f0ff",
  "#ffffff", "#f8f8ff", "#f4f4ff",
  "#ffd080", "#ffb84a", "#ffa030", "#ff8820",
  "#e0b0ff", "#c890f0", "#b070e0", "#9860c8",
  "#90b8d8", "#70a0c0", "#5a8caa",
  "#ffc090", "#ffaa70", "#ff9050",
  "#ffeecc", "#ffd8a0",
];
const HALO = ["#a0b8d0", "#b0c8e0", "#c0d0e8", "#d0d8ff", "#e8e8ff", "#f0f0f0"];

// ─── Named / landmark stars ───────────────────────────────────────────────────
interface NamedStar {
  name: string;
  ox: number; oy: number; oz: number;
  r: number; g: number; b: number;
  sz: number;
  eightSpike: boolean;
  isEarth: boolean;
}

// rf values start at 0.30+ so named stars render outside the centre image area
const NS_TMPL: {
  name: string; rf: number; θ: number; yf: number;
  col: [number, number, number]; sz: number; eightSpike?: boolean; isEarth?: boolean;
}[] = [
    { name: "Earth", rf: 0.30, θ: 0.50, yf: 0.000, col: [80, 180, 255], sz: 2.5, isEarth: true },
    { name: "Proxima Centauri", rf: 0.33, θ: 0.60, yf: 0.008, col: [255, 70, 45], sz: 3.5 },
    { name: "α Cen A", rf: 0.35, θ: 0.65, yf: 0.009, col: [255, 240, 185], sz: 5.5 },
    { name: "α Cen B", rf: 0.34, θ: 0.70, yf: 0.009, col: [255, 175, 90], sz: 4.5 },
    { name: "Barnard's Star", rf: 0.38, θ: 2.00, yf: 0.012, col: [210, 55, 35], sz: 3.2 },
    { name: "Wolf 359", rf: 0.42, θ: 3.40, yf: -0.010, col: [185, 42, 25], sz: 2.8 },
    { name: "Lalande 21185", rf: 0.44, θ: 4.70, yf: 0.015, col: [205, 65, 40], sz: 3.0 },
    { name: "Sirius", rf: 0.47, θ: 5.50, yf: -0.012, col: [200, 225, 255], sz: 8.0, eightSpike: true },
    { name: "Luyten 726-8", rf: 0.45, θ: 2.55, yf: 0.008, col: [185, 42, 25], sz: 2.8 },
    { name: "Ross 154", rf: 0.49, θ: 1.30, yf: -0.008, col: [195, 50, 30], sz: 2.8 },
    { name: "Ross 248", rf: 0.51, θ: 4.20, yf: 0.010, col: [195, 50, 30], sz: 2.8 },
  ];

function buildNamedStars(R: number): NamedStar[] {
  return NS_TMPL.map(t => ({
    name: t.name,
    ox: Math.cos(t.θ) * t.rf * R,
    oy: t.yf * R,
    oz: Math.sin(t.θ) * t.rf * R,
    r: t.col[0], g: t.col[1], b: t.col[2],
    sz: t.sz,
    eightSpike: t.eightSpike ?? false,
    isEarth: t.isEarth ?? false,
  }));
}

// ─── Shooting stars ───────────────────────────────────────────────────────────
interface Shooter {
  x: number; y: number;
  vx: number; vy: number;   // sign of vx encodes direction
  len: number;
  alpha: number;
  fade: number;
  pink: boolean;            // true = pink/purple LTR  |  false = blue RTL
}

// Right → Left  (blue)
function spawnBlue(W: number, H: number): Shooter {
  const speed = rnd(10, 20);
  const angle = rnd(-0.18, 0.14);
  return {
    x: W + rnd(60, 200), y: rnd(H * 0.04, H * 0.72),
    vx: -speed * Math.cos(angle), vy: speed * Math.sin(angle),
    len: rnd(100, 200), alpha: rnd(0.75, 1.0), fade: rnd(0.007, 0.014),
    pink: false,
  };
}

// Left → Right  (pink / purple)
function spawnPink(W: number, H: number): Shooter {
  const speed = rnd(10, 20);
  const angle = rnd(-0.14, 0.18);
  return {
    x: -rnd(60, 200), y: rnd(H * 0.04, H * 0.72),
    vx: speed * Math.cos(angle), vy: speed * Math.sin(angle),
    len: rnd(100, 200), alpha: rnd(0.75, 1.0), fade: rnd(0.007, 0.014),
    pink: true,
  };
}

// ─── Background star interface ────────────────────────────────────────────────
interface Star {
  ox: number; oy: number; oz: number;
  sz: number;
  r: number; g: number; b: number;
  op: number;
}

function buildGalaxy(W: number, H: number): Star[] {
  const out: Star[] = [];
  const R = Math.min(W, H) * 0.44;
  const pick = (pal: string[]) => hex2rgb(pal[Math.floor(Math.random() * pal.length)]);
  const add = (ox: number, oy: number, oz: number, sz: number, pal: string[], op: number) => {
    const [r, g, b] = pick(pal);
    out.push({ ox, oy, oz, sz, r, g, b, op });
  };

  for (let i = 0; i < 800; i++) {
    const r = Math.abs(gauss(0, 0.13)) * R, θ = rnd(0, TAU);
    add(r * Math.cos(θ), gauss(0, r * 0.32), r * Math.sin(θ),
      rnd(0.5, 3.5) * (1 - (r / R) * 0.45), CORE, rnd(0.55, 1));
  }
  for (let arm = 0; arm < 3; arm++) {
    const offset = (arm / 3) * TAU;
    for (let i = 0; i < 1050; i++) {
      const t = i / 1050;
      const rad = Math.pow(t, 0.55) * R;
      const θ = offset + t * TAU * 1.7;
      const sp = rad * 0.2 + R * 0.022;
      add(rad * Math.cos(θ) + gauss(0, sp), gauss(0, R * 0.023 * (1 - t * 0.6)),
        rad * Math.sin(θ) + gauss(0, sp), rnd(0.3, 2.4) * (1 - t * 0.28),
        DISK, rnd(0.4, 1) * (0.5 + 0.5 * (1 - t * 0.38)));
    }
  }
  for (let i = 0; i < 1100; i++) {
    const rad = Math.pow(Math.random(), 0.5) * R * 0.92, θ = rnd(0, TAU);
    add(rad * Math.cos(θ) + gauss(0, R * 0.04), gauss(0, R * 0.017),
      rad * Math.sin(θ) + gauss(0, R * 0.04), rnd(0.2, 0.95), DISK, rnd(0.14, 0.48));
  }
  for (let i = 0; i < 700; i++) {
    const r = Math.abs(gauss(0, 0.52)) * R * 1.8;
    const θ = rnd(0, TAU), φ = rnd(0, TAU);
    add(r * Math.cos(θ) * Math.cos(φ), r * Math.sin(φ), r * Math.sin(θ) * Math.cos(φ),
      rnd(0.18, 0.65), HALO, rnd(0.05, 0.28));
  }
  return out;
}

// ─── Component ────────────────────────────────────────────────────────────────
interface Props { onEarthClick?: () => void }

export default function GalaxyCanvas({ onEarthClick }: Props) {
  const cvs = useRef<HTMLCanvasElement>(null);
  const rot = useRef(0);
  const stars = useRef<Star[]>([]);
  const namedStars = useRef<NamedStar[]>([]);
  const shooters = useRef<Shooter[]>([]);
  const spawnBlueIn = useRef(rnd(40, 90));
  const spawnPinkIn = useRef(rnd(55, 110));
  const earthPos = useRef({ sx: -9999, sy: -9999 }); // screen pos of Earth
  const raf = useRef(0);

  useEffect(() => {
    const canvas = cvs.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      stars.current = buildGalaxy(W, H);
      namedStars.current = buildNamedStars(Math.min(W, H) * 0.44);
    };
    resize();
    window.addEventListener("resize", resize);

    // Earth click / hover detection
    const HIT = 30;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const dx = e.clientX - r.left - earthPos.current.sx;
      const dy = e.clientY - r.top - earthPos.current.sy;
      canvas.style.cursor = dx * dx + dy * dy < HIT * HIT ? "pointer" : "default";
    };
    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const dx = e.clientX - r.left - earthPos.current.sx;
      const dy = e.clientY - r.top - earthPos.current.sy;
      if (dx * dx + dy * dy < HIT * HIT) onEarthClick?.();
    };
    canvas.addEventListener("mousemove", onMove, { passive: true });
    canvas.addEventListener("click", onClick);

    const TILT = Math.PI * 0.3;
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT);

    const project = (ox: number, oy: number, oz: number, cosR: number, sinR: number, R: number, FOV: number) => {
      const rx = ox * cosR + oz * sinR;
      const rz = -ox * sinR + oz * cosR;
      const ty = oy * cosT - rz * sinT;
      const tz = oy * sinT + rz * cosT;
      const sc = FOV / Math.max(FOV + tz + R * 0.25, 1);
      return { sx: rx * sc + W / 2, sy: ty * sc + H / 2, sc };
    };

    const frame = () => {
      rot.current += 0.00055;
      const cosR = Math.cos(rot.current), sinR = Math.sin(rot.current);
      const R = Math.min(W, H) * 0.44;
      const cx = W / 2, cy = H / 2;
      const FOV = Math.min(W, H) * 0.9;

      // ── 1. Background ─────────────────────────────────────────────────────
      ctx.fillStyle = "#010211";
      ctx.fillRect(0, 0, W, H);

      // ── 2. Nebula blobs ───────────────────────────────────────────────────
      ctx.globalCompositeOperation = "screen";
      const blob = (x: number, y: number, r: number, rgb: string, a: number) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${rgb},${a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      };
      blob(cx, cy, R * 0.44, "255,215,135", 0.14);
      blob(cx + R * 0.46, cy - R * 0.14, R * 0.54, "72,108,215", 0.07);
      blob(cx - R * 0.38, cy + R * 0.22, R * 0.48, "155,75,248", 0.07);
      blob(cx + R * 0.10, cy + R * 0.33, R * 0.40, "50,158,228", 0.05);

      // ── 3. Background stars ───────────────────────────────────────────────
      ctx.globalCompositeOperation = "lighter";
      for (const s of stars.current) {
        const { sx, sy, sc } = project(s.ox, s.oy, s.oz, cosR, sinR, R, FOV);
        if (sx < -70 || sx > W + 70 || sy < -70 || sy > H + 70) continue;
        const size = Math.max(0.22, s.sz * sc * 0.88);
        const alpha = Math.min(0.95, s.op * Math.min(1.85, sc * 1.45));
        if (alpha < 0.018) continue;
        ctx.fillStyle = `rgba(${s.r},${s.g},${s.b},${alpha})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, TAU);
        ctx.fill();
        if (size > 1.6 && alpha > 0.72) {
          const fl = size * 11;
          ctx.strokeStyle = `rgba(${s.r},${s.g},${s.b},${Math.min(0.32, alpha * 0.22)})`;
          ctx.lineWidth = Math.max(0.4, size * 0.28);
          ctx.beginPath();
          ctx.moveTo(sx - fl, sy); ctx.lineTo(sx + fl, sy);
          ctx.moveTo(sx, sy - fl); ctx.lineTo(sx, sy + fl);
          ctx.stroke();
        }
      }

      // ── 4. Named stars — glow + core + spikes ─────────────────────────────
      ctx.globalCompositeOperation = "lighter";
      for (const ns of namedStars.current) {
        const { sx, sy, sc } = project(ns.ox, ns.oy, ns.oz, cosR, sinR, R, FOV);
        if (ns.isEarth) earthPos.current = { sx, sy }; // keep Earth pos updated
        if (sx < -80 || sx > W + 80 || sy < -80 || sy > H + 80) continue;
        const size = ns.sz * sc;
        const alpha = Math.min(1, sc * 1.5);

        const gr = size * 5.5;
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, gr);
        grd.addColorStop(0, `rgba(${ns.r},${ns.g},${ns.b},${alpha * 0.55})`);
        grd.addColorStop(0.35, `rgba(${ns.r},${ns.g},${ns.b},${alpha * 0.18})`);
        grd.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grd;
        ctx.beginPath(); ctx.arc(sx, sy, gr, 0, TAU); ctx.fill();

        ctx.fillStyle = `rgba(${ns.r},${ns.g},${ns.b},${Math.min(1, alpha)})`;
        ctx.beginPath(); ctx.arc(sx, sy, Math.max(1, size * 0.55), 0, TAU); ctx.fill();

        ctx.fillStyle = `rgba(255,255,255,${alpha * (ns.isEarth ? 0.5 : 0.75)})`;
        ctx.beginPath(); ctx.arc(sx, sy, Math.max(0.5, size * 0.22), 0, TAU); ctx.fill();

        const fl = size * 14;
        ctx.strokeStyle = `rgba(${ns.r},${ns.g},${ns.b},${alpha * 0.38})`;
        ctx.lineWidth = Math.max(0.5, size * 0.25);
        ctx.beginPath();
        ctx.moveTo(sx - fl, sy); ctx.lineTo(sx + fl, sy);
        ctx.moveTo(sx, sy - fl); ctx.lineTo(sx, sy + fl);
        ctx.stroke();

        if (ns.eightSpike) {
          const d = fl * 0.68;
          ctx.strokeStyle = `rgba(${ns.r},${ns.g},${ns.b},${alpha * 0.22})`;
          ctx.beginPath();
          ctx.moveTo(sx - d, sy - d); ctx.lineTo(sx + d, sy + d);
          ctx.moveTo(sx + d, sy - d); ctx.lineTo(sx - d, sy + d);
          ctx.stroke();
        }
        if (ns.isEarth) {
          ctx.strokeStyle = `rgba(80,200,255,${alpha * 0.45})`;
          ctx.lineWidth = Math.max(0.5, size * 0.18);
          ctx.beginPath();
          ctx.ellipse(sx, sy, size * 1.8, size * 0.55, -0.4, 0, TAU);
          ctx.stroke();
        }
      }

      // ── 5. Core bloom ─────────────────────────────────────────────────────
      ctx.globalCompositeOperation = "screen";
      const bloom = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.28);
      bloom.addColorStop(0, "rgba(255,250,225,0.78)");
      bloom.addColorStop(0.22, "rgba(255,215,125,0.24)");
      bloom.addColorStop(0.55, "rgba(195,158,255,0.09)");
      bloom.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = bloom;
      ctx.fillRect(0, 0, W, H);

      // ── 6. Vignette ───────────────────────────────────────────────────────
      ctx.globalCompositeOperation = "source-over";
      const vig = ctx.createRadialGradient(cx, cy, R * 0.38, cx, cy, Math.max(W, H) * 0.84);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,1,10,0.92)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── 7. Shooting stars ─────────────────────────────────────────────────
      // Spawn blue (right → left)
      spawnBlueIn.current -= 1;
      if (spawnBlueIn.current <= 0) {
        shooters.current.push(spawnBlue(W, H));
        spawnBlueIn.current = rnd(40, 90);
      }
      // Spawn pink (left → right)
      spawnPinkIn.current -= 1;
      if (spawnPinkIn.current <= 0) {
        shooters.current.push(spawnPink(W, H));
        spawnPinkIn.current = rnd(55, 110);
      }

      ctx.globalCompositeOperation = "lighter";
      ctx.lineCap = "round";
      shooters.current = shooters.current.filter(sh => {
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.alpha -= sh.fade;

        // Expired: faded out or exited canvas in travel direction
        const offscreen = sh.pink ? sh.x > W + sh.len + 20
          : sh.x < -sh.len - 20;
        if (sh.alpha <= 0 || offscreen) return false;

        // Tail extends opposite to velocity direction
        const tailScale = sh.len / Math.sqrt(sh.vx * sh.vx + sh.vy * sh.vy);
        const tx = sh.x - sh.vx * tailScale;
        const ty = sh.y - sh.vy * tailScale;

        // Colour tokens
        const c0 = sh.pink ? `255,100,220` : `160,210,255`; // head
        const c1 = sh.pink ? `180,60,255` : `60,120,255`;  // mid
        const c2 = sh.pink ? `120,30,200` : `30,80,255`;   // tail tip
        const hc = sh.pink ? `255,180,255` : `220,240,255`; // head dot

        // Wide soft glow trail
        const grad = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        grad.addColorStop(0, `rgba(${c0},${sh.alpha})`);
        grad.addColorStop(0.15, `rgba(${c1},${sh.alpha * 0.8})`);
        grad.addColorStop(0.5, `rgba(${c1},${sh.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(${c2},0)`);
        ctx.lineWidth = 4.5;
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // Thin bright core streak
        const gradCore = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        gradCore.addColorStop(0, `rgba(255,245,255,${sh.alpha})`);
        gradCore.addColorStop(0.3, `rgba(${c0},${sh.alpha * 0.6})`);
        gradCore.addColorStop(1, `rgba(${c1},0)`);
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = gradCore;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();

        // Head glow dot
        const hg = ctx.createRadialGradient(sh.x, sh.y, 0, sh.x, sh.y, 9);
        hg.addColorStop(0, `rgba(${hc},${sh.alpha * 0.95})`);
        hg.addColorStop(0.4, `rgba(${c0},${sh.alpha * 0.4})`);
        hg.addColorStop(1, `rgba(${c1},0)`);
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 9, 0, TAU);
        ctx.fill();

        return true;
      });

      // ── 8. Named star labels (always on top) ──────────────────────────────
      ctx.globalCompositeOperation = "source-over";
      ctx.textBaseline = "middle";

      for (const ns of namedStars.current) {
        const { sx, sy, sc } = project(ns.ox, ns.oy, ns.oz, cosR, sinR, R, FOV);
        if (sx < -40 || sx > W + 40 || sy < -40 || sy > H + 40) continue;
        const size = ns.sz * sc;
        const alpha = Math.min(0.9, sc * 1.4);
        if (alpha < 0.15) continue;

        const fontSize = Math.max(8, Math.min(11, 10 * sc));
        ctx.font = `${fontSize}px "Courier New", monospace`;
        const label = ns.isEarth ? `🌍 ${ns.name}` : ns.name;
        const tw = ctx.measureText(label).width;
        const tx = sx + size * 1.1 + 6;
        const ty = sy - size * 0.4;

        ctx.fillStyle = "rgba(0,2,18,0.72)";
        ctx.beginPath();
        ctx.roundRect(tx - 3, ty - fontSize * 0.65, tw + 6, fontSize * 1.3, 3);
        ctx.fill();

        ctx.strokeStyle = `rgba(${ns.r},${ns.g},${ns.b},${alpha * 0.35})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(sx + size * 0.6, sy);
        ctx.lineTo(tx - 2, ty);
        ctx.stroke();

        ctx.fillStyle = ns.isEarth
          ? `rgba(120,210,255,${Math.min(0.92, alpha * 1.1)})`
          : ns.eightSpike
            ? `rgba(200,225,255,${Math.min(0.92, alpha * 1.1)})`
            : ns.r > 200 && ns.g < 100
              ? `rgba(255,170,140,${Math.min(0.92, alpha * 1.1)})`
              : `rgba(255,240,190,${Math.min(0.92, alpha * 1.1)})`;
        ctx.fillText(label, tx, ty);
      }

      raf.current = requestAnimationFrame(frame);
    };

    frame();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("click", onClick);
    };
  }, [onEarthClick]);

  return (
    <canvas
      ref={cvs}
      aria-hidden
      className="absolute inset-0 w-full h-full"
    />
  );
}
