const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { category = "general", page = 1, query = "" } = event.queryStringParameters;

  const apiKey = process.env.GNEWS_API_KEY;

  const url = `https://gnews.io/api/v4/top-headlines?lang=en&country=in&category=${category}&q=${query}&page=${page}&max=8&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch news" }),
    };
  }
};
