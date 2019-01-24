"use strict";

let cart = [];
let timeAlert;
let timeInterval = true;
let txtEmail = null;
let txtPassword = null;
let btnSignUp = null;
let signup = null;
let products = [];


fetch("https://acastore.herokuapp.com/products")
    .then(response=> response.json())
    .then(productsYeah=>{
        products = productsYeah
    });

function mainPage(productsData){
    document.getElementById("reviews").innerHTML = ""
    document.getElementById("itemlist").innerHTML = productsData.map((item,index)=>{
    return `<img src=${item.imgUrl} alt=${item.description}/>
    <li>${item.name}
        Stars: ${item.rating}
        
        From: ${item.price} 
        Category: ${item.category}
    <button onClick="showProduct(${index})">See Details</button> 
    <button onClick="addToCart(${index})">Add to Cart</button></li>`
  });
}

window.onload = function(){
    cart = JSON.parse(sessionStorage.getItem("product"))
    if(cart==undefined){
        cart=[];
    }  
    pageAlert(); 
    findCategories();
    addUser()
}

function showProduct(productNumber){
    let product = products[productNumber]
    document.getElementById("itemlist").innerHTML =
        `<div id="productOverview">
            <img src=${product.imgUrl} alt=${product.description}/>
            <div id="itemstyling">
                <div>${product.name}</div>
                <div>Stars: ${product.rating}
                ${product.reviews.length} reviews </div>
                <div>From: ${product.price} </div>
                <div>Description: ${product.description}</div>
                <div>Category:${product.category}</div>
                <button onClick="showReviews(${productNumber})"> Show Reviews </button>
            </div>
            <button onClick="addToCart(${productNumber})" id="${productNumber}">Add to Cart</button></div>
        </div>`
}

function showReviews(productNumber){
    let product = products[productNumber].reviews
    document.getElementById("reviews").innerHTML =
     product.map((review, index) => {
         return `<li>User Rating: ${review.rating} </br> ${review.description} </li>`
     }).join('');
}

function addUser(){
    return document.getElementById("itemlist").innerHTML =
    `<div id="signup">
        Email <input id="email" > <br>
        Password <input id="password" > <br>
         <button type="button" id="btnSignUp" onClick="signUp()">Sign Up</button>
    </div>`
}

function signUp(){
    let email = txtEmail.value;
    let password = txtPassword.value;
    home.style.display = "block";
    signup.style.display = "none";
    console.log(email, password)
  }

function searching(){
    let foundProducts = [];
    products.map((item, index) => {
        let nameArray = item.name.split(' ')
        nameArray.filter(names =>{
            if(names == document.getElementById('mySearch').value){
                foundProducts.push(item)
            }
        })
    })
return mainPage(foundProducts)
}

function findCategories(){
    var categories = document.getElementById("categories")
    let productCategories = []
    categories.text = products.map(item => {
        if(productCategories.includes(item.category)){
            return
        } else {
            productCategories.push(item.category)
        }
    })
    return document.getElementById("categories").innerHTML = 
    productCategories.map(item => {
        return `<option id="${item}">${item}</option>`
    })
}

document.getElementById("categories").onchange = options

function options(e){
    let chosenCategory = e.target.value
    let categoryReturnList = []
    products.map(item => {
        if(chosenCategory == item.category){
            categoryReturnList.push(item)
        }
    })
    mainPage(categoryReturnList)
}

function viewCart(){
    document.getElementById("reviews").innerHTML = ""
    document.getElementById("itemlist").innerHTML =
    cart.map((products, index) => {
        return `<li>${products[0]}</li>
        <button onclick="removeProduct(${index})"> remove </button>`
    }).join('') + '<br/><button onclick="checkoutForm()">checkout</button>'
}

function addToCart(productNumber){
    let product = products[productNumber]
    cart.push([product.name, product.price])
    sessionStorage.setItem("product", JSON.stringify(cart))
}

function removeProduct(index){
    cart.splice(index, 1)
    viewCart();
    sessionStorage.setItem("product", JSON.stringify(cart))
}

function cartSum(){
    return cart.reduce((total, itemPrice) => {
        let price = itemPrice[1].substr(1)
        return total + parseFloat(price)
    }, 0)
}

function checkoutForm(){
    let cartAmount = cartSum()
    document.getElementById("itemlist").innerHTML = 
    `<div>Current Subtotal: $${cartAmount}</div>
    <div>${cart.length} items in cart </div>
    <form>
  <div>
      <h1>Checkout
        <span>$${cartAmount}</span>
      </h1>
    </div>
    <p>
      <input type="text" placeholder="Your name" autofocus/>
      <input type="text" placeholder="MM"/>
      <input type="text" placeholder="YY"/>
    </p>
    <p>
      <input type="text" placeholder="4111 1111 1111 1111"/>
      <input type="text" placeholder="CVC"/>
    </p>
    <p>
      <input type="submit" value="Purchase onclick="purchaseCompleting()"/>
    </p>
  </form>`
}

function purchaseCompleting(){
    alert('Purchase is completed!')
}

let settingAlert = () => {
    alert("Are you still there?")
}


function pageAlert(){
    if(timeInterval){
        timeAlert = setInterval(settingAlert, 60000)
        timeInterval = false;
    } else {
        clearInterval(timeAlert)
        timeInterval = true;
        pageAlert()
    }
}