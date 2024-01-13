import { useLocation } from "react-router-dom";
import { gameSettingsSchema } from "../../types/schemas";
import { GameSettings, PlayersMarker } from "../../types/boardTypes";

function createGameSettingsForTurn(
  turn: PlayersMarker,
  gameSettings: GameSettings
) {
  return {
    gridSize: gameSettings.gridSize,
    currentPlayerSettings: gameSettings.playerSettings.find(
      (v) => v.marker === turn
    )!,
  };
}

export const useGameSettings = (player: PlayersMarker) => {
  const { state: routerState } = useLocation();
  const validationResult = gameSettingsSchema.safeParse(routerState || {});
  if (!validationResult.success) {
    const gameSettings = gameSettingsSchema.parse({});
    return createGameSettingsForTurn(player, gameSettings);
  }
  return createGameSettingsForTurn(player, validationResult.data);
};
