import { z } from "zod";
import { playerMarkers } from "../data/playerMarkers";
import { controlTypesKeys } from "../data/controlTypes";
import { initialPlayersSettings } from "../data/initialPlayersSettings";

export const playerMarkersSchema = z.enum(playerMarkers);

export const controlTypesSchema = z.enum(controlTypesKeys);

export const playerSettingsSchema = z.object({
  marker: playerMarkersSchema,
  control: controlTypesSchema,
});

export const gameSettingsSchema = z.object({
  gridSize: z.number().default(3),
  playerSettings: z.array(playerSettingsSchema).default(initialPlayersSettings),
});
