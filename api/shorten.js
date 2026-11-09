export default async function handler(request, response) {

    // 1. Only allow POST requests
    if (request.method !== "POST") {
        return response.status(405).json({
            error: "Method not allowed"
        });
    }

    // 2. Extract the original URL
    const { long_url } = request.body || {};

    console.log(long_url);

    // 3. Check whether a URL was provided
    if (!long_url) {
        return response.status(400).json({
            error: "Please provide a URL"
        });
    }

    // 4. Validate the URL
    let parsedUrl;

    try {
        parsedUrl = new URL(long_url);

        // Only allow HTTP and HTTPS
        if (!["http:", "https:"].includes(parsedUrl.protocol)) {
            throw new Error("Invalid URL protocol");
        }

    } catch (error) {
        return response.status(400).json({
            error: "Please enter a valid URL"
        });
    }

    // 5. Retrieve the Bitly API token
    const token = process.env.BITLY_ACCESS_TOKEN;

    if (!token) {
        return response.status(500).json({
            error: "Bitly API token is not configured"
        });
    }
// 6. Send the original URL to Bitly
const bitlyResponse = await fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        long_url: parsedUrl.href,
        domain: "bit.ly"
    })
});
} // End of handler function