import { useState } from "react";
import { playerMarkers } from "../../data/playerMarkers";
import { ControlType, PlayersMarker } from "../../types/boardTypes";

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

export default function usePlayerSettings() {
  const [playersSettings, setPlayersSettings] = useState(
    initialPlayersSettings
  );

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

  return { playersSettings, updatePlayerControl };
}
