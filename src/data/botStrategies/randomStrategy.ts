import { BoardType, Cell } from "../../types/boardTypes";

export const randomStrategy = (board: BoardType) => {
  const emptyCells: Cell[] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === "") {
        emptyCells.push({ row: rowIndex, column: columnIndex });
      }
    });
  });
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};
