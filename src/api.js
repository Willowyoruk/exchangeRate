import { fetch } from "./lib/fetch";

// Helper function to fetch exchange rates from the API
export function getExchangeRates(base, supportedCurrencies) {
  const symbols = supportedCurrencies
    .filter((symbol) => symbol !== base) // Exclude the base currency from the requested symbols
    .join();
  const url = `http://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`;

  // Make the API call using the fetch function
  return fetch(url)
    .then((res) => res.json()) // Parse the response as JSON
    .then(handleAPIErrors) // Handle any API errors
    .then((res) => res.rates); // Return the rates data
}

// Helper function to handle API errors
function handleAPIErrors(res) {
  if (res.success) return res; // If the API call was successful, return the response
  console.error(`Server Error: ${res.error.info}`); // Log the error message to the console
  return {
    rates: {
      USD: 1.0, // Provide a fallback response with a basic valid exchange rate
    },
  };
}
