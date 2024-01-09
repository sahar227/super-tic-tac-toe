import { useState } from "react";
import { ControlType, PlayersMarker } from "../../types/boardTypes";
import { initialPlayersSettings } from "../../data/initialPlayersSettings";

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
