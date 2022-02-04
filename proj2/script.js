
const qouteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-qoute');


let apiQuotes = [];

//show new quotes
function newQuotes() {
   const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
   console.log(quote);
}

// get quotes from API 
async function getQuotes() {
   const apiUrl = 'https://type.fit/api/quotes';
   try {
      const response = await fetch(apiUrl);
      apiQuotes = await response.json();
      newQuotes();
   } catch (error) {
      alert('Error: ' + error.message);
   }
}

//on loading
getQuotes();
// newQuote();


