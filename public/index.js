"use strict";

function mainPage(productsData){
    document.getElementById("itemlist").innerHTML = productsData.map((item,index)=>{
    return `<img src=${item.imgUrl} alt=${item.description}/>
    <li>${item.name}, 
    Stars: ${item.rating}, 
    Reviews: ${item.reviews.length} 
    From: ${item.price} 
    <button onClick="showProduct(${index})" id="">See Details</button> </li>`
  }).join('');
}
mainPage(products)

function showProduct(productNumber){
    let product = products[productNumber]
    document.getElementById("itemlist").innerHTML =
        `<img src=${product.imgUrl} alt=${product.description}/>
        <li>${product.name}, 
        Stars: ${product.rating}, 
        Reviews: ${product.reviews.length} 
        From: ${product.price}, 
        Description: ${product.description}, 
        ${product.category}
        <button onClick="showReviews(${productNumber})"> Show Reviews </button>
        <button onClick="addToCart()" id="">Add to Cart</button></li>`
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

