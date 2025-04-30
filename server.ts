import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { getModelCaller, SupportedModel } from "./models/factory";
import { z } from "zod";

const mcpServer = new McpServer({
  name: "PeerReviewMCP",
  version: "1.0.0",
});

mcpServer.tool(
  "ask-expert-for-peer-review",
  "Ask an expert to peer review your plan. Provide the problem you are working on, and your detailed plan as well as any other context.",
  { problem: z.string(), plan: z.string() },
  async ({ problem, plan }) => {
    const prompt = `
    I am facing the following problem:

    ${problem}

    This is the plan I have come up with to solve the problem:

    ${plan}

    (end of plan)

    Please review the plan and provide feedback on its strengths and weaknesses, as well as any suggestions for improvement. Be concise.`;

    const response = await makeApiCall(prompt);

    return {
      content: [
        {
          type: "text",
          text: `The response from the expert is: ${response}`,
        },
      ],
    };
  }
);

mcpServer.tool(
  "ask-expert-for-help",
  "When confronting a challenging problem, seek guidance from an expert. Specify the problem and the issue you are having, as well as any other context.",
  { problem: z.string(), issue: z.string() },
  async ({ problem, issue }) => {
    const prompt = `I am facing the following problem: 
    
    ${problem} 
    
    The issue I am having is: 
    
    ${issue}
    
    Provide a solution to the problem, taking into account the issue I am having. Be concise.`;

    const response = await makeApiCall(prompt);

    return {
      content: [
        {
          type: "text",
          text: `The response from the expert is: ${response}`,
        },
      ],
    };
  }
);

async function makeApiCall(prompt: string): Promise<string> {
  if (!process.env.HELPER_MODEL || !process.env.HELPER_MODEL_API_KEY) {
    throw new Error("HELPER_MODEL and HELPER_MODEL_API_KEY must be set");
  }
  const caller = getModelCaller(
    process.env.HELPER_MODEL as SupportedModel,
    process.env.HELPER_MODEL_API_KEY
  );
  const response = await caller(prompt);
  return response;
}

const transport = new StdioServerTransport();
mcpServer
  .connect(transport)
  .then(() => {
    console.error("MCP Server running on stdio");
  })
  .catch((err) => {
    console.error("MCP Server connection error", err);
    process.exit(1);
  });

async function closeServer() {
  console.error("Closing MCP Server");
  await mcpServer.close();
}

process.stdin.on("close", async () => {
  console.error("MCP Server closed");
  await closeServer();
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.error("Shutting down servers...");
  await closeServer;
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.error("Shutting down servers...");
  await closeServer();
  process.exit(0);
});
