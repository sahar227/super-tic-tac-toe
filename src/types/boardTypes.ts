import { controlTypes } from "../data/controlTypes";
import { playerMarkers } from "../data/playerMarkers";

export type PlayersMarker = (typeof playerMarkers)[number];

export type CellState = PlayersMarker | "";
export type BoardType = Array<Array<CellState>>;

export type Cell = {
  row: number;
  column: number;
};

export type ControlType = keyof typeof controlTypes;
