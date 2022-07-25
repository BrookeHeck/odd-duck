'use strict';

// Global Variables
let voteCounter = 0;
let votesAllowed = 25;
let voteContainer = document.querySelector('#voteContainer');
let productInfoArr = [
  ['Bag', 'img/bag.jpg'],
  ['Banana', 'img/banana.jpg'],
  ['Bathroom', 'img/bathroom.jpg'],
  ['Boots', 'img/boots.jpg'],
  ['Breakfast', 'img/breakfast.jpg'],
  ['Bubblegum', 'img/bubblegum.jpg'],
  ['Chair', 'img/chair.jpg'],
  ['Cthulhu', 'img/cthulhu.jpg'],
  ['Dog Duck', 'img/dog-duck.jpg'],
  ['Dragon', 'img/dragon.jpg'],
  ['Pen', 'img/pen.jpg'],
  ['Pet Sweep', 'img/pet-sweep.jpg'],
  ['Scissors', 'img/scissors.jpg'],
  ['Shark', 'img/shark.jpg'],
  ['Sweep', 'img/sweep.png'],
  ['Tauntuan', 'img/tauntaun.jpg'],
  ['Unicorn', 'img/unicorn.jpg'],
  ['Water Can', 'img/water-can.jpg'],
  ['Wine Glass', 'img/wine-glass.jpg']
];
let productObjArr = [];

class Product {
  productName;
  productPath;
  displayCounter;
  clickCounter;

  constructor(productName, productPath) {
    this.productName = productName; 
    this.productPath = productPath;
    this.displayCounter = 0;
    this.clickCounter = 0;
  }

  createProductDisplay() {
    let voteDiv = document.createElement('div');
  
    let header = document.createElement('h2');
    header.innerHTML = this.productName;
    voteDiv.appendChild(header);
      
    let img = document.createElement('img');
    img.src = this.productPath;
    img.alt = this.productName;
    voteDiv.appendChild(img);
  
    this.displayCounter++;
    return voteDiv;
  }
}

// Function will execute when user votes for a product, vote will be logged and three more products will be displayed
function handleVote(event) {
  let clickedImg = event.target.alt;
  console.log(clickedImg);
  for(let product of productObjArr) {
    if(clickedImg === product.productName) {
      product.clickCounter++;
    }
  }
  if(voteCounter < votesAllowed) {
    voteContainer.innerHTML = "";
    displayProducts();
    voteCounter++;
    console.log()
  } else {
    voteContainer.removeEventListener('click', handleVote);
    let viewButton = document.createElement('button');
    viewButton.innerHTML = 'View Results';
    let main = document.querySelector('main');
    main.appendChild(viewButton);
    viewButton.addEventListener('click', viewResults)
  }
}

// This function loops through the products array and creates a new instance of each
function createObjects() {
  for (let i = 0; i < productInfoArr.length; i++) {
    let newProd = new Product(productInfoArr[i][0], productInfoArr[i][1]);
    productObjArr.push(newProd);
  }
}
createObjects();


// This function will take the number of times each product is displayed and voted for and then display it as a list
function viewResults() {
  voteContainer.innerHTML = "";
  let resultsDiv = document.createElement('ul');
  for (let productObj of productObjArr) {
    let header = document.createElement('li');
    header.innerHTML = productObj.productName;
    resultsDiv.appendChild(header);

    let voted = document.createElement('li');
    voted.innerHTML = `${productObj.productName} was displayed ${productObj.displayCounter} time${productObj.displayCounter === 1 ? '' : 's'} and you voted for it ${productObj.clickCounter} time${productObj.clickCounter === 1 ? '' : 's'}.`;
    resultsDiv.appendChild(voted);
  }
  voteContainer.appendChild(resultsDiv);
}


// This function will display the three products that are to be voted for, it uses a method within the Product class to create a product div which is appended to the page
function displayProducts() {
  let indexArray = [-1, -1, -1];
  let index = -1;
  for(let i = 0; i < 3; i++) {
    let alreadyUsed = true;
    while (alreadyUsed) {
      index = Math.floor(Math.random() * productObjArr.length);
      for(let j of indexArray) {
        if (j === index) {
          alreadyUsed = true;
          break;
        } else {
          alreadyUsed = false;
        }
      }
    }
    indexArray[i] = index;
    voteContainer.appendChild(productObjArr[index].createProductDisplay());
  }
}
displayProducts();
voteContainer.addEventListener('click', handleVote);