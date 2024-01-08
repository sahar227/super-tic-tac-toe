import React from "react";
import { Link } from "react-router-dom";
import { ControlType, PlayersMarker } from "../../types/boardTypes";
import PlayerSelectDropdown from "./PlayerSelectDropdown/PlayerSelectDropdown";
import { playerMarkers } from "../../data/playerMarkers";

const gridSizes = [3, 5, 7, 9] as const;

interface PlayerSettings {
  marker: PlayersMarker;
  control: ControlType;
}

const initialPlayersSettings: PlayerSettings[] = playerMarkers.map((marker) => {
  return {
    marker,
    control: "human",
  };
});

export default function GameSettingsScreen() {
  const [gridSize, setGridSize] = React.useState<(typeof gridSizes)[number]>(
    gridSizes[0]
  );
  const [playersSettings, setPlayersSettings] = React.useState(
    initialPlayersSettings
  );

  const allState = {
    gridSize,
    playersSettings,
  };

  const updatePlayerControl =
    (marker: PlayersMarker) => (control: ControlType) => {
      setPlayersSettings((prev) => {
        return prev.map((player) => {
          if (player.marker === marker) {
            return {
              ...player,
              control: control,
            };
          }
          return player;
        });
      });
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

      <Link to="/game" state={allState}>
        Start Game
      </Link>
    </div>
  );
}
