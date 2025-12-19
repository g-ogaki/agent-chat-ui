import { initApiPassthrough } from "langgraph-nextjs-api-passthrough";
import { decrypt } from "@/lib/auth";

// This file acts as a proxy for requests to your LangGraph server.
// Read the [Going to Production](https://github.com/langchain-ai/agent-chat-ui?tab=readme-ov-file#going-to-production) section for more information.

export const { GET, POST, PUT, PATCH, DELETE, OPTIONS, runtime } =
  initApiPassthrough({
    apiUrl: process.env.LANGGRAPH_API_URL ?? "remove-me",
    apiKey: process.env.LANGSMITH_API_KEY ?? "remove-me",
    runtime: "edge",
    disableWarningLog: true,
    bodyParameters: async (req, body) => {
      const session = await decrypt(req.cookies.get("session")?.value);
      return {
        ...body,
        metadata: {
          ...(body?.metadata || {}),
          owner: session?.username
        },
      };
    },
  });
