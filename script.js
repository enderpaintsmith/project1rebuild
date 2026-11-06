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
        return;
        // Guard Clause exits function if value is falsy
    }

    console.log(longUrl);


// validating URL and creating parsedURL object
try {
    const parsedUrl = new URL(longUrl);

    // Checking url protocol is valid 
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
        throw new Error("Invalid URL protocol");
    }

    console.log(parsedUrl.href);

} catch (error) {
    console.log("Please enter a valid URL");
    return;
}
    
// Await to execute function until after promise is fulfilled "/api/shorten"
const response = await fetch("/api/shorten", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    // Turn JSON obj into a string
    body: longUrl
});

const data = await response.json();

if (!response.ok) {
    console.log("Something went wrong");
    return;
}

console.log(data.shortenedUrl);
})