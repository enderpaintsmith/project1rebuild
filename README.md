# Server to Server Communication

## Project Overview

For this lab, I created a Node.js server using Express that communicates with an external API to retrieve random fun facts. The application uses Axios to send a GET request to the Useless Facts API and returns the information in a simplified JSON format.

## How It Works

I initialized the project using npm and installed Express and Axios as dependencies. In `server.js`, I created an Express server running on port 3000 with a GET route at `/api/fun-fact`.

When a client visits this endpoint, the server uses `async/await` with Axios to request a random fact from the external API. Instead of returning the entire response, I extracted only the `text` property and sent it back as a JSON object containing a `fact` property.

I also used a `try...catch` block for error handling. If the external API request fails, the server returns a 500 status code with a generic error message rather than exposing the full error object.

## Running the Application

Install the dependencies using `npm install`, then start the server with `node server.js`.

Visit `http://localhost:3000/api/fun-fact` in a browser to retrieve a random fact. Refreshing the page makes another request to the API.

## Reflection

This lab helped me understand how servers communicate with external APIs and how to handle the data returned from those requests. By extracting only the information needed, I can provide a cleaner response to the client without including unnecessary data.

Using a generic error message also helps prevent internal application details from being exposed. If I wanted to support different languages, I could modify the API request URL to include a language parameter, such as `?language=de`, assuming the external API supports it.

Overall, this activity gave me more experience working with **Express routes, Axios, asynchronous functions, JSON responses, and error handling**.