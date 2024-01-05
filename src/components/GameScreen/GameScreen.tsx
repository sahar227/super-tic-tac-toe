import { useState } from "react";
import { BoardType, CellState, PlayersMarker } from "../../types/boardTypes";
import { checkDraw, checkWinner } from "../../utils/checkWinner";
import Board from "../Board/Board";

const gridSize = 3;

const initialBoard: BoardType = Array<Array<CellState>>(gridSize).fill(
  Array<CellState>(gridSize).fill("")
);

export default function GameScreen() {
  const [board, setBoard] = useState(initialBoard);

  const [turn, setTurn] = useState<PlayersMarker>("X");

  const winnerResult = checkWinner(board);
  const isDraw = checkDraw(board);

  const isGameOngoing = !winnerResult.winner && !isDraw;

  const handleClick = (i: number, j: number) => {
    if (!!winnerResult.winner || board[i][j] !== "") return;
    const newBoard = board.map((row) => [...row]);
    newBoard[i][j] = turn;
    setBoard(newBoard);
    setTurn(turn === "X" ? "O" : "X");
  };

  const handleNewGame = () => {
    setBoard(initialBoard);
    setTurn("X");
  };

  function getGameStatusMessage() {
    if (winnerResult.winner !== null) {
      return `Winner is ${winnerResult.winner}`;
    }

    if (isDraw) {
      return "Draw";
    }

    return `It is ${turn}'s turn`;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
