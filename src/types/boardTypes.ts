import { z } from "zod";
import {
  boardSchema,
  cellStateSChema,
  controlTypesSchema,
  gameSettingsSchema,
  playerMarkersSchema,
} from "./schemas";

export type PlayersMarker = z.infer<typeof playerMarkersSchema>;

export type CellState = z.infer<typeof cellStateSChema>;
export type BoardType = z.infer<typeof boardSchema>;

export type Cell = {
  row: number;
  column: number;
};

export type ControlType = z.infer<typeof controlTypesSchema>;

export type GameSettings = z.infer<typeof gameSettingsSchema>;
