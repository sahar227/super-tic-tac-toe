import { BoardType, Cell } from "../../types/boardTypes";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const randomStrategy = async (board: BoardType) => {
  await sleep(500);
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
