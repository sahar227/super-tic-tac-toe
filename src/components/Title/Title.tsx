import { useEffect, useState } from "react";
import classes from "./Title.module.css";
// get random translate
function getRandomPosition() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const x = Math.random() * screenWidth - screenWidth / 2;
  const y = Math.random() * screenHeight - screenHeight / 2;
  return [x, y];
}

function TitleCharacter({ char }: { char: string }) {
  const [position, setPosition] = useState(() => getRandomPosition());
  const [isFormed, setIsFormed] = useState(false);
  const transformTime = 1.5;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition([0, 0]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFormed(true);
    }, transformTime * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre
      className={`${classes.character} ${!isFormed ? classes.rotate : ""}`}
      style={{
        transform: `translate(${position[0]}px, ${position[1]}px)`,
        transition: `transform ${transformTime}s ease`,
      }}
    >
      {char}
    </pre>
  );
}

export default function Title({ text }: { text: string }) {
  const charArray = text.split("");
  return (
    <div>
      <h1>
        {charArray.map((char, index) => {
          const key = `${char}-${index}`;
          return <TitleCharacter key={key} char={char} />;
        })}
      </h1>
    </div>
  );
}
