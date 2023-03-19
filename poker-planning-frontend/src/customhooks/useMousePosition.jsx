import { useState, useEffect } from "react";

function useMousePosition() {
  const [position, setPosition] = useState({ x:null, y:null });

  function handleMouseMove(event) {
    setPosition({ x: event.clientX, y: event.clientY });
  }

  return {position , handleMouseMove};
}

export default useMousePosition;
