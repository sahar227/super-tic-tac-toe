import { BoardType, Cell, PlayersMarker } from "../../types/boardTypes";
import { StrategyType } from "../../types/strategyType";
import { checkWinner } from "../../utils/checkWinner";
import { sleep } from "../../utils/sleep";
import { _randomStrategy } from "./randomStrategy";

const _betterRandomStrategy: StrategyType = async (board, player) => {
  const obviousBestMove = findObviousMove(board, player);

  if (obviousBestMove) return obviousBestMove;
  return _randomStrategy(board);
};

function findObviousMove(board: BoardType, marker: PlayersMarker): Cell | null {
  let opponentWinCell: Cell | null = null;
  let playerWinCell: Cell | null = null;
  board.forEach((row, rowIndex) => {
    if (playerWinCell) return;
    row.forEach((cell, columnIndex) => {
      if (cell === "") {
        const cell = { row: rowIndex, column: columnIndex };
        const winResult = checkWinPossibility(board, marker, cell);
        if (winResult) {
          playerWinCell = cell;
          return;
        }
        const opponentMarker = marker === "X" ? "O" : "X";
        const opponentWinResult = checkWinPossibility(
          board,
          opponentMarker,
          cell
        );
        if (opponentWinResult) {
          opponentWinCell = { row: rowIndex, column: columnIndex };
        }
      }
    });
  });
  return playerWinCell || opponentWinCell;
}

function checkWinPossibility(
  board: BoardType,
  marker: PlayersMarker,
  cell: Cell
): boolean {
  const newBoard = board.map((row) => [...row]);
  newBoard[cell.row][cell.column] = marker;
  const winResult = checkWinner(newBoard);
  return winResult.winner === marker;
}

export const betterRandomStrategy: StrategyType = async (board, player) => {
  await sleep(1000);
  return _betterRandomStrategy(board, player);
};
