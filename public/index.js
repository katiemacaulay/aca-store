"use strict";
// display all front page products
function mainPage(){
    document.getElementById("itemlist").innerHTML = products.map((item,index)=>{
    return `<img src=${item.imgUrl} alt=${item.description}/>
    <li>${item.name}, Stars: ${item.rating}, Reviews: ${item.reviews.length} 
    From: ${item.price} <button onClick="showProduct(${index})" id="">See Details</button></li>`
  }).join('');
}
mainPage()

  
function showProduct(productNumber){
    let product = products[productNumber]
    document.getElementById("itemlist").innerHTML =
        `<img src=${product.imgUrl} alt=${product.description}/>
        <li>${product.name}, Stars: ${product.rating}, Reviews: ${product.reviews.length} 
        From: ${product.price}, Description: ${product.description}, ${product.category}
        , ${product.description}<button onClick="showReviews(${productNumber})"> Show Reviews </button>
        <button onClick="addToCart()" id="">Add to Cart</button></li>`
}

function showReviews(productNumber){
    let product = products[productNumber].reviews
    document.getElementById("reviews").innerHTML =
     product.map((review, index) => {
         return review.rating
     })
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
return document.getElementById('itemlist').innerHTML = foundProducts.map(product => 
    `<img src=${product.imgUrl} alt=${product.description}/>
    <li>${product.name}, Stars: ${product.rating}, Reviews: ${product.reviews.length} 
    From: ${product.price} <button onClick="showProduct()">See Details</button></li>`).join('')
}

