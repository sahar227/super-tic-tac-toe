import { useState } from "react";
import { BoardType, CellState } from "../../types/boardTypes";

export const useBoard = (gridSize: number) => {
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
