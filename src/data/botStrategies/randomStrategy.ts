import { BoardType, Cell } from "../../types/boardTypes";
import { StrategyType } from "../../types/strategyType";
import { sleep } from "../../utils/sleep";

export const _randomStrategy = (board: BoardType) => {
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

export const randomStrategy: StrategyType = async (board) => {
  await sleep(1000);
  return _randomStrategy(board);
};
