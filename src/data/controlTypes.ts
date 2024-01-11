import { ControlType } from "../types/boardTypes";
import { StrategyType } from "../types/strategyType";
import { betterRandomStrategy } from "./botStrategies/betterRandomStrategy";
import { randomStrategy } from "./botStrategies/randomStrategy";

export const controlTypesKeys = ["human", "random", "betterRandom"] as const;

export const controlTypes = {
  [controlTypesKeys[0]]: { label: "Human" },
  [controlTypesKeys[1]]: { label: "Bot - Random" },
  [controlTypesKeys[2]]: { label: "Bot - Better Random" },
} as const;

type getStrategyType<T> = T extends "human" ? null : StrategyType;

export function getStrategy<T extends ControlType>(
  controlType: T
): getStrategyType<T> {
  if (controlType === "human") return null as getStrategyType<T>;
  if (controlType === "random") return randomStrategy as getStrategyType<T>;

  return betterRandomStrategy as getStrategyType<T>;
}
