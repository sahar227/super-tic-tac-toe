import React from "react";
import { Link } from "react-router-dom";
import PlayerSelectDropdown from "./PlayerSelectDropdown/PlayerSelectDropdown";
import usePlayerSettings from "./usePlayerSettings";
import { GameSettings } from "../../types/boardTypes";

const gridSizes = [3, 5, 7, 9] as const;

export default function GameSettingsScreen() {
  const [gridSize, setGridSize] = React.useState<(typeof gridSizes)[number]>(
    gridSizes[0]
  );

  const { playersSettings, updatePlayerControl } = usePlayerSettings();

  const allSettings = {
    gridSize,
    playerSettings: playersSettings,
  } satisfies GameSettings;

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
      <div>
        <p>Select Grid Size</p>
        <div style={{ display: "flex", gap: "12px" }}>
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
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {playersSettings.map((player) => (
          <PlayerSelectDropdown
            key={player.marker}
            marker={player.marker}
            controlType={player.control}
            setControlType={updatePlayerControl(player.marker)}
          />
        ))}
      </div>

      <Link to="/game" state={allSettings}>
        Start Game
      </Link>
    </div>
  );
}
