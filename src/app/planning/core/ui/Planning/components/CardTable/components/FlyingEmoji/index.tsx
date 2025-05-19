import React, { useState, useRef, useEffect } from "react";

// Componente para emoji volador con animación JavaScript
const FlyingEmoji = ({ emoji, startX, startY, endX, endY, side }: any) => {
  const [position, setPosition] = useState({ x: startX, y: startY });
  const [scale, setScale] = useState(0.5);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(0.8);
  const animationRef: any = useRef(null);

  useEffect(() => {
    const duration = 1500; // 2.5 segundos para dar tiempo a ver desde los bordes
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Función de easing para una curva más suave
      const easeInOut =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      // Calcular posición con una curva más dramática dependiendo del lado
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      // Altura de la curva basada en la distancia y el lado de origen
      let curveHeight = Math.sqrt(deltaX * deltaX + deltaY * deltaY) * 0.3;
      if (side === "top" || side === "bottom") curveHeight *= 0.5;

      const currentX = startX + deltaX * easeInOut;
      const currentY =
        startY +
        deltaY * easeInOut -
        curveHeight * Math.sin(Math.PI * progress);

      setPosition({ x: currentX, y: currentY });

      // Efectos de escala: empieza pequeño y crece
      setScale(0.5 + progress * 1.5); // De 0.5 a 2

      // Rotación más dramática
      setRotation(progress * 1080); // 3 rotaciones completas

      // Opacidad: aparece gradualmente y se mantiene
      if (progress < 0.2) {
        setOpacity((progress / 0.2) * 0.9);
      } else if (progress > 0.9) {
        setOpacity(0.9 - ((progress - 0.9) / 0.1) * 0.9);
      } else {
        setOpacity(0.9);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [startX, startY, endX, endY, side]);

  return (
    <div
      className="absolute pointer-events-none text-xl z-10 transition-all duration-75"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity: opacity,
        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
      }}
    >
      {emoji}
    </div>
  );
};

export default FlyingEmoji;
