'use strict';

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
    voteDiv.appendChild(img);
  
    let voteButton = document.createElement('button');
    voteButton.innerHTML = 'Vote';
    voteButton.addEventListener('click', () => {
      this.clickCounter++;
      if(voteCounter < votesAllowed) {
        voteContainer.innerHTML = "";
        displayProducts();
        voteCounter++;
      } else {
        voteContainer.innerHTML = "";
        viewResults();
      }
    });
    voteDiv.appendChild(voteButton);
  
    this.displayCounter++;
    return voteDiv;
  }
}

let voteCounter = 0;
let votesAllowed = 5;
let voteContainer = document.querySelector('#voteContainer');
let productInfoArr = [
  ['nameOne', 'https://place-hold.it/300x375/ddd" alt="placeHolder'],
  ['nameTwo', 'https://place-hold.it/300x375/ddd" alt="placeHolder'],
  ['nameThree', 'https://place-hold.it/300x375/ddd" alt="placeHolder'],
  ['nameFour', 'https://place-hold.it/300x375/ddd" alt="placeHolder'],
  ['nameFive', 'https://place-hold.it/300x375/ddd" alt="placeHolder']
];

let productObjArr = [];
function createObjects() {
  for (let i = 0; i < productInfoArr.length; i++) {
    let newProd = new Product(productInfoArr[i][0], productInfoArr[i][1]);
    productObjArr.push(newProd);
  }
}
createObjects();

function viewResults() {
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

function displayProducts() {
  let indexArray = [];
  let index = -1;
  for(let i = 0; i < 3; i++) {
    index = Math.floor(Math.random() * productObjArr.length);
    voteContainer.appendChild(productObjArr[index].createProductDisplay());
  }
}
displayProducts();