export type PlayersMarker = "O" | "X";
export type CellState = PlayersMarker | "";
export type BoardType = Array<Array<CellState>>;

export type Cell = {
  row: number;
  column: number;
};

export type ControlType = "human" | "random";
