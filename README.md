# Frontend Mentor - Shortly URL Shortening API Challenge Solution

This is a rebuild of my solution to the [Shortly URL Shortening API Challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G).

### The Challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links
- Copy the shortened link to their clipboard in a single click
- Receive an error message when the `form` is submitted if:
  - The `input` field is empty

### Built With

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript

## Overview

For this project, I rebuilt the Shortly URL Shortening API Landing Page using HTML, CSS, and JavaScript. The application allows users to shorten URLs using the Bitly API, as well as display multiple shortened links, and copy them to the clipboard.

This project focuses on API integration, DOM manipulation, form validation, asynchronous JavaScript, and responsive design.

The frontend uses JavaScript event listeners to handle form submissions and validate URLs using the URL object. Valid URLs are sent to a Vercel serverless function using fetch() and async/await. The backend communicates with the Bitly API using an access token stored securely as an environment variable.

Finally shortened URLs are displayed dynamically in a list, with individual Copy buttons. Error messages are displayed when a user enters an invalid URL or an API request fails.

## Setup and Deployment

To run the project locally, clone the GitHub repository and navigate into the project directory.

Use `npx vercel link` to connect the local project to Vercel. This allows Vercel to run the backend API function used to communicate with Bitly.

Configure `BITLY_ACCESS_TOKEN` in Vercel using your Bitly API access token. This token allows the application to send requests to Bitly and generate shortened URLs.

Run `npx vercel env pull .env.local` to download the environment variables from Vercel to your local project.

Then run `npx vercel dev` to start the local development server and test the application in your browser.

The Bitly API token should remain private and should not be uploaded to GitHub. The `.env.local` file should be included in `.gitignore` to prevent Git from tracking it.

The project is deployed through Vercel, which hosts the website and runs the backend API function. GitHub is used to store and manage the project code.

### Live Demo

https://project1rebuildredeploy.vercel.app/

### GitHub Repository

https://github.com/enderpaintsmith/project1rebuild

## Reflection

Since I had already written the HTML and CSS for the original project, and those were approved, I reused those files and focused on getting the JavaScript form submission and API integration working correctly.

I used event listeners, preventDefault(), and the URL object to validate user input before sending requests. I also used async/await with fetch() to handle asynchronous API requests and convert the JSON response into a JavaScript object.

One of the biggest challenges was configuring the Bitly API token through Vercel. Although the environment variable was configured, the local development server wasn't always loading it correctly. I had to check the environment variables (tokens), pull them into my local project, and restart the server to get everything working.

I ran into some JavaScript errors involving variable initialization and DOM manipulation. Fixing these errors helped me better understand how JavaScript runs, and in particular, how to create links and buttons dynamically.

Once the API was working, I added the ability to display multiple shortened links, copy them to the clipboard, and show error messages when a user enters an invalid URL or an API request fails.

Overall, this project gave me a better understanding of asynchronous JavaScript, API integration, and debugging using the browser console and Terminal. In the future, I'd consider  improving how shortened links are displayed and use `localStorage` to save them so they remain available when the user returns to the website.

### Useful Resources

**Bitly**

- https://dev.bitly.com
- https://dev.bitly.com/api-reference/
- https://dev.bitly.com/docs/getting-started/authentication/

**Vercel**

- https://vercel.com/docs/deployments
- https://vercel.com/docs/cli/env

**MDN Reference**

- [try...catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch)
- [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response)
- [URL Constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)
- [addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [JavaScript const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [Variable Initialization Errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cant_access_lexical_declaration_before_init)
- [Document.createElement()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)
- [Node.appendChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild)
- [Clipboard.writeText()](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText)

**Frontend Mentor**

- https://www.frontendmentor.io/solutions/shortly-frontend-only-p4HmJFjGsJ

## Author

- **Developer:** Daniel Birnbaum
- **Original design and assets:** Frontend Mentor
- **Challenge:** https://www.frontendmentor.io/challenges/url-shortening-api-landing-page-2ce3ob-G