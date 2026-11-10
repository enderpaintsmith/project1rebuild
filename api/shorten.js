export default async function handler(request, response) {

    //send a post request and receive a response

    // Only allow POST requests
    if (request.method !== "POST") {
        return response.status(405).json({
            error: "Method not allowed"
        });
    }

    // Extract the original URL
    const { long_url } = request.body || {};

    console.log(long_url);

    // Check whether a URL was provided
    if (!long_url) {
        return response.status(400).json({
            error: "Please provide a URL"
        });
    }

    // Validate the URL
    let parsedUrl;

    try {
        // Turn string into new Url object
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

    // Retrieve the Bitly API token
    const token = process.env.BITLY_ACCESS_TOKEN;

    if (!token) {
        return response.status(500).json({
            error: "Bitly API token is not configured"
        });
    }

}

const bitlyResponse = await fetch("https://api-ssl.bitly.com/v4/shorten", {
    method: "POST"
    headers: {
        //indentify header for authentication by communicating bearer to bitly
        // use ${token} to insert token backticks allow JS to use template literal
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
    },
    // request body
    body: JSON.stringify({
        // Refer to the complete Url with .href 
        long_url:parsedUrl.href,
        domain: "bit.ly"
    })
});