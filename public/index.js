"use strict";

let cart = [];
let users = [];
let timeAlert;
let timeInterval = true;
let btnSignUp = null;
let signup = null;
let products = [];
let user;

// let options = {
//     method: "POST",  //this is the drop down from post man
//     headers: {
//       "Content-Type": "application/json"
//     },body: JSON.stringify({name: "Jon"}) //this is the bottom part of postman
//    };   

fetch("https://acastore.herokuapp.com/users", options).then((res) => {
    return res.json();
  }).then((data)=>{
    users = data
  });
  

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
    user = JSON.parse(sessionStorage.getItem("user"))
    console.log(user)
    if(user==null){
        addUser()
    } else {
        getProducts().then((products) => {
            mainPage(products)
        })
    }
}

function showProduct(productNumber){
    console.log(productNumber)
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
         <button type="button" id="btnSignUp" onClick="signUp()">Sign Up or Log-In</button>
    </div>`
}

let currentUser;

function signUp(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let cartId = (users.length + 1) 
    let foundUser = false;

    users.map((user, index)=>{
        if(user.email === email && user.password === password){
            currentUser = user
            foundUser = true
        } else if(user.email === email && user.password !== password){
            foundUser = null
        }
    })

    if(foundUser === true){
        document.getElementById("fakeNav").innerHTML =
        `Welcome ` + currentUser.email + `, you are logged in!`
        mainPage(products)
        sessionStorage.setItem("user", JSON.stringify(currentUser))
    } else if(foundUser === null){
        document.getElementById("itemlist").innerHTML = 
        `<div id="signup">
        Wrong Password, Try Again <br>
        Email <input id="email" > <br>
        Password <input id="password" > <br>
         <button type="button" id="btnSignUp" onClick="signUp()">Sign Up or Log-In</button>
    </div>`
    } else {
        fetch("https://acastore.herokuapp.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email,password, cartId}), 
            })
            .then(response => response.json())
            .then(newUserWithId =>{
                console.log(newUserWithId)
                sessionStorage.setItem("user", JSON.stringify(newUserWithId))
                document.getElementById("fakeNav").innerHTML =
                 `Welcome ` + newUserWithId.email + `, you are logged in!`
            }) 
        fetch("https://acastore.herokuapp.com/carts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({userId:cartId,products:[]}), 
            })
            .then(response => response.json())
            .then(data =>{
                console.log(data)
            }) 
            mainPage(products)
    }
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
    fetch(`https://acastore.herokuapp.com/cart/{cartId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({products: }), 
        })
        .then(response => response.json())
        .then(product =>{
            console.log(product)

        })
    console.log(user)
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
    console.log("Are you still there?")
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

function addNewItem(){
    return document.getElementById("itemlist").innerHTML =
    `<div id="addProducts">
        Enter something in all boxes please <br>
        Name <input id="name" > <br>
        Description <input id="description" > <br>
        Price <input id="price" > <br>
        imgUrl <input id="imgUrl"> <br>
        Category <input id="category"> <br>
        Rating <input id="rating"> <br>
        <button type="button" id="add" onClick="addProduct()">Add Product</button>

         </div>`
}

function addProduct(){
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let imgUrl = document.getElementById("imgUrl").value;
    let category = document.getElementById("category").value;
    let reviews = ['No reviews yet'];
    let rating = document.getElementById("rating").value;
    
    fetch("https://acastore.herokuapp.com/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name,description, price, imgUrl, category, reviews, rating}), 
        })
        .then(response => response.json())
        .then(product =>{
            console.log(product)

        }) 
    getProducts().then((products) => {
        mainPage(products)
    })
}

function getProducts(){
    return fetch("https://acastore.herokuapp.com/products")
    .then(response=> response.json())
    .then(productsYeah=>{
        return productsYeah
    });
}