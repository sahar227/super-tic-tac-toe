import { BoardType, PlayersMarker } from "../types/boardTypes";

type Cell = {
  row: number;
  column: number;
};
type WinnerFoundResult = {
  winner: PlayersMarker;
  winningCells: Cell[];
};

type WinnerNotFoundResult = {
  winner: null;
};

type CheckWinnerResult = WinnerFoundResult | WinnerNotFoundResult;

const checkFunctions: ((board: BoardType) => WinnerFoundResult | null)[] = [
  checkRows,
  checkColumns,
  checkDiagonals,
];

export function checkWinner(board: BoardType): CheckWinnerResult {
  const winner = checkFunctions
    .map((checkFunction) => checkFunction(board))
    .find((winner) => winner !== null);

  if (!winner) return { winner: null };

  return winner;
}

export function checkDraw(board: BoardType): boolean {
  return board.every((row) => row.every((cell) => cell !== ""));
}

function checkRows(board: BoardType) {
  const gridSize = board.length;

  for (let i = 0; i < gridSize; i++) {
    const marker = board[i][0];
    const cells = [{ row: i, column: 0 }];

    if (marker === "") continue;

    for (let j = 1; j < gridSize; j++) {
      if (board[i][j] !== marker) break;
      cells.push({ row: i, column: j });
      if (j === gridSize - 1) return { winner: marker, winningCells: cells };
    }
  }
  return null;
}

function checkColumns(board: BoardType) {
  const gridSize = board.length;

  for (let i = 0; i < gridSize; i++) {
    const marker = board[0][i];
    const cells = [{ row: 0, column: i }];

    if (marker === "") continue;

    for (let j = 1; j < gridSize; j++) {
      if (board[j][i] !== marker) break;
      cells.push({ row: j, column: i });
      if (j === gridSize - 1) return { winner: marker, winningCells: cells };
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

  const cells = [{ row: 0, column: 0 }];

  for (let i = 1; i < gridSize; i++) {
    if (board[i][i] === "") break;
    if (board[i][i] !== marker) break;
    cells.push({ row: i, column: i });
    if (i === gridSize - 1) return { winner: marker, winningCells: cells };
  }

  return null;
}

function checkRightLeftDiagonal(board: BoardType) {
  const gridSize = board.length;

  if (gridSize % 2 === 0) return null;

  const marker = board[0][gridSize - 1];
  if (marker === "") return null;

  const cells = [{ row: 0, column: gridSize - 1 }];

  for (let i = 1; i < gridSize; i++) {
    if (board[i][gridSize - 1 - i] === "") break;
    if (board[i][gridSize - 1 - i] !== marker) break;
    cells.push({ row: i, column: gridSize - 1 - i });
    if (i === gridSize - 1) return { winner: marker, winningCells: cells };
  }

  return null;
}
