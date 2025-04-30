import { getAnthropicCaller } from "./anthropic";
import { getGoogleGenAICaller } from "./google";

export const SUPPOERTED_MODELS = [
  "claude-3-7-sonnet-20250219",
  "gemini-2.5-flash-preview-04-17",
  "gemini-2.5-pro-preview-03-25",
  "gemini-2.0-flash",
] as const;

export type SupportedModel = (typeof SUPPOERTED_MODELS)[number];

export type ModelCallerFunc = (prompt: string) => Promise<string>;

export function getModelCaller(
  model: SupportedModel,
  apiKey: string
): ModelCallerFunc {
  switch (model) {
    case "claude-3-7-sonnet-20250219":
      return getAnthropicCaller("claude-3-7-sonnet-20250219", apiKey);
    case "gemini-2.5-flash-preview-04-17":
    case "gemini-2.5-pro-preview-03-25":
    case "gemini-2.0-flash":
      return getGoogleGenAICaller(model, apiKey);
    default:
      const _exhaustiveCheck: never = model;
      throw new Error(`Unsupported model: ${model}`);
  }
}
