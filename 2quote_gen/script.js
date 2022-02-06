const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


let apiQuotes = [];

// Set quote
quoteText.textContent = quoteText;

//New Quote
function newQuote(){
    //Random quote
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author ? quote.author : "Unknown";
}

//Get Quotes fom API
async function getQuotes(){

    const apiUrl = `https://type.fit/api/quotes`;
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
      error.message = "Error fetchingQuotes: " + error.message;
    }
}

function tweetQuote() {
    const twitterUrl =`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listener 
if (newQuoteBtn) {
   newQuoteBtn.addEventListener('click', newQuote);
}
if (twitterBtn) {
   twitterBtn.addEventListener('click', tweetQuote);
}
//On load
getQuotes();
