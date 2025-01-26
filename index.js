/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Loop over each item in the games array
    for (const game of games) {
        // Create a new div element for the game card
        const gameCard = document.createElement("div");

        // Add the class "game-card" to the div's class list
        gameCard.classList.add("game-card");

        // Set the inner HTML to display the game info, including its image and two attributes
        gameCard.innerHTML = `
            <img src="${game.img}" alt="${game.name}" class="game-img" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Pledged:</strong> $${game.pledged.toLocaleString()}</p>
            <p><strong>Backers:</strong> ${game.backers.toLocaleString()}</p>
        `;

        // Append the game card to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to add all games to the page
addGamesToPage(GAMES_JSON);


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the total number of contributions (sum of backers)
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);

// set the inner HTML of the contributions card
contributionsCard.innerHTML = totalContributions.toLocaleString();


// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Calculate the total amount of money pledged across all games
const totalPledged = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// Set the inner HTML of the raisedCard to display the total amount
raisedCard.innerHTML = `$${totalPledged.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Calculate the total number of games
const totalGames = GAMES_JSON.length;

// Set the inner HTML of the gamesCard to display the total number of games
gamesCard.innerHTML = `${totalGames}`;
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the addGamesToPage function to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
}



function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // Use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the addGamesToPage function to add the funded games to the DOM
    addGamesToPage(fundedGames);
}




// show all games
function showAllGames() {
    // Clear the current games in the container
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;
console.log(`Number of unfunded games: ${numUnfundedGames}`);



// create a string that explains the number of unfunded games using the ternary operator

// Use template string and ternary operator
const displayStr = `A total of $${totalPledged.toLocaleString()} has been raised for ${totalGames} game${totalGames > 1 ? 's' : ''}. 
Currently, ${numUnfundedGames} game${numUnfundedGames === 1 ? '' : 's'} remain${numUnfundedGames === 1 ? 's' : ''} unfunded. 
We need your help to fund the amazing games!`;

console.log(displayStr);

// Create a new paragraph element
const descriptionParagraph = document.createElement("p");

// Set the inner text of the paragraph element to the template string
descriptionParagraph.textContent = displayStr;

// Append the paragraph element to the description container
descriptionContainer.appendChild(descriptionParagraph);



// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
// Use destructuring and the spread operator to grab the top two most funded games
const [firstGame, secondGame] = [...sortedGames];

// Create a new element to hold the name of the top pledge game
const firstGameElement = document.createElement("p");
firstGameElement.textContent = firstGame.name;

// Append the top pledge game to the correct container
firstGameContainer.appendChild(firstGameElement);

// Create a new element to hold the name of the runner-up game
const secondGameElement = document.createElement("p");
secondGameElement.textContent = secondGame.name;

// Append the runner-up game to the correct container
secondGameContainer.appendChild(secondGameElement);


// create a new element to hold the name of the top pledge game, then append it to the correct element
// Use destructuring and the spread operator to grab the top two most funded games

// Create a new element to hold the name of the top-funded game
const topGameName = document.createElement("p");
topGameName.textContent = `Top Funded Game: ${firstGame.name}`;

// Append the top-funded game element to the firstGameContainer
firstGameContainer.appendChild(topGameName);

// Create a new element to hold the name of the second most-funded game
const secondGameName = document.createElement("p");
secondGameName.textContent = `Second Funded Game: ${secondGame.name}`;

// Append the second most-funded game element to the secondGameContainer
secondGameContainer.appendChild(secondGameName);


// do the same for the runner up item
// Add a search bar to the page above the games list
const searchContainer = document.createElement("div");
searchContainer.setAttribute("id", "search-container");
searchContainer.innerHTML = `
    <input 
        type="text" 
        id="search-bar" 
        placeholder="Search for a game..." 
        style="width: 100%; padding: 10px; margin-bottom: 20px; border: 1px solid #ccc; border-radius: 5px; font-size: 16px;"
    />
`;
document.body.insertBefore(searchContainer, gamesContainer);

// Function to handle search input and filter displayed games
function handleSearch() {
    // Grab the search bar input value
    const searchInput = document.getElementById("search-bar").value.toLowerCase();

    // Filter games based on the search input
    const filteredGames = GAMES_JSON.filter(game => 
        game.name.toLowerCase().includes(searchInput)
    );

    // Clear the games container and display only the filtered games
    deleteChildElements(gamesContainer);
    addGamesToPage(filteredGames);
}

// Attach an event listener to the search bar
document.getElementById("search-bar").addEventListener("input", handleSearch);
