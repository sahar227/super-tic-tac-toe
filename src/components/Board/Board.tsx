import classes from "./Board.module.css";
import { BoardType } from "../../types/boardTypes";

interface Props {
  board: BoardType;
  isGameOngoing: boolean;
  handleClick: (i: number, j: number) => void;
}

export default function Board({ board, isGameOngoing, handleClick }: Props) {
  const gridSize = board.length;
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
                        className={`${classes.piece} ${
                          board[i][j] !== "" ? classes.added : ""
                        }`}
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
