import classes from "./Board.module.css";
import { BoardType, Cell } from "../../types/boardTypes";

interface Props {
  board: BoardType;
  isGameOngoing: boolean;
  winningCells: Cell[];
  handleClick: (i: number, j: number) => void;
}

export default function Board({
  board,
  isGameOngoing,
  handleClick,
  winningCells,
}: Props) {
  const gridSize = board.length;

  const isWinningCell = (row: number, column: number) => {
    return winningCells.some(
      (cell) => cell.row === row && cell.column === column
    );
  };
  return (
    <div
      className={`${classes.board} ${isGameOngoing ? classes.gameOngoing : ""}`}
    >
      {Array(gridSize)
        .fill(null)
        .map((_, i) => {
          const isTopBorder = i === 0;
          const isBottomBorder = i === gridSize - 1;
          return (
            <div className={classes.row} key={i}>
              {Array(gridSize)
                .fill(null)
                .map((_, j) => {
                  const isLeftBorder = j === 0;
                  const isRightBorder = j === gridSize - 1;
                  return (
                    <div
                      className={`
                          ${classes.cell}
                          ${isTopBorder ? classes.cellTop : ""}
                          ${isBottomBorder ? classes.cellBottom : ""}
                          ${isLeftBorder ? classes.cellLeft : ""}
                          ${isRightBorder ? classes.cellRight : ""}
                        `}
                      key={j}
                      onClick={() => handleClick(i, j)}
                    >
                      <div
                        className={`
                          ${classes.piece}
                          ${board[i][j] !== "" ? classes.added : ""}
                          ${isWinningCell(i, j) ? classes.winningPiece : ""}
                        `}
                      >
                        {board[i][j]}
                      </div>
                    </div>
                  );
                })}
            </div>
          );
        })}
    </div>
  );
}
