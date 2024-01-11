import { useEffect, useState } from "react";
import { BoardType, CellState } from "../../types/boardTypes";
import { checkDraw, checkWinner } from "../../utils/checkWinner";
import Board from "../Board/Board";
import { Link, useLocation } from "react-router-dom";
import useTurn from "./useTurn";
import { gameSettingsSchema } from "../../types/schemas";
import { getStrategy } from "../../data/controlTypes";

const useGameSettings = () => {
  const { state: routerState } = useLocation();
  const validationResult = gameSettingsSchema.safeParse(routerState || {});
  if (!validationResult.success) {
    return gameSettingsSchema.parse({});
  }
  return validationResult.data;
};

export default function GameScreen() {
  const { gridSize, playerSettings } = useGameSettings();

  const initialBoard: BoardType = Array<Array<CellState>>(gridSize).fill(
    Array<CellState>(gridSize).fill("")
  );

  const [board, setBoard] = useState(initialBoard);

  const { turn, turnNumber, endTurn, resetTurns } = useTurn();

  const winnerResult = checkWinner(board);
  const isDraw = checkDraw(board);

  const isGameOngoing = !winnerResult.winner && !isDraw;

  const currentPlayerSettings = playerSettings.find((v) => v.marker === turn)!;

  const playTurn = (i: number, j: number) => {
    const newBoard = board.map((row) => [...row]);
    newBoard[i][j] = turn;
    setBoard(newBoard);
    endTurn();
  };

  useEffect(() => {
    if (!isGameOngoing) return;
    if (currentPlayerSettings.control === "human") return;
    const playStrategy = getStrategy(currentPlayerSettings.control);

    const { row, column } = playStrategy(board);
    playTurn(row, column);
  }, [turn, isGameOngoing]);

  function handleClick(i: number, j: number) {
    if (!!winnerResult.winner || board[i][j] !== "") return;

    if (currentPlayerSettings.control !== "human") {
      return;
    }
    playTurn(i, j);
  }

  const handleNewGame = () => {
    setBoard(initialBoard);
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
