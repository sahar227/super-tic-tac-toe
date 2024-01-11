import { BoardType, Cell, PlayersMarker } from "./boardTypes";

export type StrategyType = (
  board: BoardType,
  player: PlayersMarker
) => Promise<Cell>;
