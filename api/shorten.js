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

    // Retrieve the Bitly API token from Environment Variable
    const token = process.env.BITLY_ACCESS_TOKEN;

    if (!token) {
        return response.status(500).json({
            error: "Bitly API token is not configured"
        });
    }


    // fetch() sent to bitly, waits for http response
    // bitlyRespon.json() reads and parses the response body
    // bitlyData stores the returned JavaScript object
    try {
        const bitlyResponse = await fetch("https://api-ssl.bitly.com/v4/shorten", {
            method: "POST",
            headers: {
                //indentify header for authentication by communicating bearer to bitly
                // use ${token} to insert token backticks allow JS to use template literal
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            // request body
            body: JSON.stringify({
                // Refer to the complete Url (protocol, domain & path) with .href 
                long_url: parsedUrl.href,
                domain: "bit.ly"
            })
        });

        const bitlyData = await bitlyResponse.json();

        // Add error handling function
        if (!bitlyResponse.ok) {
            // Call status method for our bitlyData
            return response.status(bitlyResponse.status).json({
                error: "Unable to shorten this URL with Bitly"
            });
        }
        // If successful return the shortened URL to frontend
        return response.status(200).json({
            originalUrl: parsedUrl.href,
            shortenedUrl: bitlyData.link
        });
    } catch (error) {
        console.error("Bitly request failed:", error);

        return response.status(500).json({
            error: "unable to connect to bitly"
        });
    }

}