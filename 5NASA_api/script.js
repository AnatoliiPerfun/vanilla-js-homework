const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function updateDOM() {
   resultsArray.forEach((result) => {
      //card container
      const card = document.createElement('div');
      card.classList.add('card');
      //link
      const link = document.createElement('a');
      link.href = result.hdurl;
      link.title ='View full image';
      link.target = '_blank';
      //img 
      const image = document.createElement('img');
      image.src = result.url;
      image.alt = 'NASA pic of the Day';
      image.loading = 'lazy';
      image.classList.add('card-img-top');
      //card
      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');
      const cardTitle = document.createElement('h5');
      cardTitle.classList.add('card-title');
      cardTitle.textContent = result.title;
      const saveText = document.createElement('p');
      saveText.classList.add('clickable');
      // if (page === 'results') {
      //    saveText.textContent = 'Add To Favorites';
      //    saveText.setAttribute('onclick', `saveFavorite('${result.url}')`);
      // } else {
      //    saveText.textContent = 'Remove Favorite';
      //    saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
      // }
      const cardText = document.createElement('p');
      cardText.textContent = result.explanation;
      //footer
      const footer = document.createElement('small');
      footer.classList.add('text-muted');
      //date
      const date = document.createElement('strong');
      date.textContent = result.date;
      //copyright
      const copyrightResult = result.copyright === undefined ? '' : result.copyright;
      const copyright = document.createElement('span');
      copyright.textContent = ` ${copyrightResult}`;
      //append
      footer.append(date, copyright);
      cardBody.append(cardTitle, saveText, cardText, footer);
      link.appendChild(image);
      card.append(link, cardBody);
      imagesContainer.appendChild(card);
   });
}

// get 10 pics from NASA API
async function getNasaPictures() {
   try {
      const response = await fetch(apiUrl);
      resultsArray = await response.json();
      updateDOM();
   } catch (error) {
      console.log(error);
   }
}

//ON LOAD
getNasaPictures();