// Find the form in our HTML using ID
const shortenForm = document.getElementById("shorten-form");
console.log(shortenForm);
// Find the input field where the user enters a URL
const urlInput = document.getElementById("url-input");

// Handle submit form and prevent default html form submit
shortenForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    // Trim whitespace before/after input if entered
    const longUrl = urlInput.value.trim();

    // Check whether the input is empty/falsy
    if (!longUrl) {
        console.log("Please enter a URL");
        // Guard Clause exits function if value is falsy
        return;
        
    }

    console.log(longUrl);


// validating URL and creating parsedURL variable & object

let parsedUrl;

try {
    parsedUrl = new URL(longUrl);
    // Checking url protocol is valid 
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid URL protocol");
    }

    console.log(parsedUrl.href);

} catch (error) {
    console.log("Please enter a valid URL");
    return;
}
    
// Pause execution--wait for API req to complete (until after promise is settled succeeds/fails)
// Handle API request and potential errors
try {
    // Wait for the server's response
    const response = await fetch("/api/shorten", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ long_url: parsedUrl.href })
    });

    // Convert the JSON response into a JavaScript object
    const data = await response.json();

    // Check whether the server returned an HTTP error
   if (!response.ok) {
    console.log("Server error:", response.status, data.error);
    return;

    }

    // Display the shortened URL in the console
    console.log(data.shortenedUrl);

} catch (error) {
    // Handle network failures or JSON parsing errors
    console.log("Could not complete the request:", error);
}

}); // Closes the submit event listener