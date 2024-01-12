import React from "react";
import { Link } from "react-router-dom";
import PlayerSelectDropdown from "./PlayerSelectDropdown/PlayerSelectDropdown";
import usePlayerSettings from "./usePlayerSettings";
import { GameSettings } from "../../types/boardTypes";
import classes from "./GameSettingsScreen.module.css";

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
    <div className={classes.pageContainer}>
      <div>
        <p style={{ fontSize: "larger" }}>Select Grid Size</p>
        <div className={classes.gridSizeButtonContainer}>
          {gridSizes.map((size) => (
            <button
              key={size}
              onClick={() => setGridSize(size)}
              className={`${classes.gridSizeButton} ${
                size === gridSize ? classes.selected : ""
              }`}
            >
              {size} X {size}
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

      <Link to="/game" state={allSettings} className={classes.startGameLink}>
        Start Game
      </Link>
    </div>
  );
}
