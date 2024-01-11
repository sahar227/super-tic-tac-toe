import { BoardType, Cell, PlayersMarker } from "../../types/boardTypes";
import { StrategyType } from "../../types/strategyType";
import { checkWinner } from "../../utils/checkWinner";
import { randomStrategy } from "./randomStrategy";

export const betterRandomStrategy: StrategyType = async (board, player) => {
  const obviousBestMove = findObviousMove(board, player);
  if (obviousBestMove) return obviousBestMove;
  return await randomStrategy(board, player);
};

function findObviousMove(board: BoardType, marker: PlayersMarker): Cell | null {
  let opponentBlock: Cell | null = null;
  board.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if (cell === "") {
        const cell = { row: rowIndex, column: columnIndex };
        const winResult = checkWinPossibility(board, marker, cell);
        if (winResult) {
          return cell;
        }
        const opponentMarker = marker === "X" ? "O" : "X";
        const opponentWinResult = checkWinPossibility(
          board,
          opponentMarker,
          cell
        );
        if (opponentWinResult) {
          opponentBlock = { row: rowIndex, column: columnIndex };
        }
      }
    });
  });
  return opponentBlock;
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
