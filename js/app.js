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
}

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
  let resultsDiv = document.createElement('div');
  for (let productObj of productObjArr) {
    let header = document.createElement('h2');
    header.innerHTML = productObj.productName;
    resultsDiv.appendChild(header);

    let voted = document.createElement('p');
    voted.innerHTML = `${productObj.productName} was displayed ${productObj.displayCounter} time${productObj.displayCounter === 1 ? '' : 's'} and you voted for it ${productObj.clickCounter} time${productObj.clickCounter === 1 ? '' : 's'}`;
    resultsDiv.appendChild(voted);
  }
  gridContainer.appendChild(resultsDiv);
}

let voteCounter = 0;
let gridContainer = document.querySelector('#voteContainer');

function createProductDisplay() {
  let gridDiv = document.createElement('div');
  let prodIndex = Math.floor(Math.random() * productObjArr.length);
  
  let header = document.createElement('h2');
  header.innerHTML = productObjArr[prodIndex].productName;
  gridDiv.appendChild(header);
    
  let img = document.createElement('img');
  img.src = productObjArr[prodIndex].productPath;
  gridDiv.appendChild(img);

  let voteButton = document.createElement('button');
  voteButton.innerHTML = 'Vote';
  voteButton.addEventListener('click', () => {
    productObjArr[prodIndex].clickCounter++;
    if(voteCounter < 4) {
      gridContainer.innerHTML = "";
      displayProducts();
      voteCounter++;
    } else {
      gridContainer.innerHTML = "";
      viewResults();
    }
  });
  gridDiv.appendChild(voteButton);

  productObjArr[prodIndex].displayCounter++;
  return gridDiv;
}


function displayProducts() {
  for(let i = 0; i < 3; i++) {
    gridContainer.appendChild(createProductDisplay());
  }
}
displayProducts();