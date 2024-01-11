import { ControlType } from "../types/boardTypes";
import { randomStrategy } from "./botStrategies/randomStrategy";

export const controlTypesKeys = ["human", "random"] as const;

export const controlTypes = {
  [controlTypesKeys[0]]: { label: "Human" },
  [controlTypesKeys[1]]: { label: "Bot - Random" },
} as const;

type getStrategyType<T> = T extends "human" ? null : typeof randomStrategy;

export function getStrategy<T extends ControlType>(
  controlType: T
): getStrategyType<T> {
  if (controlType === "human") return null as getStrategyType<T>;

  return randomStrategy as getStrategyType<T>;
}
