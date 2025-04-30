# peer-review-mcp
An MCP tool set that enables AI agents to collaborate with other LLMs. The AI agent can request assistance or feedback from more capable models when it needs to evaluate its plans or when it gets stuck on a problem.

This is work in progress. It only supports Claude 3.7 as the helper model for now.

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
                "HELPER_MODEL": "claude-3-7-sonnet-20250219",
                "HELPER_MODEL_API_KEY": "sk..."
            }
        }
    }
}
```

Replace `/path/to/repo` with the correct path.

Make sure to restart the MCP client (e.g. Claude Desktop) for the changes to take effect.