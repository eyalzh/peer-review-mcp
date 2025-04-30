import { getAnthropicCaller } from "./anthropic";

export const SUPPOERTED_MODELS = [
    "claude-3-7-sonnet-20250219",
] as const;

export type SupportedModel = typeof SUPPOERTED_MODELS[number];

export type ModelCallerFunc = (prompt: string) => Promise<string>;

export function getModelCaller(
  model: SupportedModel,
  apiKey: string
): ModelCallerFunc {
  switch (model) {
    case "claude-3-7-sonnet-20250219":
      return getAnthropicCaller(apiKey);
    default:
      const _exhaustiveCheck: never = model;
      throw new Error(`Unsupported model: ${model}`);
  }
}
