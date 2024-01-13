import { useEffect, useRef } from "react";
import { checkDraw, checkWinner } from "../../utils/checkWinner";
import Board from "../Board/Board";
import { Link } from "react-router-dom";
import useTurn from "./useTurn";
import { getStrategy } from "../../data/controlTypes";
import { useGameSettings } from "./useGameSettings";
import { useBoard } from "./useBoard";

export default function GameScreen() {
  const { turn, turnNumber, endTurn, resetTurns } = useTurn();

  const { gridSize, currentPlayerSettings } = useGameSettings(turn);
  const { board, resetBoard, setCell } = useBoard(gridSize);

  const isBotPlaying = useRef(false);

  const winnerResult = checkWinner(board);
  const isDraw = checkDraw(board);

  const isGameOngoing = !winnerResult.winner && !isDraw;

  const playTurn = (i: number, j: number) => {
    setCell(i, j, turn);
    endTurn();
  };

  useEffect(() => {
    if (!isGameOngoing) return;

    if (isBotPlaying.current) return;

    async function playTurnAsync() {
      if (currentPlayerSettings.control === "human") return;

      const playStrategy = getStrategy(currentPlayerSettings.control);
      const { row, column } = await playStrategy(board, turn);

      playTurn(row, column);
    }
    isBotPlaying.current = true;
    playTurnAsync().then(() => (isBotPlaying.current = false));
  }, [turn, isGameOngoing]);

  function handleClick(i: number, j: number) {
    if (!!winnerResult.winner || board[i][j] !== "") return;

    if (currentPlayerSettings.control !== "human") {
      return;
    }
    playTurn(i, j);
  }

  const handleNewGame = () => {
    resetBoard();
    resetTurns();
  };

  function getGameStatusMessage() {
    if (winnerResult.winner !== null) {
      return `Winner is ${winnerResult.winner}`;
    }

    if (isDraw) {
      return "Draw";
    }

    return `Turn ${turnNumber} -  It is ${turn}'s turn`;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Link style={{ marginRight: "auto", padding: "0 2rem" }} to="/">
        Back
      </Link>
      <h2>{getGameStatusMessage()}</h2>
      <Board
        board={board}
        handleClick={handleClick}
        isGameOngoing={isGameOngoing}
        winningCells={!!winnerResult.winner ? winnerResult.winningCells : []}
      />
      <button
        style={{ width: "fit-content", margin: "auto" }}
        onClick={handleNewGame}
      >
        {!isGameOngoing ? "New Game" : "Reset"}
      </button>
    </div>
  );
}
