import React from "react";
import { Link } from "react-router-dom";

const gridSizes = [3, 5, 7, 9];

export default function GameSettingsScreen() {
  const [gridSize, setGridSize] = React.useState(gridSizes[0]);

  const allState = {
    gridSize,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
        margin: "auto",
        gap: "8px",
      }}
    >
      <p>Select Grid Size</p>
      <div style={{ display: "flex", gap: "8px" }}>
        {gridSizes.map((size) => (
          <button
            key={size}
            onClick={() => setGridSize(size)}
            style={{
              border:
                size === gridSize
                  ? "4px solid lightblue"
                  : "4px solid transparent",
            }}
          >
            {size}
          </button>
        ))}
      </div>
      <Link to="/game" state={allState}>
        Start Game
      </Link>
    </div>
  );
}
