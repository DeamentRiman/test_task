//Файл скриптов
let firstCard = document.querySelector('.first-card');
let addProduct = document.querySelector('.form_add-product');
let firstCardPay = document.querySelector('.first-card-pay');
let secondCard = document.querySelector('.second-card');
let invisibleCard = document.querySelector('.invisible');
let productQuantity = secondCard.querySelectorAll('input');
let productQuantityValue;
let templateOfProduct = document.querySelector('#templateOfProduct').content;
let loader = document.querySelector('#loader').content;
let productTitle = templateOfProduct.querySelector('.form_fieldset-title');
let listOfProduct = document.querySelector('.form--scroll');
let productNumber;
let thirdForm = document.querySelector('.third--form');
let continueButton = document.querySelector('.continue-button');
let thirdCard = document.querySelector('.third--card');
let buttonPay = document.querySelector('.button-pay');
let successfullPayment = document.querySelector('.successfull-payment');
let successfullPaymentButton = document.querySelector('.successfull-payment_button');
let failedPayment = document.querySelector('.failed-payment');
let failedPaymentButton = document.querySelector('.failed-payment_button');

let priceObject ={
    5: '80 USD',
    4: '72 USD',
    3: '60 USD',
    2: '44 USD',
    1: '24 USD',
    0: 'nothing to pay',
}

addProduct.addEventListener('click', function(evt){
    evt.preventDefault();
    secondCard.classList.remove('invisible');
    firstCard.classList.add('invisible');
});

for ( let i = 0; i < productQuantity.length; i++) {
    productQuantity[i].addEventListener('change', function(){
        productQuantityValue = Number(productQuantity[i].value);
        if (productQuantityValue > 1) {
            createProduct(productQuantityValue);
        }
    });
}

let createProduct = function(j) {
    for( let k = 2; k <= j; k++) {
        productTitle.textContent = 'Product ' + k; 
        listOfProduct.append(templateOfProduct.cloneNode(true));
    }
};

continueButton.addEventListener('click', function(evt){
    evt.preventDefault();
    thirdCard.classList.remove('invisible');
    secondCard.classList.add('invisible');
    deleteProduct();
});

function deleteProduct () {
    let productNumber = listOfProduct.querySelectorAll('.form_fieldset');
    let price = priceObject[productNumber.length-1];
    buttonPay.textContent = 'Submit and Pay '+ price;
    for (let i = 1; i < productNumber.length; i++) {
        productNumber[i].addEventListener('click', function() {
            productNumber[i].remove();
            productNumber = listOfProduct.querySelectorAll('.form_fieldset');
            price = priceObject[productNumber.length-1];
            buttonPay.textContent = 'Submit and Pay '+ price;
        })
    }
};

function getRandomEntire(min, max) {
    if (min >= 0 && max >= 0 && max >= min) {
      min = Math.ceil(min);
      max = Math.floor(max);
      const randomValue = Math.floor(Math.random() * (max - min+1)) + min;
      return randomValue;
    }
  }

buttonPay.addEventListener('click', function(){
    let randomValue = getRandomEntire(0, 1);
    buttonPay.textContent='';
    buttonPay.append(loader.cloneNode(true));
    setInterval(
        () => {
            buttonPay.remove(loader);
            thirdCard.classList.add('invisible');
            if (randomValue === 1) {
               buttonPay.remove(loader);
               successfullPayment.classList.remove('invisible');
               window.location.hash = '#paymentsuccess';
            } else {
                if (randomValue === 0){
                    failedPayment.classList.remove('invisible');
                    window.location.hash = '#paymenterror';
                }
            }
        },
        2000
    ); 
})

successfullPayment.addEventListener('click', function(){
    successfullPayment.classList.add('invisible');

    firstCard.classList.remove('invisible');
    window.location.href = 'index.html';
})

failedPayment.addEventListener('click', function(){
    failedPayment.classList.add('invisible');
    firstCard.classList.remove('invisible');
    window.location.href = 'index.html';
})

firstCardPay.addEventListener('click', function() {
    let randomValue = getRandomEntire(0, 1);
    firstCardPay.textContent = '';
    firstCardPay.append(loader.cloneNode(true));
    setInterval(
        () => {
            firstCardPay.remove(loader);
            firstCard.classList.add('invisible');
            if (randomValue === 1) {
               successfullPayment.classList.remove('invisible');
               window.location.hash = '#paymentsuccess';
            } else {
                if (randomValue === 0){
                    failedPayment.classList.remove('invisible');
                    window.location.hash = '#paymenterror';
                }
            }
        },
        3000
    ); 
})
