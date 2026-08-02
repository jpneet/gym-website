import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FIRST_FRAME = 2;
const TOTAL_FRAMES = 299;
const FRAME_DIR = '/frames/';
const PRELOAD_BATCH = 20;

function frameSrc(index: number): string {
  const num = index + FIRST_FRAME;
  return `${FRAME_DIR}${String(num).padStart(3, '0')}.png`;
}

export function useFrameSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  triggerRef: React.RefObject<HTMLElement | null>
) {
  const frames = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const currentIdx = useRef(0);
  const lastDrawn = useRef(-1);
  const rafId = useRef(0);
  const isRunning = useRef(false);

  // ── draw helpers ──────────────────────────────────
  const drawFrameAt = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = frames.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (index === lastDrawn.current) return;
    lastDrawn.current = index;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;

    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, W, H);

    // fill background
    ctx.fillStyle = '#210C08';
    ctx.fillRect(0, 0, W, H);

    // cover-fit + watermark offset
    const imgR = img.naturalWidth / img.naturalHeight;
    const canR = W / H;
    let dw: number, dh: number, dx: number, dy: number;
    if (canR > imgR) {
      dw = W; dh = W / imgR; dx = 0; dy = (H - dh) / 2;
    } else {
      dh = H; dw = H * imgR; dx = (W - dw) / 2; dy = 0;
    }
    dx += W * 0.22;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, dx, dy, dw, dh);
  }, [canvasRef]);

  // ── RAF render loop ───────────────────────────────
  const startLoop = useCallback(() => {
    if (isRunning.current) return;
    isRunning.current = true;
    const loop = () => {
      drawFrameAt(currentIdx.current);
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
  }, [drawFrameAt]);

  const stopLoop = useCallback(() => {
    isRunning.current = false;
    cancelAnimationFrame(rafId.current);
  }, []);

  // ── Preload ───────────────────────────────────────
  const preloadFrames = useCallback((): Promise<void> => {
    return new Promise((resolve) => {
      let firstResolved = false;

      const loadOne = (i: number) => {
        const img = new Image();
        img.src = frameSrc(i);
        img.onload = () => {
          frames.current[i] = img;
          if (i === 0 && !firstResolved) {
            firstResolved = true;
            resolve();
          }
        };
        img.onerror = () => {
          if (i === 0 && !firstResolved) {
            firstResolved = true;
            resolve(); // fallback: resolve anyway
          }
        };
      };

      // Batch load — first batch immediately, rest deferred
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        if (i < PRELOAD_BATCH) {
          loadOne(i);
        } else {
          setTimeout(() => loadOne(i), 0);
        }
      }
    });
  }, []);

  // ── ScrollTrigger sync ────────────────────────────
  useEffect(() => {
    const trigger = triggerRef.current;
    const canvas = canvasRef.current;
    if (!trigger || !canvas) return;

    let st: ScrollTrigger;

    const setup = async () => {
      await preloadFrames();

      // Initial draw
      drawFrameAt(0);
      startLoop();

      st = ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.round(self.progress * (TOTAL_FRAMES - 1));
          currentIdx.current = idx;
        },
      });
    };

    setup();

    const handleResize = () => {
      lastDrawn.current = -1; // force redraw
      drawFrameAt(currentIdx.current);
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      stopLoop();
      st?.kill();
      window.removeEventListener('resize', handleResize);
    };
  }, [canvasRef, triggerRef, preloadFrames, drawFrameAt, startLoop, stopLoop]);
}
