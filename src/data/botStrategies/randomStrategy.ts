import { BoardType, Cell } from "../../types/boardTypes";
import { StrategyType } from "../../types/strategyType";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const randomStrategy: StrategyType = async (board: BoardType) => {
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
