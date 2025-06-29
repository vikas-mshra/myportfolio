const https = require("https");

const cache = {};

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { userMessage } = JSON.parse(event.body);
  const cacheKey = userMessage.trim().toLowerCase();

  if (cache[cacheKey]) {
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: cache[cacheKey] }),
    };
  }

  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const ASSISTANT_ID = process.env.REACT_APP_OPENAI_ASSISTANT_ID; // Store in Netlify env

  try {
    // 1. Create a thread
    const threadRes = await makeRequest("https://api.openai.com/v1/threads", {
      method: "POST",
      headers: getHeaders(OPENAI_API_KEY),
      body: JSON.stringify({}),
    });

    const threadData = await threadRes.json();
    const threadId = threadData.id;

    // 2. Add user message to thread
    await makeRequest(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      {
        method: "POST",
        headers: getHeaders(OPENAI_API_KEY),
        body: JSON.stringify({
          role: "user",
          content: userMessage,
        }),
      }
    );

    // 3. Run the assistant
    const runRes = await makeRequest(
      `https://api.openai.com/v1/threads/${threadId}/runs`,
      {
        method: "POST",
        headers: getHeaders(OPENAI_API_KEY),
        body: JSON.stringify({ assistant_id: ASSISTANT_ID }),
      }
    );

    const runData = await runRes.json();
    const runId = runData.id;

    // 4. Poll until run is complete
    let runStatus = "queued";
    while (runStatus === "queued" || runStatus === "in_progress") {
      await new Promise((res) => setTimeout(res, 1500));

      const checkRun = await makeRequest(
        `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
        { method: "GET", headers: getHeaders(OPENAI_API_KEY) }
      );

      const runStatusData = await checkRun.json();
      runStatus = runStatusData.status;
    }

    if (runStatus !== "completed") {
      throw new Error("Assistant run failed or was cancelled.");
    }

    // 5. Get messages from thread
    const messagesRes = await makeRequest(
      `https://api.openai.com/v1/threads/${threadId}/messages`,
      { method: "GET", headers: getHeaders(OPENAI_API_KEY) }
    );

    const messagesData = await messagesRes.json();
    const latestMessage = messagesData.data[0]; // newest message is first

    // Before returning assistant response
    const cleanReply = latestMessage.content[0].text.value.replace(
      /【\d+:\d+†.*?】/g,
      ""
    );

    cache[cacheKey] = cleanReply;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: cleanReply }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error." }),
    };
  }
};

// Helper headers
function getHeaders(apiKey) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "OpenAI-Beta": "assistants=v2",
  };
}

// HTTPS helper
function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";

      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({
            ...res,
            json: () => Promise.resolve(JSON.parse(data)),
          });
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", reject);

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}
