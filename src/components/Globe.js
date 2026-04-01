"use client";

import createGlobe from "cobe";
import { useEffect, useRef, useState } from "react";

const ARC_HEIGHT = 0.1;

// 7 routes spread across the globe
const AIRPORTS = {
  JFK: { location: [40.64, -73.78],  city: "New York",    code: "JFK" },
  LHR: { location: [51.47,  -0.45],  city: "London",      code: "LHR" },
  DXB: { location: [25.25,  55.36],  city: "Dubai",       code: "DXB" },
  SIN: { location: [ 1.36, 103.99],  city: "Singapore",   code: "SIN" },
  LAX: { location: [33.94,-118.41],  city: "Los Angeles", code: "LAX" },
  HND: { location: [35.55, 139.78],  city: "Tokyo",       code: "HND" },
  SYD: { location: [-33.95, 151.18], city: "Sydney",      code: "SYD" },
  GRU: { location: [-23.43, -46.47], city: "São Paulo",   code: "GRU" },
  CDG: { location: [48.86,   2.35],  city: "Paris",       code: "CDG" },
  BOM: { location: [19.09,  72.87],  city: "Mumbai",      code: "BOM" },
  FRA: { location: [50.04,   8.57],  city: "Frankfurt",   code: "FRA" },
  NBO: { location: [-1.32,  36.93],  city: "Nairobi",     code: "NBO" },
  PEK: { location: [39.91, 116.39],  city: "Beijing",     code: "PEK" },
};

const ROUTES = [
  { from: AIRPORTS.JFK, to: AIRPORTS.LHR, duration: 6000, offset: 0.00 },
  { from: AIRPORTS.DXB, to: AIRPORTS.SIN, duration: 5000, offset: 0.30 },
  { from: AIRPORTS.LAX, to: AIRPORTS.HND, duration: 7000, offset: 0.60 },
  { from: AIRPORTS.SYD, to: AIRPORTS.DXB, duration: 8000, offset: 0.15 },
  { from: AIRPORTS.GRU, to: AIRPORTS.CDG, duration: 6500, offset: 0.50 },
  { from: AIRPORTS.BOM, to: AIRPORTS.FRA, duration: 5500, offset: 0.20 },
  { from: AIRPORTS.NBO, to: AIRPORTS.PEK, duration: 7000, offset: 0.75 },
];

// Unique nodes from all route endpoints
const NODES = Object.values(
  ROUTES.flatMap(r => [r.from, r.to])
    .reduce((acc, a) => { acc[a.code] = a; return acc; }, {})
);

const FLIGHT_ARCS = ROUTES.map(({ from, to }) => ({
  from: from.location,
  to:   to.location,
}));

// ── Math helpers ─────────────────────────────────────────────────────
function latLngTo3D([lat, lng]) {
  const r = lat * Math.PI / 180;
  const a = lng * Math.PI / 180 - Math.PI;
  const c = Math.cos(r);
  return [c * (-Math.cos(a)), Math.sin(r), c * Math.sin(a)];
}

function norm3([x, y, z]) {
  const l = Math.sqrt(x*x + y*y + z*z);
  return l > 0 ? [x/l, y/l, z/l] : [0, 1, 0];
}

// Quadratic Bezier along arc — mirrors COBE's internal arc shader
function arcPoint(from, to, t) {
  const R  = 0.8;
  const p0 = latLngTo3D(from).map(v => v * R);
  const p2 = latLngTo3D(to).map(v => v * R);
  const p1 = norm3([p0[0]+p2[0], p0[1]+p2[1], p0[2]+p2[2]]).map(v => v * (R + ARC_HEIGHT));
  const b  = 1 - t;
  return [
    b*b*p0[0] + 2*b*t*p1[0] + t*t*p2[0],
    b*b*p0[1] + 2*b*t*p1[1] + t*t*p2[1],
    b*b*p0[2] + 2*b*t*p1[2] + t*t*p2[2],
  ];
}

// Project a 3-D point → { x, y } in [0,1]² and visibility flag
function project3D(pos, phi, theta) {
  const cp = Math.cos(phi), sp = Math.sin(phi);
  const ct = Math.cos(theta), st = Math.sin(theta);
  const c = cp * pos[0] + sp * pos[2];
  const s = sp * st * pos[0] + ct * pos[1] - cp * st * pos[2];
  const d = -sp * ct * pos[0] + st * pos[1] + cp * ct * pos[2];
  return { x: (c + 1) / 2, y: (-s + 1) / 2, visible: d >= 0 };
}

function projectLatLng(loc, phi, theta) {
  return project3D(latLngTo3D(loc), phi, theta);
}

// ── Component ────────────────────────────────────────────────────────
export default function Globe({ className = "" }) {
  const containerRef = useRef(null);
  const stateRef     = useRef({ phi: 0.6, theta: 0.2, autoRotate: true });
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fresh canvas each mount (avoids COBE DOM-manipulation conflicts in Strict Mode)
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "width:100%;height:100%;cursor:grab;";
    container.appendChild(canvas);

    const size = container.offsetWidth;
    const dpr  = Math.min(window.devicePixelRatio, 3);
    canvas.width  = size * dpr;
    canvas.height = size * dpr;

    const state = stateRef.current;
    let rafId;

    const globe = createGlobe(canvas, {
      devicePixelRatio: dpr,
      width:  size * 3,
      height: size * 3,
      phi:    state.phi,
      theta:  state.theta,
      dark: 0,
      diffuse: 1.8,
      mapSamples: 20000,
      mapBrightness: 4,
      baseColor:   [0.92, 0.95, 1.0],
      markerColor: [0.024, 0.251, 0.678],
      glowColor:   [0.8, 0.88, 1.0],
      markers: NODES.map(a => ({ location: a.location, size: 0.04 })),
      arcColor:  [0.024, 0.251, 0.678],
      arcHeight: ARC_HEIGHT,
      arcWidth:  0.3,
      arcs: FLIGHT_ARCS,
    });

    // One ✈️ emoji per route, animated along the arc each frame
    const flightEls = ROUTES.map(() => {
      const el = document.createElement("div");
      el.textContent = "✈️";
      el.style.cssText = `
        position: absolute;
        font-size: 15px;
        line-height: 1;
        transform-origin: center center;
        z-index: 5;
        pointer-events: none;
        user-select: none;
        filter: drop-shadow(0 1px 3px rgba(0,0,0,0.25));
      `;
      container.appendChild(el);
      return el;
    });

    function animate() {
      if (state.autoRotate) state.phi += 0.003;
      globe.update({ phi: state.phi, theta: state.theta });

      const now = performance.now();

      for (let i = 0; i < ROUTES.length; i++) {
        const { from, to, duration, offset } = ROUTES[i];
        const el = flightEls[i];

        const t  = ((now + offset * duration) % duration) / duration;
        const t2 = Math.min(t + 0.005, 1);

        const p  = project3D(arcPoint(from.location, to.location, t),  state.phi, state.theta);
        const p2 = project3D(arcPoint(from.location, to.location, t2), state.phi, state.theta);

        const angle = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI;

        el.style.left      = `${p.x * 100}%`;
        el.style.top       = `${p.y * 100}%`;
        el.style.opacity   = p.visible ? "1" : "0";
        el.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    }
    rafId = requestAnimationFrame(animate);

    // ── Drag to rotate ──────────────────────────────────────────────
    let drag = null;

    function onPointerDown(e) {
      drag = { x: e.clientX, y: e.clientY, phi: state.phi, theta: state.theta, moved: false };
      state.autoRotate = false;
      canvas.style.cursor = "grabbing";
      e.preventDefault();
    }
    function onPointerMove(e) {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;
      state.phi   = drag.phi   + dx * 0.008;
      state.theta = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, drag.theta + dy * 0.008));
    }
    function onPointerUp(e) {
      if (!drag) return;
      if (!drag.moved) handleClick(e);
      drag = null;
      canvas.style.cursor = "grab";
      setTimeout(() => { state.autoRotate = true; }, 2000);
    }

    // ── Node click → tooltip ────────────────────────────────────────
    function handleClick(e) {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width;
      const my = (e.clientY - rect.top)  / rect.height;
      let hit = null, minDist = 0.07;
      for (const airport of NODES) {
        const p = projectLatLng(airport.location, state.phi, state.theta);
        if (!p.visible) continue;
        const d = Math.hypot(mx - p.x, my - p.y);
        if (d < minDist) { minDist = d; hit = { airport, x: p.x, y: p.y }; }
      }
      setTooltip(hit);
    }

    canvas.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup",   onPointerUp);

    const tm = t => ({ clientX: t.clientX, clientY: t.clientY, preventDefault: () => {} });
    canvas.addEventListener("touchstart", e => onPointerDown(tm(e.touches[0])),        { passive: true });
    window.addEventListener("touchmove",  e => onPointerMove(tm(e.touches[0])),        { passive: true });
    window.addEventListener("touchend",   e => onPointerUp(tm(e.changedTouches[0])));

    return () => {
      cancelAnimationFrame(rafId);
      globe.destroy();
      container.innerHTML = "";
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup",   onPointerUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ width: "100%", height: "100%", aspectRatio: "1 / 1" }}
    >
      {tooltip && <div className="fixed inset-0 z-10" onClick={() => setTooltip(null)} />}
      {tooltip && (
        <div
          className="absolute z-20 pointer-events-none"
          style={{
            left: `${tooltip.x * 100}%`,
            top:  `${tooltip.y * 100}%`,
            transform: "translate(-50%, calc(-100% - 10px))",
          }}
        >
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-2.5 text-center min-w-[110px]">
            <p className="font-satoshi font-bold text-sm text-[var(--color-primary)]">{tooltip.airport.code}</p>
            <p className="font-satoshi text-xs text-gray-500 mt-0.5">{tooltip.airport.city}</p>
          </div>
          <div className="w-2.5 h-2.5 bg-white border-b border-r border-gray-100 rotate-45 mx-auto -mt-1.5" />
        </div>
      )}
    </div>
  );
}
