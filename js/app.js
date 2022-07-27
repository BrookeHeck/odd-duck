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
    if(localStorage.getItem('localArr') === null) {
      this.displayCounter = 0;
      this.clickCounter = 0;
    } else {
      let localArr = JSON.parse(localStorage.getItem('localArr'));
      for(let prod of localArr) {
        if (prod.productName === this.productName) {
          this.displayCounter = prod.displayCounter;
          this.clickCounter = prod.clickCounter;
        }
      }
    }
    
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

// This function loops through the products array and creates a new instance of each
function createObjects() {
  for (let i = 0; i < productInfoArr.length; i++) {
    let newProd = new Product(productInfoArr[i][0], productInfoArr[i][1]);
    productObjArr.push(newProd);
  }
}
createObjects();


// Function will execute when user votes for a product, vote will be logged and three more products will be displayed
function handleVote(event) {
  let clickedImg = event.target.alt;
  for(let product of productObjArr) {
    if(clickedImg === product.productName) {
      product.clickCounter++;
    }
  }
  if(voteCounter < votesAllowed) {
    voteContainer.innerHTML = "";
    displayProducts();
    voteCounter++;
  } else {
    voteContainer.removeEventListener('click', handleVote);
    let viewButton = document.createElement('button');
    viewButton.id = 'viewButton';
    viewButton.innerHTML = 'View Results';
    let main = document.querySelector('main');
    main.appendChild(viewButton);
    viewButton.addEventListener('click', viewResultsChart);
  }
}

// function will create data arrays that will be passed to Chart constructor to instantiate that object
function createChartDataArrs() {
  let labelArr = [];
  let votesArr = [];
  let displayedArr = [];
  for (let product of productObjArr) {
    labelArr.push(product.productName);
    votesArr.push(product.clickCounter);
    displayedArr.push(product.displayCounter);
  }
  return [labelArr, votesArr, displayedArr];
}

// create a chart from number of displays and number of counts data
// also gives the user the option to vote again or reset the number data
function viewResultsChart() {
  voteContainer.innerHTML = '';
  
  let dataArrs = createChartDataArrs();

  let canvas = document.createElement('canvas');
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: dataArrs[0],
      datasets: [{
          label: 'Votes',
          backgroundColor: '#22223B',
          data: dataArrs[1]
        },
        {
          label: 'Displays',
          backgroundColor: '#4a4e69',
          data: dataArrs[2]
        }
      ]
    },
    options: {}
  });
  voteContainer.style.flexDirection = 'column';
  voteContainer.appendChild(canvas);
  // product object array is stored in local storage so that number of votes and displayed can be used in the next round of voting
  localStorage.setItem('localArr', JSON.stringify(productObjArr));
  document.querySelector('#viewButton').remove();
  voteAgain();
}

// reloads the page with either the numbers stored in local storage or removes the local storage and reloads the page depending on what the user chooses
function voteAgain () {
  let voteAgain = document.createElement('button');
  voteAgain.innerHTML = 'Vote Again';
  voteContainer.appendChild(voteAgain);
  voteAgain.addEventListener('click', () => {
    location.reload();
  });

  let resetTotals = document.createElement('button');
  resetTotals.innerHTML = 'Reset Vote Totals';
  voteContainer.appendChild(resetTotals);
  resetTotals.addEventListener('click', () => {
    localStorage.removeItem('localArr');
    location.reload();
  })
}
  
// This function will display the three products that are to be voted for, it uses a method within the Product class to create a product div which is appended to the page
let previous = [-1, -1, -1];
function displayProducts() {
  let indexArray = [-1, -1, -1];
  let index = -1;
  for(let i = 0; i < 3; i++) {
    let alreadyUsed = true;
    while (alreadyUsed) {
      index = Math.floor(Math.random() * productObjArr.length);
      for(let j = 0; j < 3; j++) {
        if (index === indexArray[j] || index === previous[j]) {
          alreadyUsed = true;
          break;
        } else {
          alreadyUsed = false;
        }
      }
    }
    indexArray[i] = index;
    voteContainer.appendChild(productObjArr[index].createProductDisplay());
    productObjArr[index].displayCounter++;
  }
  previous = indexArray;
}
displayProducts();
voteContainer.addEventListener('click', handleVote);
