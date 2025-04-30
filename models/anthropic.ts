import type { ModelCallerFunc } from "./factory";
import Anthropic from "@anthropic-ai/sdk";

export function getAnthropicCaller(apiKey: string): ModelCallerFunc {
  return async (prompt: string) => {
    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const msg = await anthropic.messages.create({
      model: "claude-3-7-sonnet-20250219",
      max_tokens: 10000,
      messages: [{ role: "user", content: prompt }],
      // TBD: support thinking mode
    });
    return msg.content.map((contentBlock) => {
        if (contentBlock.type === "text") {
            return contentBlock.text;
        } else {
            return ""; // Do not include thinking blocks
        }
    }).join("\n\n");
  };
}
