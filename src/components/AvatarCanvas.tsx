'use client';
import { useEffect, useRef } from 'react';

export default function AvatarCanvas() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: any | null = null;
    let destroyed = false;

    (async () => {
      if (!ref.current) return;

      const { Application, Graphics } = await import('pixi.js');

      app = new Application();
      await app.init({ width: 420, height: 240, backgroundAlpha: 0 });

      if (!ref.current || destroyed) return;

      // Вставляем canvas
      ref.current.appendChild(app.canvas);

      // Рисуем «аватар» — закруглённый прямоугольник
      const avatar = new Graphics()
        .roundRect(0, 0, 40, 60, 8)
        .fill(0x111111);

      avatar.x = 190;
      avatar.y = 140;

      app.stage.addChild(avatar);
    })();

    return () => {
      destroyed = true;
      if (app) {
        try {
          app.destroy(true, { children: true, texture: true, baseTexture: true });
        } catch {}
      }
    };
  }, []);

  return <div className="w-full h-[240px]" ref={ref} />;
}


