"use strict";

let cart = [];

function mainPage(productsData){
    document.getElementById("reviews").innerHTML = ""
    document.getElementById("itemlist").innerHTML = productsData.map((item,index)=>{
    return `<img src=${item.imgUrl} alt=${item.description}/>
    <li>${item.name}
        Stars: ${item.rating}
        Reviews: ${item.reviews.length} 
        From: ${item.price} 
    <button onClick="showProduct(${index})">See Details</button> 
    <button onClick="addToCart(${index})">Add to Cart</button></li>`
  });
}
mainPage(products)

window.onload = function(){
    cart = JSON.parse(sessionStorage.getItem("product"))
    if(cart==undefined){
        cart=[];
    }    
    console.log(cart)
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

function addShoppingCartButtons(){
    return document.getElementById("itemlist").innerHTML =
    cart.map((products, index) => {
        return `<li>${products} </li>`
    }).join('');  

}

function addToCart(productNumber){
    let product = products[productNumber]
    cart.push(product.name)
    sessionStorage.setItem("product", JSON.stringify(cart))
}