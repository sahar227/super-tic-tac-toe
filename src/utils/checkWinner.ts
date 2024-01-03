import { BoardType, PlayersMarker } from "../types/boardTypes";

const checkFunctions: ((board: BoardType) => PlayersMarker | null)[] = [
  checkRows,
  checkColumns,
  checkDiagonals,
];

export function checkWinner(board: BoardType): PlayersMarker | null {
  const winner = checkFunctions
    .map((checkFunction) => checkFunction(board))
    .find((winner) => winner !== null);

  if (!winner) return null;

  return winner;
}

export function checkDraw(board: BoardType): boolean {
  return board.every((row) => row.every((cell) => cell !== ""));
}

function checkRows(board: BoardType) {
  const gridSize = board.length;

  for (let i = 0; i < gridSize; i++) {
    const marker = board[i][0];

    if (marker === "") continue;

    for (let j = 1; j < gridSize; j++) {
      if (board[i][j] !== marker) break;
      if (j === gridSize - 1) return marker;
    }
  }
  return null;
}

function checkColumns(board: BoardType) {
  const gridSize = board.length;

  for (let i = 0; i < gridSize; i++) {
    const marker = board[0][i];

    if (marker === "") continue;

    for (let j = 1; j < gridSize; j++) {
      if (board[j][i] !== marker) break;
      if (j === gridSize - 1) return marker;
    }
  }
  return null;
}

function checkDiagonals(board: BoardType) {
  return checkLeftRightDiagonal(board) || checkRightLeftDiagonal(board);
}

function checkLeftRightDiagonal(board: BoardType) {
  const gridSize = board.length;

  if (gridSize % 2 === 0) return null;

  const marker = board[0][0];
  if (marker === "") return null;
  for (let i = 1; i < gridSize; i++) {
    if (board[i][i] === "") break;
    if (board[i][i] !== marker) break;
    if (i === gridSize - 1) return marker;
  }

  return null;
}

function checkRightLeftDiagonal(board: BoardType) {
  const gridSize = board.length;

  if (gridSize % 2 === 0) return null;

  const marker = board[0][gridSize - 1];
  if (marker === "") return null;

  for (let i = 1; i < gridSize; i++) {
    if (board[i][gridSize - 1 - i] === "") break;
    if (board[i][gridSize - 1 - i] !== marker) break;
    if (i === gridSize - 1) return marker;
  }

  return null;
}
