# Peer Review MCP
An MCP tool set that enables AI agents to collaborate with other LLMs. The AI agent can request assistance or feedback from more capable models when it needs to evaluate its plans or when it gets stuck on a problem.

## Tools

- **ask-expert-for-peer-review**
  - Ask an expert to peer review your plan. Provide the problem you are working on, and your detailed plan as well as any other context.
  - Input:
      - `problem` (string): The problem you are working on.
      - `plan` (string): The plan you have created.

- **ask-expert-for-help**
  - When confronting a challenging problem, seek guidance from an expert. Specify the problem and the issue you are having, as well as any other context.
  - Input:
      - `problem` (string): The problem you are trying to solve.
      - `issue` (string): The issue you are having.

## Installation

Build the server by running the following command in the root directory of the repository:

```bash
npm ci
npm run build
```

Then, add the following configuration the the MCP servers configuration file:

```
{
    "mcpServers": {
        "peer-review": {
            "command": "node",
            "args": [
                "/path/to/repo/dist/server.js"
            ],
            "env": {
                "HELPER_MODEL": "...",
                "HELPER_MODEL_API_KEY": "sk..."
            }
        }
    }
}
```

Replace `/path/to/repo` with the correct path.
Add the helper model (see list below) and the API key.

Make sure to restart the MCP client (e.g. Claude Desktop) for the changes to take effect.

For more information on how to configure the MCP server in Claude Dekstop, please refer to the [MCP documentation for Claude Desktop Users](https://modelcontextprotocol.io/quickstart/user)

## Supported Helper Models

This is work in progress. Currently, the following models are supported as helper models:
- **claude-3-7-sonnet-20250219** (Claude Sonnet 3.7)
- **gemini-2.5-flash-preview-04-17** (Gemini 2.5 Flash)
- **gemini-2.5-pro-preview-03-25** (Gemini 2.5 Pro)
