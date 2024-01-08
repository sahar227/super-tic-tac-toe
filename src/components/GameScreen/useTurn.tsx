import { useState } from "react";
import { playerMarkers } from "../../data/playerMarkers";

export default function useTurn() {
  const [turnNumber, setTurnNumber] = useState(0);

  function endTurn() {
    setTurnNumber((prev) => prev + 1);
  }

  function resetTurns() {
    setTurnNumber(0);
  }

  const turn = playerMarkers[turnNumber % playerMarkers.length];

  return {
    turn,
    turnNumber: turnNumber + 1,
    endTurn,
    resetTurns,
  };
}
