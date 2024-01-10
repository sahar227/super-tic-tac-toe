import { z } from "zod";
import {
  controlTypesSchema,
  gameSettingsSchema,
  playerMarkersSchema,
} from "./schemas";

export type PlayersMarker = z.infer<typeof playerMarkersSchema>;

export type CellState = PlayersMarker | "";
export type BoardType = Array<Array<CellState>>;

export type Cell = {
  row: number;
  column: number;
};

export type ControlType = z.infer<typeof controlTypesSchema>;

export type GameSettings = z.infer<typeof gameSettingsSchema>;
