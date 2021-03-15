// Selecting DOM Elements.
const quoteContainer = document.getElementById('quote-generator');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const renameCopyButton = document.getElementById('copy-to-clipboard');
const nextQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Array to store Quotes from the API.
let apiQuotes = [];

// Show spinner annimation while page is loading.
function loadingAnnimation(){
     loader.hidden = false;
     quoteContainer.hidden = true;
}

// Remove spinner annimation when page is being loaded.
function removeLoadingAnnimation(){
     loader.hidden = true;
     quoteContainer.hidden = false;
}

// Copy quote to ClipBoard.
function copyQuote(){
     try{
          var range = document.createRange();
          range.selectNode(document.getElementById("quote"));
          window.getSelection().removeAllRanges(); // clear current selection
          window.getSelection().addRange(range); // to select text
          document.execCommand("copy");
          window.getSelection().removeAllRanges();// to deselect 
          alert('Copied to clipboard');
     }
     catch(err){
          alert('Failed to copy')
          console.log(err);
     }
}

// Generating random number between 0 to 1000.
function pickRandomQuote(){

     // shows loader until index of quote is found.
 loadingAnnimation();

     const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

     //Checking if quote has No or NULL author.
     if(!quote.author){
          authorText.textContent = 'Unknown'
     } else {
          authorText.textContent = quote.author;
     }

     // Checking length of quote and applying class to change size of quote.
     if(quote.text.length > 70){
          quoteText.classList.add('long-quote-text');
     } else {
          quoteText.classList.remove('long-quote-text');
     }

     quoteText.textContent = quote.text;

     // hides the loader and displays page content
     removeLoadingAnnimation(); 
}

// Get quote from quote API
async function getQuote(){

     // Shows loader until fetching take place.
 loadingAnnimation();

     const apiUrl = 'https://type.fit/api/quotes';

     try{
          const response = await fetch(apiUrl);
          apiQuotes = await response.json();
          pickRandomQuote();
     }
     catch(err){
          console.log("Failed to get Quote", err);
     }
}

// Tweet quote
function tweetQuote(){
     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
     window.open(twitterUrl, '_blank');
} 

// Event Listeners
nextQuoteBtn.addEventListener('click', pickRandomQuote);
twitterBtn.addEventListener('click', tweetQuote);
renameCopyButton.addEventListener('click', copyQuote);

// calling function on page refresh or Load.
getQuote();