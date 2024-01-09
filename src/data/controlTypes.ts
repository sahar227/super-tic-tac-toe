export const controlTypesKeys = ["human", "random"] as const;

export const controlTypes = {
  [controlTypesKeys[0]]: { label: "Human" },
  [controlTypesKeys[1]]: { label: "Bot - Random" },
} as const;
