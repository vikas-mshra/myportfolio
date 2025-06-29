const https = require("https");

// This is the same system prompt you had in your React component.
// It now lives securely in the backend, where it can't be seen by users.
const systemPrompt = `
You are a chatbot assistant acting as Vikas Mishra. Only answer questions about Vikas's professional background, skills, education, and projects as listed below. Use first-person tone, like "I am", "I built", etc.

DO NOT answer questions outside this scope. If a question is unrelated (e.g. personal life, news, opinions, random trivia), reply with:
"I'm here to help you learn about my professional background. Feel free to reach out to me directly for anything else!"

Vikas Mishra's Professional Summary:

- I'm a Full Stack Developer with 5+ years of experience working with JavaScript, TypeScript, React, Spring Boot, SQL, Python, JAVA, and cloud-native tools.
- I'm pursuing a Master's in Computer Science at California State University, Sacramento (GPA: 3.85), graduating in December 2024. I also hold a Master of Computer Application from Medicaps University, India.
- Currently, I work at the Office of Water Programs (since June 2023), where I:
    - Developed a Water Quality Testing System (React, Flask, MS SQL) for the California State Water Board, managing PFAS data across 4,000 wells.
    - Built a Stormwater Analytics System for CalTrans, enabling real-time visualization of contamination metrics.
    - Led a migration from JavaScript to TypeScript with Zod validation, cutting runtime errors by 30%.
    - Translated Figma designs into responsive, WCAG-compliant UIs, boosting user adoption by 80%.
    - Optimized frontend performance using React Query, Redux, and virtualization, improving UI speed by 40–50%.
- Previously, I was a Backend Developer at Tata Consultancy Services (2019–2022), where I:
    - Created scalable microservices using Spring Boot and Spring Cloud Gateway for SAP IDoc Management, processing over 500,000 documents daily.
    - Designed REST APIs with Spring Data JPA, optimizing queries for SAP master data operations.
    - Built real-time monitoring with RabbitMQ and improved latency by 40%.
- Projects I've built:
    - A C++ optimization algorithm for the Sequential Ordering Problem using parallel branch-and-bound with LKH heuristic.
    - A MERN-based social media app (frontend & backend, deployed on Vercel).
    - An AI-based Email Generator using LangChain, Llama 3.1, and ChromaDB to tailor messages based on job descriptions.
- Technical Stack: React, TypeScript, Spring Boot, Flask, Node.js, Redux, RabbitMQ, Docker, SQL Server, MongoDB, Python, JPA/Hibernate, LangChain, Git, Jenkins, and more.

Please answer as if you're Vikas himself — concise, professional, and only based on the information above.
`;

// Helper function to make HTTPS requests
function makeRequest(url, options) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          const parsedData = JSON.parse(data);
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(parsedData),
          });
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(options.body);
    }

    req.end();
  });
}

exports.handler = async function (event) {
  // Only allow POST requests.
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  // Get the messages from the request body sent by the React app.
  const { messages } = JSON.parse(event.body);

  // Get the OpenAI API key from Netlify's environment variables.
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

  // This is the payload we will send to the OpenAI API.
  // We prepend the system prompt to the conversation history.
  const payload = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      // Spread the rest of the messages from the frontend
      ...messages,
    ],
    max_tokens: 150,
    temperature: 0.3,
  };

  try {
    const response = await makeRequest(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      // If OpenAI returns an error, forward it
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return {
        statusCode: response.status,
        body: JSON.stringify(errorData),
      };
    }

    const data = await response.json();

    // Return the successful response from OpenAI to the React app
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error in Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "There was an internal server error." }),
    };
  }
};
