"use strict";

function mainPage(productsData){
    document.getElementById("itemlist").innerHTML = productsData.map((item,index)=>{
    return `<img src=${item.imgUrl} alt=${item.description}/>
    <li>${item.name}, 
    Stars: ${item.rating}, 
    Reviews: ${item.reviews.length} 
    From: ${item.price} 
    <button onClick="showProduct(${index})">See Details</button> 
    <button onClick="addToCart()">Add to Cart</button></li>`
  }).join('');
}
mainPage(products)

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
            <button onClick="addToCart()" id="">Add to Cart</button></div>
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
    return document.getElementById("cart").innerHTML =
        `<button>remove</button>
        <button>add</button>
        <button>Checkout</button>`
}
