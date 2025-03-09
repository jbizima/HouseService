import { useState, useRef, useEffect } from "react";
export default function ProgressBar({ color, clearMessage, setAni }) {
  const [percentage, setPercentage] = useState(0);
  let count = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      count.current = count.current + 1;
      setPercentage(Math.round((count.current * 100) / 24));
    }, 200);
    
    const timeoutId = setTimeout(() => {
      // clearMessage();
      setAni("fadeOut")
      clearInterval(intervalId);
    }, 5000);
    const timeoutId1 = setTimeout(() => {
      clearMessage();
    }, 5500);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearTimeout(timeoutId1);
    };
  }, []);
  const styles = {
    container: {
      display: "flex",
      height: "2px",
      width: "100%",
    },
    progress: {
      height: "2px",
      borderBottomRightRadius: "5px",
      borderBottomLeftRadius: "5px",
      width: `${percentage}%`,
      backgroundColor: color,
    },
  };
  return (
    <div style={styles.container}>
      <div style={styles.progress}></div>
    </div>
  );
}
