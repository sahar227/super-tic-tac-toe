import { useEffect, useRef, useState } from "react";
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

const useBoard = (gridSize: number) => {
  const getInitialBoard: () => BoardType = () =>
    Array<Array<CellState>>(gridSize).fill(Array<CellState>(gridSize).fill(""));

  const [board, setBoard] = useState(getInitialBoard);

  const resetBoard = () => {
    setBoard(getInitialBoard());
  };

  const setCell = (i: number, j: number, value: CellState) => {
    setBoard((prev) => {
      const newBoard = prev.map((row) => [...row]);
      newBoard[i][j] = value;
      return newBoard;
    });
  };
  return {
    board,
    resetBoard,
    setCell,
  };
};

export default function GameScreen() {
  const { gridSize, playerSettings } = useGameSettings();

  const { board, resetBoard, setCell } = useBoard(gridSize);

  const { turn, turnNumber, endTurn, resetTurns } = useTurn();

  const isBotPlaying = useRef(false);

  const winnerResult = checkWinner(board);
  const isDraw = checkDraw(board);

  const isGameOngoing = !winnerResult.winner && !isDraw;

  const currentPlayerSettings = playerSettings.find((v) => v.marker === turn)!;

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
