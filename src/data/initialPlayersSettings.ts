import { z } from "zod";
import { playerSettingsSchema } from "../types/schemas";
import { playerMarkers } from "./playerMarkers";

type PlayerSettings = z.infer<typeof playerSettingsSchema>;

export const initialPlayersSettings: PlayerSettings[] = playerMarkers.map(
  (marker) => {
    return {
      marker,
      control: "human",
    };
  }
);
